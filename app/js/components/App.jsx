import Cards from "./Cards.jsx";
import PlayersSelect from "./PlayersSelect.jsx";
import config from "../config/config.js";
import * as ScriptReader from "../common/scriptReader";
import classNames from "../utils/classNames.js";

var cardsCollection = config.cardsCollection;
var selectedCards = [];
var playerCount = 0;

var App = React.createClass({

    componentWillMount: function(){
        // add avalon or resistance class to the body
        $("body").addClass(config.game);
    },

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

        var appClasses = classNames("app");

        var title = (config.game === "avalon") ?
            "The Resistence Avalon: Spy Prayer" :
            "The Resistence: Spy Prayer" ;

        return (
            <div className={appClasses}>
                <header>
                    <div className="header-content">
                        <h1>{title}</h1>
                    </div>
                </header>
                <main>    
                    <PlayersSelect onChange={this.onPlayerCountChange}></PlayersSelect>
                    <Cards cardsCollection={cardsCollection} onChange={this.onCardsChange} />
                    <footer>
                        <button onClick={this.playScript} className="play-btn"><span className="sub">Bow your heads and</span> Pray</button>
                    </footer>
                </main>
            </div>
        );
    }

}); 

export default App;
