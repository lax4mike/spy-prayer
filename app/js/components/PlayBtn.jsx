import React from "react";

const PlayBtn = React.createClass({

    displayName: "PlayBtn",

    propTypes: {
        isPlaying : React.PropTypes.bool,
        onClick  : React.PropTypes.func
    },

    render: function(){

        var btnText = <span><span className="sub">Bow your heads and</span> Pray</span>;

        if (this.props.isPlaying){
            btnText = "Stop";
        }

        return (
            <button onClick={this.props.onClick} className="play-btn">
                {btnText}
            </button>
        );
    }

});

export default PlayBtn;
