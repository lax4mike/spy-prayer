import classNames from "../utils/classNames.js";
import SvgIcon from "./SvgIcon.jsx";

var Header = React.createClass({

    propTypes: {
        title                : React.PropTypes.string,
        onOptionsClick       : React.PropTypes.func,
        optionsPanelIsActive : React.PropTypes.bool
    },

    onOptionsClick: function(){
        this.props.onOptionsClick();
    },

    render: function(){

        var classes = classNames(
            "options-btn",
            {
                "is-active": this.props.optionsPanelIsActive
            }
        );

        return(
            <header>
                <div className="header-content">
                    <h1>{this.props.title}</h1>

                    <div className="options-btn-holder" onClick={this.onOptionsClick}>
                        <div className={classes}>
                            <span> toggle menu </span>
                        </div>
                    </div>

                </div>
            </header>
        );
    }

});

export default Header;
