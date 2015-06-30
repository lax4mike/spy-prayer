import React         from "react";
import $             from "jquery";
import Header        from "./Header.jsx";
import OptionsPanel  from "./OptionsPanel.jsx";
import Cards         from "./Cards.jsx";
import PlayBtn       from "./PlayBtn.jsx";
import PlayersSelect from "./PlayersSelect.jsx";

import classNames from "../utils/classNames.js";

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

        // call our onUnload function when the user navigates away
        window.addEventListener("unload", this.onUnload);

    },

    // clean up
    componentWillUnMount: function(){
        window.removeEventListener("unload", this.onUnload);
    },

    onUnload: function(){
        // stop the audio if the user navigates away
        ScriptReader.stop();
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
            "Avalon: Spy Prayer" :
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

        // make sure we're not playing
        ScriptReader.stop();

        // load the config for "resistance" or "avalon"
        config.loadConfig(game);

        this.setState({
            game: game,
            selectedCards: [], // clear the selected cards
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

        var classes = classNames(
            "app",
            { "app--options-active": this.state.optionsPanelIsActive }
        );

        return (
            <div className={classes}>
                <Header title={this.state.title} 
                    onOptionsClick={this.onOptionsClick}
                    optionsPanelIsActive={this.state.optionsPanelIsActive}>
                </Header>
                <main>    
                    <div className="home">

                        <PlayersSelect 
                            onChange={this.onPlayerCountChange} 
                            playerCount={this.state.playerCount}
                            disabled={this.state.isPlaying} />
                        <Cards 
                            cardsCollection={config.getCardsCollection()} 
                            onChange={this.onCardsChange} 
                            selectedCards={this.state.selectedCards} 
                            disabled={this.state.isPlaying} />

                        <footer>
                            <PlayBtn 
                                onClick={this.onPlayBtnClick}
                                isPlaying={this.state.isPlaying} />
                        </footer>
                    </div>
                    
                    <OptionsPanel 
                        optionsPanelIsActive={this.state.optionsPanelIsActive}
                        game={this.state.game}
                        onGameChange={this.onGameChange} />
                </main>
               
            </div>
        );
    }

}); 



export default App;
