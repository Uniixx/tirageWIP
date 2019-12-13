import React, { Component } from "react";

import authService from "./api-authorization/AuthorizeService";

import { Segment, Statistic, Container } from "semantic-ui-react";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      count: 0
    };
  }

  async componentDidMount() {
    this.setState({ user: await authService.getUser() });
    this.setState({ count: await this.fetchTicketsData() });
  }

  async fetchTicketsData() {
    const token = await authService.getAccessToken();
    const response = await fetch("tickets", {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data.length;
  }

  render() {
    return (
      <div>
        <h1>Bienvenue, {this.state.user.name}</h1>
        <Container fluid>
          <Segment inverted>
            <Statistic.Group inverted>
              <Statistic>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Billets actif(s)</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{ this.state.count }</Statistic.Value>
                <Statistic.Label>Billets vendu(s)</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Tirage(s) en cours</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Container>
      </div>
    );
  }
}
