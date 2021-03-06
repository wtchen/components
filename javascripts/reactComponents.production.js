var MyButton = React.createClass({displayName: "MyButton",
    propTypes: {
        clickHandler: React.PropTypes.func.isRequired
    },
    handleClick: function(e) {
        this.props.clickHandler();
    },
    render: function() {
        return React.createElement("button", {className: "componentButton", onClick: this.handleClick}, "Click Me!");
    }
});

var MyComponent = React.createClass({displayName: "MyComponent",
    propTypes: {
        text: React.PropTypes.string.isRequired,
        showText: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        return {text: this.props.text, showText: this.props.showText};
    },
    handleButtonClick: function() {
        var currTextState = this.state.showText;
        if (currTextState) {
            this.setState({text: "", showText: !currTextState});
        }
        else {
            this.setState({text: this.props.text, showText: !currTextState});
        }
    },
    render: function() {
        return (
            React.createElement("div", {className: "component"}, 
                React.createElement("table", null, 
                    React.createElement("tr", null, React.createElement("td", null, React.createElement("span", {className: "componentText"}, this.state.text))),
                    React.createElement("tr", null, React.createElement("td", null, React.createElement(MyButton, {clickHandler: this.handleButtonClick})))
                )
            )
        );
    }
});

React.render(React.createElement(MyComponent, {text: "Hello", showText: true}), document.getElementById("components"));
