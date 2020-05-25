import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h2 class="label">Welcome to Manage User !!!!</h2>
        </Container>
      </div>
    );
  }
}

export default Home;