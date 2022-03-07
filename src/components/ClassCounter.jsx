import React, { Component } from "react";

export default class ClassCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };


    this.fIncrement = this.fIncrement.bind(this);
    this.fDecrement = this.fDecrement.bind(this);
  }

  /** Инкримент */
  fIncrement() {
    this.setState({ count: this.state.count + 1 });
  }

  /** Дикримент */
  fDecrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.fIncrement}>Increment</button>
        <button onClick={this.fDecrement}>Decrement</button>
      </div>
    );
  }
}
