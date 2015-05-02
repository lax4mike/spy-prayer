import Cards from "./Cards.jsx";
import config from "../config/resistance.js";

var cardsCollection = config.cardsCollection;

var App = React.createClass({

    render: function(){ 
        return (
            <div className="app">
                <Cards cardsCollection={cardsCollection} />
            </div>
        );
    }

});

export default App;
