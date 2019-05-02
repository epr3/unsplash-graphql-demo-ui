import React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import GuestLayout from "../hoc/GuestLayout";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Link, navigate } from "@reach/router";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const enhancer = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  }),
  handleSubmit: async (values, { props: { client }, setErrors }) => {
    try {
      const response = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email: values.email, password: values.password }
      });
      localStorage.setItem("unsplash_demo:access", response.data.login);
      navigate("/", { replace: true });
    } catch (e) {
      setErrors({ message: e.message });
    }
  }
});

class Login extends React.Component {
  render() {
    const alert = this.props.errors.message ? (
      <div className="notification is-danger">{this.props.errors.message}</div>
    ) : null;
    return (
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          {alert}
          <div className="box">
            <form>
              <BaseInput
                name="email"
                type="email"
                value={this.props.values.email}
                onChange={this.props.handleChange("email")}
                label="Email"
                errorText={
                  this.props.touched.email ? this.props.errors.email : ""
                }
                placeholder="test@test.com"
                onBlur={this.props.handleBlur("email")}
              />
              <BaseInput
                name="password"
                type="password"
                value={this.props.values.password}
                onChange={this.props.handleChange("password")}
                label="Password"
                errorText={
                  this.props.touched.password ? this.props.errors.password : ""
                }
                onBlur={this.props.handleBlur("password")}
              />
              <BaseButton
                type="primary"
                text="Login"
                onClick={this.props.handleSubmit}
              />
              <div className="field">
                <Link to="/register">Create an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(enhancer(GuestLayout(Login)));
