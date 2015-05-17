import Header        from "./Header.jsx";
import OptionsPanel  from "./OptionsPanel.jsx";
import Cards         from "./Cards.jsx";
import PlayersSelect from "./PlayersSelect.jsx";

import * as config       from "../config/config.js";
import * as ScriptReader from "../common/scriptReader";


var App = React.createClass({

    getInitialState: function(){
        return {
            optionsPanelIsActive : false,
            game                 : config.getGame(),
            cardsCollection      : config.getCardsCollection(),
            selectedCards        : [],
            playerCount          : 0,
            title                : "", // title for page and header
        };
    },

    componentWillMount: function(){
        this.componentDidUpdate();
        this.onGameChange(config.getGame());
    },

    componentDidUpdate: function(){

        // add avalon or resistance class to the body
        $("body").attr("class", this.state.game);
        
        // update the page title also
        $("title").text(this.state.title);
    
    },

    onPlayerCountChange: function(num){
        this.setState({
            playerCount: num
        });
    },

    onCardsChange: function(cards){
        this.setState({ selectedCards: cards });
    },

    onOptionsClick: function(){
        // toggle options panel
        this.setState({ optionsPanelIsActive: !this.state.optionsPanelIsActive });
    },

    onGameChange: function(game){

        // load the config for "resistance" or "avalon"
        config.loadConfig(game);

        var title = (config.getGame() === "avalon") ?
            "The Resistence Avalon: Spy Prayer" :
            "The Resistence: Spy Prayer";

        this.setState({
            game: game,
            cardsCollection: config.getCardsCollection(),   
            title: title,
            selectedCards: [], 
            optionsPanelIsActive: false // close the options panel
        });
    },

    playScript: function(){
        ScriptReader.readScript(this.state.selectedCards, this.state.playerCount);
    },

    render: function(){ 

        return (
            <div className="app">
                <Header title={this.state.title} 
                    onOptionsClick={this.onOptionsClick}>
                </Header>
                <main>    
                    <OptionsPanel 
                        optionsPanelIsActive={this.state.optionsPanelIsActive}
                        game={this.state.game}
                        onGameChange={this.onGameChange}>
                    </OptionsPanel>
                    <PlayersSelect onChange={this.onPlayerCountChange}></PlayersSelect>
                    <Cards 
                        cardsCollection={this.state.cardsCollection} 
                        onChange={this.onCardsChange} 
                        selectedCards={this.state.selectedCards}/>
                    <footer>
                        <button onClick={this.playScript} className="play-btn">
                            <span className="sub">Bow your heads and</span> Pray
                        </button>
                    </footer>
                </main>
            </div>
        );
    }

}); 

export default App;
