import React, { Component } from 'react';
import axios from 'axios';  

export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        users: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/users`)
          .then(res => {
            const users = res.data;
            this.setState({ users });
          })
      }

    render() {
        return (
            <div>
                <p>Welcome to Index Component!!</p>
                <ul>
                    {this.state.users.map(user => <li>{user.username}</li>)}
                </ul>
            </div>
        )
    }
}