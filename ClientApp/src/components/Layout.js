import React, { Component } from "react";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div style={{ height: "100%"}}>
        <NavMenu content={this.props.children} />                  
      </div>       
    );
  }
}
