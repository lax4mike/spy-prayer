import React      from "react";
import classNames from "../../utils/classNames.js";

const gameOptions = [
    { "label": "Resistance", "value": "resistance" },
    { "label": "Avalon",     "value": "avalon" }
];

const OptionsPanel = React.createClass({

    displayName: "OptionsPanel",

    propTypes: {
        optionsPanelIsActive: React.PropTypes.bool,
        onGameChange: React.PropTypes.func,
        game: React.PropTypes.oneOf(["resistance", "avalon"])
    },

    getInitialState: function(){
        return {
            game: this.props.game
        };
    },

    componentDidUpdate: function(){
        // console.log(this.state.game);
    },

    // update the game state and pass it up
    onGameChange: function(game){

        var newState = { game: game };

        this.setState(newState, function() {
            if (this.props.onGameChange){
                this.props.onGameChange(game);
            }
        });
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


                <section>
                    <h2>Game:</h2>
                    <div className="btn-group">

                        { gameOptions.map(function(opt, i){
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
                        }.bind(this)) }

                    </div>
                </section>

                <section className="what-is-this">
                    <h2>What is this?</h2>

                    <p>
                        <em>The Resistance</em> and  <em>The Resistance: Avalon</em> are social deduction board games by <a href="http://www.indieboardsandcards.com/">Indie Boards and Cards</a>.  Player&apos;s identities are not known to certain other players and at the begining of the game, a <em>script</em> is read to reveal some roles.  I like to call this the "spy prayer".
                    </p>

                    <p>
                        If you find any bugs, please log an issue in the <a href="https://github.com/lax4mike/spy-prayer/">github repository</a>.  Happy gaming!
                    </p>

                </section>
            </div>
        );
    }
});

export default OptionsPanel;
