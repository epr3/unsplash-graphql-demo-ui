import React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import GuestLayout from "../hoc/GuestLayout";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Link, navigate } from "@reach/router";

const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    register(email: $email, password: $password, name: $name)
  }
`;

const enhancer = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    name: ""
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  }),
  handleSubmit: async (values, { props: { client }, setErrors }) => {
    try {
      const response = await client.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          email: values.email,
          password: values.password,
          name: values.name
        }
      });
      localStorage.setItem("unsplash_demo:access", response.data.register);
      navigate("/", { replace: true });
    } catch (e) {
      setErrors({ message: e.message });
    }
  }
});

class Register extends React.Component<Props> {
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
                name="name"
                type="text"
                value={this.props.values.name}
                onChange={this.props.handleChange("name")}
                label="Name"
                errorText={
                  this.props.touched.name ? this.props.errors.name : ""
                }
                placeholder="John"
                onBlur={this.props.handleBlur("name")}
              />
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
                text="Register"
                onClick={this.props.handleSubmit}
              />
              <div className="field">
                Already have an account? <Link to="/login">Log in.</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(enhancer(GuestLayout(Register)));
