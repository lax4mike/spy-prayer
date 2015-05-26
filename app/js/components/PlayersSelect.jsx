import * as config from "../config/config.js";

var teams = config.getTeams();

var PlayersSelect = React.createClass({

    propTypes: {
        onChange    : React.PropTypes.func,
        playerCount : React.PropTypes.number,
        disabled    : React.PropTypes.bool
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

    // update the player count state and notify any listeners
    updatePlayerCount: function(num){

        var newState = { playerCount: num };

        this.setState(newState, function() {
            if (this.props.onChange){
                this.props.onChange(this.state.playerCount);
            }
        });
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
                                    onChange={this.updatePlayerCount.bind(this, num)} 
                                    disabled={this.props.disabled} />
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
