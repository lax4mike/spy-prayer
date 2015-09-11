import React      from "react";
import classNames from "../utils/classNames.js";

import SvgIcon    from "./SvgIcon.jsx";

/* 
{
    "id": "commander",
    "name": "Commander",
    "team": "resistance",
    "description": "Knows spies, must remain hidden",
    "dependencies": ["assassin"]
}
*/

const Card = React.createClass({

    displayName: "Card",

    propTypes: {
        card     : React.PropTypes.object, // straight from config
        selected : React.PropTypes.bool, // will set state
        onClick  : React.PropTypes.func,
        disabled : React.PropTypes.bool
    },

    getInitialState: function(){
        // this is an anti-pattern... https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
        return {
            selected: this.props.selected
        };
    },

    componentWillUpdate: function(nextProps, nextState){
        
        // update the state if needed
        if (this.state.selected !== nextProps.selected){
            this.setState({
                selected: nextProps.selected
            });
        }
    },

    // swap the selected state when this card is clicked
    handleClick: function(){

        // don't do anything if this card is disabled
        if (this.props.disabled){ return; }
        
        var newState = { selected: !this.state.selected };
        
        this.setState(newState, function(){
            if (this.props.onClick){
                this.props.onClick(this.props.card.name, this.state.selected);
            }
        });

    },

    _getIcon: function(){
        const classIcon = classNames(
            "card__icon",
            "card__icon--" + this.props.card.icon.toLowerCase()
        );

        // for avalon images
        if (this.props.card["icon-type"] === "png"){
            return <div className={classIcon}></div>;
        }
        // for resistance svgs
        else if (this.props.card["icon-type"] === "svg"){
            return (
                <div className={classIcon}>
                   <SvgIcon href={"img/svg-sprite.svg#icon-" + this.props.card.icon} />
               </div>
           );
        }
    },

    render: function(){ 

        const classCard = classNames(
            "card",
            { 
                "card--selected": this.state.selected,
                "card--disabled": this.props.disabled
            }
        );

        return (
            <div className={classCard}>
                <div className="card__btn" onClick={this.handleClick}>
                    {this._getIcon()}
                    <div className="card__info">
                        <div className="card__name">{this.props.card.name}</div>
                        <div className="card__description">{this.props.card.description}</div>
                    </div>
                </div>
            </div>
        );
 
    }

});

export default Card;
