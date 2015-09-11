import React from "react";

const SvgIcon = React.createClass({

    displayName: "SvgIcon",

    propTypes: {
        className : React.PropTypes.string,
        href      : React.PropTypes.string
    },

    render: function() {

        // http://stackoverflow.com/questions/23402542/embedding-svg-into-reactjs
        var useHtml = {__html: "<use xlink:href='" + this.props.href + "'></use>"};

        return (
            <svg 
                className={this.props.className}
                dangerouslySetInnerHTML={useHtml}>
            </svg>
        );
    }

});

export default SvgIcon;
