import Cards from "./Cards.jsx";
import PlayersSelect from "./PlayersSelect.jsx";
import config from "../config/config.js";
import * as ScriptReader from "../common/scriptReader";

var cardsCollection = config.cardsCollection;
var selectedCards = [];
var playerCount = 0;

var App = React.createClass({

    onPlayerCountChange: function(num){
        playerCount = num;
    },

    onCardsChange: function(cards){
        selectedCards = cards;    
    },

    playScript: function(){
        ScriptReader.readScript(selectedCards, playerCount);
    },

    render: function(){ 
        return (
            <div className="app">
                <header>
                    <div className="header-content">
                        <h1>The Resistence: Spy Prayer</h1>
                    </div>
                </header>
                <main>
                    <PlayersSelect onChange={this.onPlayerCountChange}></PlayersSelect>
                    <Cards cardsCollection={cardsCollection} onChange={this.onCardsChange} />
                </main>
                <footer>
                    <button onClick={this.playScript} className="play-btn"><span className="sub">Bow your heads and</span> Pray</button>
                </footer>
            </div>
        );
    }

}); 

export default App;
