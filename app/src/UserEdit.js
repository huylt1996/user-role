import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class UserEdit extends Component {

  // Init Object
  emptyItemUser = {
    userName: '',
    fullName: '',
    address: '',
    idNo: '',
    email: '',
    mobile: '',
	description: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItemUser
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
		fetch(`/api/user/${this.props.match.params.id}`).then(response => response.json()).then(data => this.setState({
			item : data  
		}));
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/user', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/users');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;
	console.log(item);
    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="userName">User Name</Label>
              <Input type="text" name="userName" id="userName" value={item.userName || ''}
                     onChange={this.handleChange} autoComplete="userName"/>
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="fullName">Full Name</Label>
              <Input type="text" name="fullName" id="fullName" value={item.fullName || ''}
                     onChange={this.handleChange} autoComplete="fullName"/>
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="idNo">ID No</Label>
              <Input type="text" name="idNo" id="idNo" value={item.idNo || ''}
                     onChange={this.handleChange} autoComplete="idNo"/>
            </FormGroup>
          </div>
          
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="email">Email</Label>
              <Input type="text" name="email" id="email" value={item.email || ''}
                     onChange={this.handleChange} autoComplete="email"/>
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="mobile">Mobile</Label>
              <Input type="text" name="mobile" id="mobile" value={item.mobile || ''}
                     onChange={this.handleChange} autoComplete="mobile"/>
            </FormGroup>
            <FormGroup className="col-md-4 mb-3">
              <Label for="address">Address</Label>
              <Input type="text" name="address" id="address" value={item.address || ''}
                     onChange={this.handleChange} autoComplete="address"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="text" name="description" id="description" value={item.description || ''}
                   onChange={this.handleChange} autoComplete="description"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/users">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(UserEdit);