import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";

import axios from "axios";

import Moment from 'react-moment';

import { Button, Icon, Table, Container, Modal, Form } from "semantic-ui-react";

export class Billets extends Component {
  static displayName = "Manage Tickets";

  constructor(props) {
    super(props);
    this.state = { user: {}, tickets: [], Nom: "", Prénom: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  async fetchTicketsData() {
    const token = await authService.getAccessToken();
    const response = await fetch("tickets/" + this.props.match.params.id , {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data;
  }

  async createNewTicket() {
    axios.post("tickets", {
      Number: this.state.number,
      Name: this.state.eventName,
      FirstName: this.state.lastName,
      LastName: this.state.firstName,
      EventId: this.state.eventId
    });
  }

  async componentDidMount() {
    this.setState({ user: await authService.getUser() });
    this.setState({ tickets: await this.fetchTicketsData() });
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Numéro</Table.HeaderCell>
                <Table.HeaderCell>Nom</Table.HeaderCell>
                <Table.HeaderCell>Assigné à</Table.HeaderCell>
                <Table.HeaderCell>Date de création</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
                { this.state.tickets.map(row => {
                    return (
                      <Table.Row>
                        <Table.Cell>{row.id}</Table.Cell>
                        <Table.Cell>{row.number}</Table.Cell>
                        <Table.Cell>{row.eventId}</Table.Cell>
                        <Table.Cell>{row.fullName}</Table.Cell>
                        <Table.Cell>
                        <Moment format="YYYY-MM-DD HH:mm">
                          {row.creation_Date}
                        </Moment>
                          </Table.Cell>
                      </Table.Row>
                    )
                }) }
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="4">
                  <Modal
                    trigger={
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="ticket" /> Ajout Ticket
                      </Button>
                    }
                    centered={false}
                  >
                    <Modal.Header>Générer un billet</Modal.Header>
                    <Modal.Content>
                      <Form>
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            label="Nom"
                            placeholder="Nom"
                            name="Nom"
                            value={this.state.Nom}
                            onChange={this.handleChange}
                          />
                          <Form.Input
                            fluid
                            label="Prénom"
                            placeholder="Prénom"
                            name="Prénom"
                            value={this.state.Prénom}
                            onChange={this.handleChange}
                          />
                          <Form.Select
                            fluid
                            label="Évenement"
                            placeholder="Évenement"
                          />
                        </Form.Group>
                        <Form.Button>Créer</Form.Button>
                      </Form>
                    </Modal.Content>
                  </Modal>

                  {/* <Button size="small">Approve</Button>
                <Button disabled size="small">
                  Approve All
                </Button> */}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </div>
    );
  }
}