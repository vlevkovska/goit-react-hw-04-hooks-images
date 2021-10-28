import React, { Component } from "react";
import ReactLoaderSpinner from "react-loader-spinner";

export default class Loader extends Component {
  render() {
    return (
      <ReactLoaderSpinner
        type="Hearts"
        color="#85309f"
        height={80}
        width={80}
        timeout={3000} //3 secs
        style={{
          position: "fixed",
          top: "50%",
          left: "47%",
        }}
      />
    );
  }
}
