var MyButton = React.createClass({
    propTypes: {
        clickHandler: React.PropTypes.func.isRequired
    },
    handleClick: function(e) {
        this.props.clickHandler();
    },
    render: function() {
        return <button className="componentButton" onClick={this.handleClick}>Click Me!</button>;
    }
});

var MyComponent = React.createClass({
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
            <div className="component">
                <table>
                    <tr><td><span className="componentText">{this.state.text}</span></td></tr>
                    <tr><td><MyButton clickHandler={this.handleButtonClick}/></td></tr>
                </table>
            </div>
        );
    }
});

React.render(<MyComponent text="Hello" showText={true}/>, document.getElementById("components"));