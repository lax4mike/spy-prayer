import Cards from "./Cards.jsx";
import config from "../config/resistance.js";
import * as ScriptReader from "../common/scriptReader";

var cardsCollection = config.cardsCollection;
var selectedCards = [];

var App = React.createClass({

    onCardsChange: function(cards){
        selectedCards = cards;    
    },

    playScript: function(){
        ScriptReader.readScript(selectedCards);
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
                    <Cards cardsCollection={cardsCollection} onChange={this.onCardsChange} />
                </main>
                <footer>
                    <button onClick={this.playScript} className="play-btn"><span className="sub">Bow your heads and</span> Narrate prayer</button>
                </footer>
            </div>
        );
    }

}); 

export default App;
