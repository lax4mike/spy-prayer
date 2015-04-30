import Cards from "./Cards.jsx";
import cardsCollection from "../config/cardsCollection.js";

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
