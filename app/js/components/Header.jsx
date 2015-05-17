
var Header = React.createClass({

    propTypes: {
        title          : React.PropTypes.string,
        onOptionsClick : React.PropTypes.func
    },

    onOptionsClick: function(){
        this.props.onOptionsClick();
    },

    render: function(){
        return(
            <header>
                <div className="header-content">
                    <h1>{this.props.title}</h1>

                    <div className="options-btn" onClick={this.onOptionsClick}></div>
                </div>
            </header>
        );
    }

});

export default Header;
