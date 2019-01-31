import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { apiCallPath } from '../config/config'

class RegistrationPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            isRegistered: false
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
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        fetch(`${apiCallPath}/users/register`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then((res) => {
                alert(res.notice)
                if (res.isRegistered) {
                    this.setState({
                        isRegistered: true
                    })
                } else {
                    alert(res.notice)
                    this.setState({
                        username: '',
                        email: '',
                        password: ''
                    })
                }

            })
    }

    render() {
        return (
            <div>
                <h2> Registration Form </h2>
                <form onSubmit={this.handleSubmit}>
                    <label> User Name
                            <input type="text" name="username" value={this.state.name} onChange={this.handleChange} />
                    </label><br />
                    <label> Email
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label><br />
                    <label> Password
                            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label><br />
                    <input type="submit" value="Register" />
                </form>
                {this.state.isRegistered ?
                    <Redirect to='/' /> : ''}
            </div>

        )
    }
}

export default RegistrationPage