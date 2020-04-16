import React from "react";

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }



  render() {
    return (
      <div>
        <h1>SignUp </h1>
        <button onClick={() => this.props.history.push("/login")}>
          Login Instead
        </button>
        <div>
          Email:
          <input type="text" name="email" defaultValue={this.state.email} onChange={this.handleInputChange} />
          Password: <input type="password" name="password" defaultValue={this.state.password} onChange={this.handleInputChange} />
        </div>
        <button className="button" onClick={() => alert(this.state.email + this.state.password)}>Sign Up</button>
      </div>
    );
  }
}

export default SignUpComponent;
