import React, { Component } from "react";
import * as P5Lib from "./p5Lib.js";
import data from "./p5Settings.json";

class SolarSystem extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  Sketch = (sketch) => {
    const { general, background, sun, planet } = data;
    let rangedSliders = [...planet.rangedSliders];
    let singleSliders = [
      ...sun.singleSliders,
      ...planet.singleSliders,
      ...general.singleSliders,
      ...background.singleSliders,
    ];

    sketch.setup = () => {
      P5Lib.setup(sketch, rangedSliders, singleSliders);
    };

    sketch.draw = () => {
      P5Lib.draw(sketch, rangedSliders, singleSliders);
    };

    sketch.windowResized = () => {
      P5Lib.windowResized(sketch);
    };
  };

  componentDidMount() {
    const p5 = require("p5");
    this.Sketch = new p5(this.Sketch, this.ref.current);
  }

  render() {
    return <div className="sketch-container" ref={this.ref}></div>;
  }
}

export default SolarSystem;
