import React, { Component } from 'react';

class User extends Component {
    render () {
      return (
        <li>
          {this.props.name} - {this.props.email}
        </li>
      );
    }
  }

export default User;

class UserList extends Component {
    render () {
      return (
          <ul>
            {this.props.users.map(u => {
              return (
                <User
                  key={u.id}
                  name={u.name}
                  email={u.email}
                />
              );
            })}
          </ul>
      );
    }
  }