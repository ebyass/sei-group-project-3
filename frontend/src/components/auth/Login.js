import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken, getPayload } from '../../lib/_auth'


class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    error: ''
  }
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }
  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      const userId = getPayload().sub
      this.props.history.push(`/users/${userId}`) //* <-- this will need to change - newsfeed maybe??
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }
  
  render() {
    const { formData, error } = this.state
    return (
      <section className="section">
        <div className="container">
        <h1 className="accountable-brand">Welcome to Accountable</h1>
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : '' }`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${error ? 'is-danger' : ''}`}
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
                {error && <small className="help is-danger">{error}</small>}
              </div>
              <div className="field">
                <button type="submit" className="button blue is-fullwidth">Log in</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Login