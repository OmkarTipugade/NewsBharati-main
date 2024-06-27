import React, { Component } from "react";
import Gif from "./Gif.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={Gif} alt="loading" />
      </div>
    );
  }
}
