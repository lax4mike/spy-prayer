

var SvgIcon = React.createClass({

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

module.exports = SvgIcon;
