import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], isLoading: true};
	this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/users')
      .then(response => response.json())
      .then(data => this.setState({users: data, isLoading: false}));
  }

  async remove(id){
	await fetch(`api/user/${id}`, {
		method: 'DELETE',
		headers: {
			'Aceept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(() => {
		let updatedUsers = [...this.state.users].filter(i => i.id !== id);
		this.setState({users: updatedUsers});
	});
  }

  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const userList = users.map(user => {
      return <tr key={user.id}>
        <td style={{whiteSpace: 'nowrap'}}>{user.userName}</td>
        <td>{user.address}</td>
    		<td>{user.email}</td>
    		<td>{user.mobile}</td>
		    <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/users/" + user.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>;
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/users/new">Add Group</Button>
          </div>
          <h3>My Group User</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Address</th>
			  <th width="10%">Email</th>
			  <th width="10%">mobile</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {userList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;