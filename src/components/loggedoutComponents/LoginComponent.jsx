import React from "react";
import AuthenticationService from '../../services/AuthenticationService'

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }

  loginSubmit() {
    AuthenticationService.loginUser(this.state.email, this.state.password)
      .then((response) => {
        //console.log(response)
        AuthenticationService.successfulJWTLogin(response.data.jwt, this.state.email)
        if (response.data.role === "[ROLE_CUSTOMER]") {
          this.props.history.push('/homepage')
        }
        if (response.data.role === "[ROLE_ADMIN]") {
          this.props.history.push('/adminhomepage')
        }
      })
      .catch(() => alert('incorrect details'))
  }


  render() {
    return (
      <div>
        <h1> Login</h1>
        <button onClick={() => this.props.history.push("/signup")}>
          SignUp Instead
        </button>
        <div>
          Email:
          <input type="text" name="email" defaultValue={this.state.email} onChange={this.handleInputChange} />
          Password: <input type="password" name="password" defaultValue={this.state.password} onChange={this.handleInputChange} />
        </div>
        <button className="button" onClick={() => this.loginSubmit()}>Login</button>
      </div>
    );
  }
}

export default LoginComponent;
