import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";

import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from "semantic-ui-calendar-react";

import axios from "axios";

import Moment from "react-moment";

import {
  Button,
  Icon,
  Table,
  Container,
  Modal,
  Form,
  Header
} from "semantic-ui-react";

import { Link } from "react-router-dom";

export class Tirages extends Component {
  static displayName = "Manage Events";

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      events: [],
      Nom: "",
      Prénom: "",
      startTime: "",
      endTime: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTimeEnd = this.handleChangeTimeEnd.bind(this);
    this.handleChangeTimeStart = this.handleChangeTimeStart.bind(this);
    this.createNewEvent = this.createNewEvent.bind(this);
  }

  async fetchEventsData() {
    const token = await authService.getAccessToken();
    const response = await fetch("events/" + this.state.user.sub, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data;
  }

  async createNewEvent() {
    const token = await authService.getAccessToken();
    axios.post(
      "events",
      {
        Name: this.state.Nom,
        StartDate: new Date(this.state.startTime).toISOString(),
        EndDate: new Date(this.state.endTime).toISOString(),
        UserId: this.state.user.sub
      },
      {
        withCredentials: true,
        headers: !token ? {} : { Authorization: `Bearer ${token}` }
      }
    );
  }

  goToPage(url) {
    document.location.href = document.location + url;
  }

  async componentDidMount() {
    this.setState({ user: await authService.getUser() });
    this.setState({ events: await this.fetchEventsData() });
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  handleChangeTimeStart(event, { name, value }) {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleChangeTimeEnd(event, { name, value }) {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Nom</Table.HeaderCell>
                <Table.HeaderCell>Date de Début</Table.HeaderCell>
                <Table.HeaderCell>Date de Fin</Table.HeaderCell>
                <Table.HeaderCell>Participants</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.events.map(row => {
                return (
                  <Table.Row>
                    <Table.Cell>{row.id}</Table.Cell>
                    <Table.Cell>{row.name}</Table.Cell>
                    <Table.Cell>
                      <Moment format="YYYY-MM-DD HH:mm">{row.startDate}</Moment>
                    </Table.Cell>
                    <Table.Cell>
                      <Moment format="YYYY-MM-DD HH:mm">{row.endDate}</Moment>
                    </Table.Cell>
                    <Table.Cell>0</Table.Cell>
                    <Table.Cell>
                      <Link to={"/manage-tickets/" + row.id}>
                        <Icon name="eye"></Icon>
                      </Link>
                      <Modal
                        trigger={<Icon name="play"></Icon>}
                        basic
                        size="small"
                      >
                        <Header icon="ticket" content="Lancer le tirage" />
                        <Modal.Content>
                          <p>Êtes-vous sûr de vouloir commencer le tirage?</p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button basic color="red" inverted>
                            <Icon name="remove" /> Non
                          </Button>
                          <Button color="green" inverted>
                            <Icon name="checkmark" /> Oui
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="5">
                  <Modal
                    trigger={
                      <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                      >
                        <Icon name="plus" /> Créer tirage
                      </Button>
                    }
                    centered={false}
                  >
                    <Modal.Header>Création d'un tirage</Modal.Header>
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
                          <DateTimeInput
                            name="startTime"
                            placeholder="Date Time"
                            dateTimeFormat="YYYY/MM/DD HH:mm"
                            label="Date de début"
                            value={this.state.startTime}
                            iconPosition="left"
                            onChange={this.handleChangeTimeStart}
                          />
                          <DateTimeInput
                            name="endTime"
                            placeholder="Date Time"
                            dateTimeFormat="YYYY/MM/DD HH:mm"
                            value={this.state.endTime}
                            label="Date de fin"
                            iconPosition="left"
                            onChange={this.handleChangeTimeEnd}
                          />
                        </Form.Group>
                        <Form.Button onClick={this.createNewEvent}>
                          Créer
                        </Form.Button>
                      </Form>
                    </Modal.Content>
                  </Modal>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </div>
    );
  }
}
