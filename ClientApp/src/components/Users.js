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
  Header,
  Label,
  Select
} from "semantic-ui-react";

import { Link } from "react-router-dom";

const options = [
  { key: "c", text: "Client", value: "Client" },
  { key: "a", text: "Admin", value: "Admin" }
];

export class Users extends Component {
  static displayName = "Manage Users";

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
      password: "",
      username: "",
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      role: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.createNewEvent = this.createNewEvent.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
  }

  async fetchUsersData() {
    const token = await authService.getAccessToken();
    const response = await fetch("users/", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data;
  }

  async createNewEvent() {
    var This = this;
    const token = await authService.getAccessToken();
    axios.post(
      "users/",
      {
        user: {
          UserName: this.state.username,
          Nom: this.state.nom,
          Prenom: this.state.prenom,
          email: this.state.email,
          normalizedEmail: this.state.email.toUpperCase(),
          normalizedUserName: this.state.username.toUpperCase(),
          emailConfirmed: true,
          telephone: this.state.telephone,
          role: "client"
        },
        password: this.state.password
      },
      {
        withCredentials: true,
        headers: !token ? {} : { Authorization: `Bearer ${token}` }
      }
    ).then(function (response) {
      console.log(response);
      This.setState({ users: [...This.state.users, response.data]})
    });
  }


  generatePassword() {
    var specials = "!@#$%^&*()_+{}:\"<>?|[];',./`~";
    var lowercase = "abcdefghijklmnopqrstuvwxyz";
    var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789";

    var all = specials + lowercase + uppercase + numbers;

    String.prototype.pick = function(min, max) {
      var n,
        chars = "";
  
      if (typeof max === "undefined") {
        n = min;
      } else {
        n = min + Math.floor(Math.random() * (max - min));
      }
  
      for (var i = 0; i < n; i++) {
        chars += this.charAt(Math.floor(Math.random() * this.length));
      }
  
      return chars;
    }

    String.prototype.shuffle = function() {
      var array = this.split('');
      var tmp, current, top = array.length;
  
      if (top) while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
      }
  
      return array.join('');
  };

    this.setState({
      "password": (
        specials.pick(1) +
        lowercase.pick(1) +
        uppercase.pick(1) +
        all.pick(12, 12)
      ).shuffle()
    });
  }

  goToPage(url) {
    document.location.href = document.location + url;
  }

  async componentDidMount() {
    this.setState({ user: await authService.getUser() });
    this.setState({ users: await this.fetchUsersData() });
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  handleChangeTime(event, { name, value }) {
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
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Nom</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.users.map(row => {
                return (
                  <Table.Row>
                    <Table.Cell>{row.id}</Table.Cell>
                    <Table.Cell>{row.userName}</Table.Cell>
                    <Table.Cell>{row.email}</Table.Cell>
                    <Table.Cell>{row.nom + " " + row.prenom}</Table.Cell>
                    <Table.Cell>{row.role}</Table.Cell>
                    <Table.Cell>
                      <Modal
                        trigger={
                          <Icon name="trash alternate" color="red"></Icon>
                        }
                        basic
                        size="small"
                      >
                        <Header
                          icon="trash alternate"
                          content="Supprimer l'utilisateur?"
                        />
                        <Modal.Content>
                          <p>
                            Êtes vous sûr de vouloir supprimer cet utiliser? Cet
                            action est irréversible.
                          </p>
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
                        <Icon name="plus" /> Créer un user
                      </Button>
                    }
                    centered={false}
                  >
                    <Modal.Header>Création d'un user</Modal.Header>
                    <Modal.Content>
                      <Form>
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            label="Nom d'utilisateur"
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                          />
                          <Form.Input
                            fluid
                            label="Mot de passe"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                          />
                          <Form.Button
                            onClick={this.generatePassword}
                            label={
                              this.state.password == ""
                                ? "Aide"
                                : this.state.password
                            }
                          >
                            Générer
                          </Form.Button>
                          <Form.Field
                            fluid
                            control={Select}
                            label="Role"
                            name="role"
                            options={options}
                            placeholder="Role"
                            onChange={this.handleChange}
                            value={this.state.role}
                          />
                        </Form.Group>
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            label="Nom"
                            placeholder="Nom"
                            name="nom"
                            value={this.state.nom}
                            onChange={this.handleChange}
                          />
                          <Form.Input
                            fluid
                            label="Prenom"
                            placeholder="Prenom"
                            name="prenom"
                            value={this.state.prenom}
                            onChange={this.handleChange}
                          />
                          <Form.Input
                            fluid
                            type="email"
                            label="Email"
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                        <Form.Group widths="3">
                          <Form.Input
                            fluid
                            label="Telephone"
                            placeholder="Telephone"
                            name="telephone"
                            value={this.state.telephone}
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                        <Form.Button onClick={this.createNewEvent}>
                          Créer
                        </Form.Button>
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
