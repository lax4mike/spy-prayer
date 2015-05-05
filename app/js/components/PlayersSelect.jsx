import { evilPlayerMap } from "../config/config.js";

var PlayersSelect = React.createClass({

    propTypes: {
        onChange: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            playerCount: 5,
            evilPlayersCount: 2,
            goodPlayersCount: 3
        }
    },

    componentDidMount: function(){
        this.props.onChange(this.state.playerCount);
    },  

    componentDidUpdate: function(){
        this.props.onChange(this.state.playerCount);
    },

    updatePlayerCount: function(num){

        var evilPlayersCount = evilPlayerMap[num];

        this.setState({
            playerCount: num,
            evilPlayersCount: evilPlayersCount,
            goodPlayersCount: num - evilPlayersCount
        });
    },

    render: function(){
        return (
            <div className="player-select">
                <h2>Player count:
                    <span className="player-count">
                        <span className="num">{this.state.goodPlayersCount}</span>
                        <label>Resistance Members</label>
                    </span>
                    <span className="player-count">
                        <span className="num">{this.state.evilPlayersCount}</span>
                        <label>Evil spies</label>
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
