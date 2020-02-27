import React, { Component } from "react";

export default class Node extends Component {
  constructor(props) {
    super(props);
    const { isStart, isEnd, isVisited, weight, isWall, row, col } = this.props;
    this.myRef = React.createRef();

    this.state = {
      weight,
      isStart,
      isEnd,
      isWall,
      row,
      col
    };
    this.markVisited = this.markVisited.bind(this);
    this.markPath = this.markPath.bind(this);
    this.markCurrent = this.markCurrent.bind(this);
    this.markClear = this.markClear.bind(this);
  }

  markCurrent() {
    this.myRef.current.style.backgroundColor = "#FFFF00";
  }

  markVisited() {
    this.myRef.current.style.backgroundColor = "#FF00FF";
  }

  markClear() {
    this.myRef.current.style.backgroundColor = "#FFFFFF";
  }

  markPath() {
    this.myRef.current.style.backgroundColor = "#FFFF00";
  }

  render() {
    const { style, row, col } = this.state;
    const id = row + "." + col;
    let { weight, isWall, isStart, isEnd, onClick } = this.props;
    let outerClass = "border border-solid ";
    if (isWall) {
      outerClass = outerClass.concat(" bg-black border-black");
    } else {
      outerClass = outerClass.concat(" border-blue-500");
    }
    if (isEnd) {
      outerClass = outerClass.concat(" bg-red-500");
    }
    if (isStart) {
      outerClass = outerClass.concat(" bg-green-400");
    }

    return (
      <div className={outerClass} ref={this.myRef} id={id}>
        <div className="inline-block w-6 h-6 text-center text-sm border-box">
          {weight}
        </div>
      </div>
    );
  }
}
