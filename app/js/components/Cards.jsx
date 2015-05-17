import Card from "./Card.jsx";
import * as resolveDependencies from "../common/resolveDependencies.js";
import "../utils/Array.prototype.find.js";

var Cards = React.createClass({

    propTypes: {
        cardsCollection : React.PropTypes.array,
        onChange        : React.PropTypes.func,
        selectedCards   : React.PropTypes.array
    },

    getInitialState: function(){
        return {
            selectedCards: []
        };
    },

    componentDidUpdate: function(){
        // console.log("new cards", this.state.selectedCards.map((c)=>c.id));
        // this.props.onChange(this.state.selectedCards); this causes an infinate loop
    },

    componentWillUpdate: function(nextProps, nextState){
      
        // update the state if needed
        if (nextProps.selectedCards !== undefined 
        && this.state.selectedCards !== nextProps.selectedCards){
            this.setState({
                selectedCards: nextProps.selectedCards
            });
        }
    },

    onCardClick: function(name, selected){

        // calculate what cards are selected by looking at the 
        // selected state of each Card child
        var selectedCards = Object.keys(this.refs)
            .map((key) => this.refs[key]) // get the actual card
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

        // needs to be deferred so the state is up to date.
        setTimeout(() => {
            // call the onChange callback
            this.props.onChange(selectedCards);
        }, 0);
    },

    render: function(){ 

        return (
            <div className="card-select">
                <h2>Characters:</h2>
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
            </div>
        );
 
    }

});

export default Cards;
