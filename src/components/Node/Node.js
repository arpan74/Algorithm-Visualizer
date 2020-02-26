import React, { Component } from "react";

export default class Node extends Component {
  constructor(props) {
    super(props);
    const { isStart, isEnd, isVisited, weight } = this.props;
    this.myRef = React.createRef();
    let bgColor = "#FFFFFF";
    if (isStart) {
      bgColor = "#8CC152";
    }
    if (isEnd) {
      bgColor = "#FF0000";
    }
    this.state = {
      style: { backgroundColor: bgColor, border: "gray solid 1px" },
      weight,
      isStart,
      isEnd
    };
    this.markVisited = this.markVisited.bind(this);
    this.markPath = this.markPath.bind(this);
    this.markCurrent = this.markCurrent.bind(this);
  }

  markCurrent() {
    this.myRef.current.style.backgroundColor = "#FFFF00";
  }

  markVisited() {
    if (!this.state.isStart && !this.state.isEnd) {
      this.myRef.current.style.backgroundColor = "#FF00FF";
    }
  }

  markClear() {
    if (!this.state.isStart && !this.state.isEnd) {
      this.myRef.current.style.backgroundColor = "#FFFFFF";
    }
  }

  markPath() {
    if (!this.state.isStart && !this.state.isEnd) {
      this.myRef.current.style.backgroundColor = "#FFFF00";
    }
  }

  render() {
    const { style } = this.state;
    const { weight } = this.props;
    return (
      <div className="inline-block" style={style} ref={this.myRef}>
        <div className="inline-block w-6 h-6 text-center text-sm border-box">
          {weight}
        </div>
      </div>
    );
  }
}
