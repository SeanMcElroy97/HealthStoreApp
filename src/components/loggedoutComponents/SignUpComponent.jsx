import React from "react";
import AuthenticationService from "../../services/AuthenticationService"


class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      shippingAddress: "",
      cardNumber: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.signUpSubmit = this.signUpSubmit.bind(this)

  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }



  signUpSubmit(email, password, shippingAddress, cardNumber) {

    AuthenticationService.signupUser(email, password, shippingAddress, cardNumber)
      .then((response) => {
        AuthenticationService.successfulJWTLogin(response.data.jwt, email)
        this.props.history.push('/homepage')

      })
      .catch(response => alert(response))



  }



  render() {
    return (
      <div>
        <h1>SignUp </h1>
        <button onClick={() => this.props.history.push("/login")}>
          Login Instead
        </button>
        <div>
          Email: <input type="text" name="email" defaultValue={this.state.email} onChange={this.handleInputChange} />
          Password: <input type="password" name="password" defaultValue={this.state.password} onChange={this.handleInputChange} />
          Address: <input type="text" name="shippingAddress" defaultValue={this.state.shippingAddress} onChange={this.handleInputChange} />
          cardNumber: <input type="text" name="cardNumber" defaultValue={this.state.cardNumber} onChange={this.handleInputChange} />
        </div>
        <button className="button" onClick={() => this.signUpSubmit(this.state.email, this.state.password, this.state.shippingAddress, this.state.cardNumber)}>Sign Up</button>
      </div>
    );
  }
}

export default SignUpComponent;
