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
                <Cards cardsCollection={cardsCollection} onChange={this.onCardsChange} />
                <button onClick={this.playScript}>Play</button>
            </div>
        );
    }

}); 

export default App;
