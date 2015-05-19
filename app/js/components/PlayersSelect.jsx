import * as config from "../config/config.js";

var teams = config.getTeams();

var PlayersSelect = React.createClass({

    propTypes: {
        onChange    : React.PropTypes.func,
        playerCount : React.PropTypes.number
    },

    getInitialState: function() {
        return {
            playerCount: this.props.playerCount || 5
        }
    },

    componentDidMount: function(){
        this.props.onChange(this.state.playerCount);
    },  

    componentDidUpdate: function(){

    },

    updatePlayerCount: function(num){

        this.setState({
            playerCount: num
        });

        setTimeout(() => {
            this.props.onChange(this.state.playerCount);
        }, 0);
    },

    render: function(){

        var teams = config.getTeams();

        var evilPlayersCount = config.evilPlayerMap[this.state.playerCount];
        var goodPlayersCount = this.state.playerCount - evilPlayersCount;

        return (
            <div className="player-select">
                <h2>
                    <span className="avoid-wrap">Player count:</span>
                    <span className="avoid-wrap">
                        <span className="player-count">
                            <span className="num">{goodPlayersCount}</span>
                            <label>{teams.good}</label>
                        </span>
                        <span className="player-count">
                            <span className="num">{evilPlayersCount}</span>
                            <label>{teams.evil}</label>
                        </span>
                    </span>
                </h2>
                <div className="btn-group">
                    {[5, 6, 7, 8, 9, 10].map(function(num, i){
                        return (
                            <label className="btn-group__btn" key={i}>
                                <input type="radio" name="playerCount" 
                                    value={num} 
                                    checked={this.state.playerCount === num}
                                    onChange={this.updatePlayerCount.bind(this, num)}/>
                                {num}
                            </label>
                        );
                    }.bind(this))}
                </div>
            </div>
        );
    }
});

export default PlayersSelect;
