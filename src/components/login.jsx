import React, { Component } from 'react'
import validator from 'validator'
// import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

import { apiCallPath } from '../config/config'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            token: '',
            isLoggedIn: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        // value will be available for short period of time
        event.persist()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {

        event.preventDefault()

        if (!validator.isEmail(this.state.email)) {
            alert('Please enter valid email')
        } else if (this.state.password.length < 8) {
            alert('Password length cannot be less than 8 characters')
        } else {
            const loginData = {
                email: this.state.email,
                password: this.state.password
            }
            // axios.post('http://localhost:4000/users/login', loginData)
            fetch(`${apiCallPath}/users/login`, {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { 'Content-Type': "application/json" }
            })
                .then(res => {
                    this.setState({
                        token: res.headers.get('x-auth')
                    })
                    sessionStorage.setItem('token', res.headers.get('x-auth'))
                    return res.json()
                })
                .then((res) => {

                    if (res.isLoggedIn) {
                        this.setState({
                            isLoggedIn: true
                        })
                    } else {

                        alert(res.notice)
                        this.setState({
                            email: '',
                            password: ''
                        })
                    }
                })
                .catch(err => console.log(err))
        }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Email
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label><br />
                    <label> Password
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} /><br />
                    </label>
                    <input type="submit" value="Login" />
                </form>
                <Link to='./register'> Register </Link>
                {this.state.isLoggedIn ?
                    <Redirect to='/homepage' /> : ''}
            </div>
        )
    }
}

export default LoginComponent