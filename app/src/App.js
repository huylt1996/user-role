import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './UserList';
import UserEdit from './UserEdit';
import Login from './Login';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
//import PublicRoute from './PublicRoute';

class App extends Component {
	render() {
		return (
		  <Router>
			<Switch>
			  <Route path='/' exact={true} component={Home}/>
			  <Route path='/users' exact={true} component={UserList}/>
			  <Route path='/users/:id' component={UserEdit}/>
			  <Route path="/login" component={Login} />
			  <PrivateRoute path="/dashboard" component={Dashboard} />
			</Switch>
		  </Router>
		)
	}
}

export default App;
