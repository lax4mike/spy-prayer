import Header        from "./Header.jsx";
import OptionsPanel  from "./OptionsPanel.jsx";
import Cards         from "./Cards.jsx";
import PlayBtn       from "./PlayBtn.jsx";
import PlayersSelect from "./PlayersSelect.jsx";

import * as config       from "../config/config.js";
import * as ScriptReader from "../common/scriptReader";

var localStorageKey = "spy-prayer-state";

var App = React.createClass({

    getInitialState: function(){
        return {
            optionsPanelIsActive : false,
            game                 : config.getGame(),
            selectedCards        : [],
            playerCount          : 0,
            title                : "", // title for page and header
            isPlaying            : false
        };
    },

    componentWillMount: function(){

        // try to load from localstorage
        var loaded = this.loadStateFromLocalStorage();

        // if we didn't find anything in local storage, initialize crap
        if (!loaded){
            this.onGameChange(config.getGame());
            this.componentDidUpdate();
        };

    },

    componentDidUpdate: function(){

        // add avalon or resistance class to the body
        $("body").attr("class", this.state.game);
        
        // update the page title also
        $("title").text(this.state.title);

        this.saveStateToLocalStorage();
    
    },

    componentWillUpdate: function(newProps, newState){

        var title = (config.getGame() === "avalon") ?
            "The Resistence Avalon: Spy Prayer" :
            "The Resistence: Spy Prayer";

        if (this.state.title !== title){
            this.setState({
                title: title
            });  
        } 
    },

    loadStateFromLocalStorage: function(){
        if (localStorage[localStorageKey]){

            // load the correct config and update state
            var localStorageState = JSON.parse(localStorage[localStorageKey]);
            config.loadConfig(localStorageState.game);
            
            localStorageState.isPlaying = false; // always start NOT playing
            
            this.setState(localStorageState);

            return true;
        }

        return false;
    },

    saveStateToLocalStorage: function(){
        localStorage[localStorageKey] = JSON.stringify(this.state);
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
            title: title,
            selectedCards: [], 
            optionsPanelIsActive: false // close the options panel
        });
    },

    onPlayBtnClick: function(){

        if (this.state.isPlaying){
            ScriptReader.stop();
        }
        else {
            ScriptReader.readScript(this.state.selectedCards, this.state.playerCount, 
                function(){
                    this.setState({
                        isPlaying: false
                    });
                }.bind(this));    
        }

        this.setState({
            isPlaying: !this.state.isPlaying
        });
 
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
                    <PlayersSelect 
                        onChange={this.onPlayerCountChange} 
                        playerCount={this.state.playerCount} />
                    <Cards 
                        cardsCollection={config.getCardsCollection()} 
                        onChange={this.onCardsChange} 
                        selectedCards={this.state.selectedCards} />
                    <footer>
                        <PlayBtn 
                            onClick={this.onPlayBtnClick}
                            isPlaying={this.state.isPlaying} />
                    </footer>
                </main>
            </div>
        );
    }

}); 

export default App;
