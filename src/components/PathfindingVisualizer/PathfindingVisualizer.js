import React, { Component } from "react";
import Node from "../Node/Node";
import bfs from "../../algorithms/bfs";
import dfs from "../../algorithms/dfs";
import dijkstra from "../../algorithms/dijkstra";
import astar from "../../algorithms/astar";
import greedybestfirst from "../../algorithms/greedybestfirst";
import recursiveBacktracker from "../../algorithms/recursivebacktracker";

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    let rows = 20,
      cols = 40,
      startNode = [0, 0],
      endNode = [18, 38],
      nodes = [];

    let myRefs = []; // Updating the UI through setState is too slow/laggy, so I've had to resort to refs
    for (let r = 0; r < rows; r++) {
      let currentRow = [];
      for (let c = 0; c < cols; c++) {
        currentRow.push(React.createRef(null));
      }
      myRefs.push(currentRow);
    }

    this.state = {
      rows,
      cols,
      startNode,
      endNode,
      nodes,
      myRefs,
      disableButtons: false,
      changeStart: false,
      changeEnd: false
    };

    this.createGraph = this.createGraph.bind(this);
    this.runBFS = this.runBFS.bind(this);
    this.runDFS = this.runDFS.bind(this);
    this.runDijkstra = this.runDijkstra.bind(this);
    this.runAstar = this.runAstar.bind(this);
    this.runGBF = this.runGBF.bind(this);
    this.paintNodes = this.paintNodes.bind(this);
    this.markPath = this.markPath.bind(this);
    this.runAlgo = this.runAlgo.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.randomizeBoard = this.randomizeBoard.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  componentDidMount() {
    const { rows, cols, startNode, endNode } = this.state;
    let nodes = this.createGraph(rows, cols);
    this.setState({ nodes: nodes }, () => {
      this.randomizeBoard();
    });
  }

  clearBoard() {
    const { rows, cols, myRefs, nodes } = this.state;
    for (let r = 0; r < this.state.rows; r++) {
      for (let c = 0; c < this.state.cols; c++) {
        if (!nodes[r][c].isStart && !nodes[r][c].isEnd && !nodes[r][c].isWall) {
          console.log(r, c, nodes[r][c].isWall);
          myRefs[r][c].current.markClear();
        }
      }
    }
  }

  randomizeBoard() {
    this.clearBoard();
    let { nodes, rows, cols, startNode, endNode } = this.state;
    nodes = recursiveBacktracker(nodes, startNode, endNode);
    for (let r = 0; r < rows; r++) {
      const currentRow = [];
      for (let c = 0; c < cols; c++) {
        let w = Math.floor(Math.random() * 10);
        nodes[r][c].weight = w;
        let isWall = Math.floor(Math.random() * 10);
        // if (isWall < 2 && !nodes[r][c].isStart && !nodes[r][c].isEnd) {
        //   nodes[r][c].isWall = true;
        // } else {
        //   nodes[r][c].isWall = false;
        // }
      }
    }
    this.setState({ nodes: nodes });
  }

  createGraph(rows, cols) {
    const { startNode, endNode } = this.state;
    const nodes = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        let w = Math.floor(Math.random() * 10);
        const currentNode = {
          col,
          row,
          weight: w,
          isStart: false,
          isEnd: false,
          isVisited: false,
          isWall: false
        };
        if (row === startNode[0] && col === startNode[1]) {
          currentNode.isStart = true;
        }
        if (row === endNode[0] && col === endNode[1]) {
          currentNode.isEnd = true;
        }

        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    return nodes;
  }

  runAlgo(e) {
    this.clearBoard();
    this.setState({ disableButtons: true });
    let ordering;
    if (e.target.id === "BFS") {
      ordering = this.runBFS();
    } else if (e.target.id === "DFS") {
      ordering = this.runDFS();
    } else if (e.target.id === "Dijkstra") {
      ordering = this.runDijkstra();
    } else if (e.target.id === "AStar") {
      ordering = this.runAstar();
    } else if (e.target.id === "GBF") {
      ordering = this.runGBF();
    }
    this.paintNodes(ordering.visited)
      .then(() => {
        this.markPath(ordering.path);
      })
      .catch(() => {
        this.setState({ disableButtons: false });
      });
  }

  runDFS() {
    const { nodes, startNode, endNode } = this.state;
    let ordering = dfs(nodes, startNode, endNode);
    return ordering;
  }

  runBFS() {
    const { nodes, startNode, endNode } = this.state;
    let ordering = bfs(nodes, startNode, endNode);
    return ordering;
  }

  runDijkstra() {
    const { nodes, startNode, endNode } = this.state;
    return dijkstra(nodes, startNode, endNode);
  }

  runAstar() {
    const { nodes, startNode, endNode } = this.state;
    return astar(nodes, startNode, endNode);
  }

  runGBF() {
    const { nodes, startNode, endNode } = this.state;
    return greedybestfirst(nodes, startNode, endNode);
  }

  paintNodes(orderList) {
    const { nodes, startNode, myRefs, rows, cols } = this.state;
    if (nodes.length === 0) {
      return;
    }
    return new Promise((resolve, reject) => {
      let i = 0;
      for (const cor of orderList) {
        const currentNodeRef = myRefs[cor[0]][cor[1]].current;
        setTimeout(i => {
          currentNodeRef.markVisited();
          if (currentNodeRef.props.isEnd) {
            return resolve();
          } else if (cor === orderList[orderList.length - 1]) {
            return reject();
          }
        }, 5 * i);
        i += 1;
      }
    });
  }

  markPath(path) {
    const { myRefs, endNode } = this.state;
    let i = 0;
    for (const cor of path) {
      const currentNodeRef = myRefs[cor[0]][cor[1]].current;
      setTimeout(() => {
        currentNodeRef.markPath();
        if (cor[0] === endNode[0] && cor[1] === endNode[1]) {
          this.setState({ disableButtons: false });
        }
      }, 10 * i);
      i += 1;
    }
  }

  onMouseDown(e) {
    const { startNode, endNode } = this.state;
    e.preventDefault();
    let [r, c] = e.currentTarget.querySelector("div").id.split(".");
    r = parseInt(r);
    c = parseInt(c);
    if (startNode[0] === r && startNode[1] === c) {
      this.setState({ changeStart: true });
    } else if (endNode[0] === r && endNode[1] === c) {
      this.setState({ changeEnd: true });
    }
  }

  onMouseUp(e) {
    e.preventDefault();
    const { nodes, startNode, endNode } = this.state;
    nodes[startNode[0]][startNode[1]].isWall = false;
    nodes[endNode[0]][endNode[1]].isWall = false;
    this.setState({ changeStart: false, changeEnd: false, nodes: nodes });
  }

  onMouseEnter(e) {
    let [r, c] = e.currentTarget.querySelector("div").id.split(".");
    r = parseInt(r);
    c = parseInt(c);
    const { changeStart, changeEnd, nodes, startNode, endNode } = this.state;
    if (!changeStart && !changeEnd) {
      return;
    }
    if (changeStart) {
      nodes[startNode[0]][startNode[1]].isStart = false;
      nodes[r][c].isStart = true;
      this.setState({ startNode: [r, c], nodes: nodes });
    }
    if (changeEnd) {
      nodes[endNode[0]][endNode[1]].isEnd = false;
      nodes[r][c].isEnd = true;
      this.setState({ endNode: [r, c], nodes: nodes });
    }
  }

  render() {
    const { nodes, myRefs, disableButtons } = this.state;
    return (
      <div className="main lg:flex xl2:m-auto xl2:w-3/4">
        <div className="buttons lg:flex-3">
          <button
            onClick={this.runAlgo}
            disabled={disableButtons}
            id="DFS"
            className="btn block m-4 w-full"
          >
            Run DFS
          </button>
          <button
            onClick={this.runAlgo}
            disabled={disableButtons}
            id="BFS"
            className="btn block m-4 w-full"
          >
            Run BFS
          </button>
          <button
            onClick={this.runAlgo}
            disabled={disableButtons}
            id="Dijkstra"
            className="btn block m-4 w-full"
          >
            Run Dijkstra
          </button>
          <button
            onClick={this.runAlgo}
            disabled={disableButtons}
            id="AStar"
            className="btn block m-4 w-full"
          >
            Run A*
          </button>
          <button
            onClick={this.runAlgo}
            disabled={disableButtons}
            id="GBF"
            className="btn block m-4 w-full"
          >
            Run Greedy Best First
          </button>
          <button
            onClick={this.randomizeBoard}
            disabled={disableButtons}
            className="btn block m-4 w-full focus:outline-none"
          >
            New Board
          </button>
        </div>
        <div className="grid w-full lg:flex-5  lg:justify-center">
          {nodes.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  return (
                    <div
                      className="inline-block"
                      key={nodeIdx}
                      onMouseDown={this.onMouseDown}
                      onMouseUp={this.onMouseUp}
                      onMouseEnter={this.onMouseEnter}
                    >
                      <Node
                        isStart={node.isStart}
                        row={node.row}
                        col={node.col}
                        isEnd={node.isEnd}
                        isVisited={node.isVisited}
                        ref={myRefs[node.row][node.col]}
                        weight={node.weight}
                        isWall={node.isWall}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
