import Card from "./Card.jsx";
import * as resolveDependencies from "../common/resolveDependencies.js";
import "../common/Array.prototype.find.js";

var Cards = React.createClass({

    componentDidUpdate: function(){
        // console.log("new cards", this.state.selectedCards.map((c)=>c.id));
    },

    getInitialState: function(){
        return {
            selectedCards: []
        };
    },

    onCardClick: function(name, selected){

        // calculate what cards are selected by looking at the 
        // selected state of each Card child
        var selectedCards = Object.keys(this.refs)
            .map((key) => this.refs[key])
            .filter((card, i) => {
                return card.state.selected;
            })
            .map((card, i) =>  {
                return card.props.card 
            });

        // resolve any depenencies
        if (selected === true){
            selectedCards = resolveDependencies.byAdding(selectedCards);
        }
        else {
            selectedCards = resolveDependencies.byRemoving(selectedCards);   
        }

        this.setState({
            selectedCards: selectedCards
        });
    },

    render: function(){ 

        return (
            <div className="cards">
                {this.props.cardsCollection.map((card, i) => { 
                    
                    var isSelected = this.state.selectedCards.find((c) => {
                        return card.id === c.id;
                    });
                    var selected = isSelected !== undefined;

                    return <Card 
                            key={i} 
                            ref={"card-" + i}
                            card={card}
                            selected={selected}
                            onClick={this.onCardClick}/>;
                })}
            </div>
        );
 
    }

});

export default Cards;
