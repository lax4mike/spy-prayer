import classNames from "../utils/classNames.js";

var OptionsPanel = React.createClass({

    propTypes: {
        optionsPanelIsActive: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },

    getInitialState: function(){
        return {
            game: this.props.game
        };
    },

    gameOptions: [
        { "label": "Resistance", "value": "resistance" },
        { "label": "Avalon",     "value": "avalon" }
    ],

    componentDidUpdate: function(){
        // console.log(this.state.game);
    },

    onGameChange: function(game){
        this.setState({
            game: game
        });

        // defer callback so the state is up to date
        setTimeout(() => {
            this.props.onGameChange(game);
        }, 0);
    },

    render: function(){

        var classes = classNames(
            "options-panel",
            {
                "is-active": this.props.optionsPanelIsActive
            }
        );

        return (
            <div className={classes}>

                <h2>Game:</h2>

                <section>
                    <div className="btn-group">

                        {this.gameOptions.map(function(opt, i){
                            return (
                                <label className="btn-group__btn" key={i}>
                                    <input type="radio" name="game"
                                        value={opt.value}
                                        checked={this.state.game === opt.value}
                                        
                                        onChange={this.onGameChange.bind(this, opt.value)}
                                     />
                                    <span>{opt.label}</span>
                                </label>
                            );
                        }.bind(this))}
                        
                    </div>
                </section>

            </div>
        );
    }
});

export default OptionsPanel;
