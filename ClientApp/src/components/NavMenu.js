import React, { Component } from "react";

import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";

import { Link } from "react-router-dom";

import authService from "./api-authorization/AuthorizeService";
import { AuthenticationResultStatus } from "./api-authorization/AuthorizeService";
import { QueryParameterNames, LogoutActions, ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

      async processLogoutCallback() {
        const url = window.location.href;
        const result = await authService.completeSignOut(url);
        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                // There should not be any redirects as the only time completeAuthentication finishes
                // is when we are doing a redirect sign in flow.
                throw new Error('Should not redirect.');
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl(this.getReturnUrl(result.state));
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message });
                break;
            default:
                throw new Error("Invalid authentication result status.");
        }
    }

    async populateAuthenticationState() {
        const authenticated = await authService.isAuthenticated();
        this.setState({ isReady: true, authenticated });
    }

    getReturnUrl(state) {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            // This is an extra check to prevent open redirects.
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.")
        }
        return (state && state.returnUrl) ||
            fromQuery ||
            `${window.location.origin}${ApplicationPaths.LoggedOut}`;
    }

    navigateToReturnUrl(returnUrl) {
        return window.location.replace(returnUrl);
    }

  async logout(returnUrl) {
    const state = { returnUrl };
    const isauthenticated = await authService.isAuthenticated();
    if (isauthenticated) {
        const result = await authService.signOut(state);
        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                break;
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl(returnUrl);
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message });
                break;
            default:
                throw new Error("Invalid authentication result status.");
        }
    } else {
        this.setState({ message: "You successfully logged out!" });
    }
}

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            icon="labeled"
            inverted
            vertical
            visible
            width="thin"
          >
            <Menu.Item as="a" href="/">
              <Icon name="home"/>
              Accueil
            </Menu.Item>
            <Menu.Item as="a" href="manage-events">
              <Icon name="add to calendar" />
              Mes tirages
            </Menu.Item>
            <Menu.Item as="a" onClick={this.logout}>
              <Icon name="user delete" />
              Déconnexion
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              { this.props.content }
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
  }
}
