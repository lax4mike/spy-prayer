import classNames from "../utils/classNames.js";

/* 
{
    "id": "commander",
    "name": "Commander",
    "team": "resistance",
    "description": "Knows spies, must remain hidden",
    "dependencies": ["assassin"]
}
*/

var Card = React.createClass({

    propTypes: {
        card     : React.PropTypes.object, // straight from config
        selected : React.PropTypes.bool, // will set state
        onClick  : React.PropTypes.func
    },

    getInitialState: function(){
        // this is an anti-pattern... https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
        return {
            selected: this.props.selected
        };
    },

    // swap the selected state when this card is clicked
    handleClick: function(){
        this.setState({
            selected: !this.state.selected
        });

        // needs to be deferred so the state has a chance to update
        setTimeout(function(){
            if (this.props.onClick){
                this.props.onClick(this.props.card.name, this.state.selected);
            } 
        }.bind(this), 0);
    },

    // update only if the state is different
    shouldComponentUpdate: function(nextProps, nextState){
        return this.state.selected !== nextState.selected
            || this.state.selected !== nextProps.selected;
    },

    componentWillUpdate: function(nextProps, nextState){
        
        // update the state if needed
        if (this.state.selected !== nextProps.selected){
            this.setState({
                selected: nextProps.selected
            });
        }
    },

    render: function(){ 

        var classCard = classNames(
            "card",
            { "card--selected": this.state.selected }
        );

        var classAffiliation = classNames(
            "card__affiliation",
            "card__affiliation--" + this.props.card.team.toLowerCase()
        );

        return (
            <div className={classCard} onClick={this.handleClick}>
                <div className={classAffiliation}></div>
                <div className="card__info">
                    <div className="card__name">{this.props.card.name}</div>
                    <div className="card__description">{this.props.card.description}</div>
                </div>
            </div>
        );
 
    }

});

export default Card;
