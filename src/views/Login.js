import React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import GuestLayout from "../hoc/GuestLayout";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

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
  handleSubmit: (values: LoginValues) => {
    console.log("test", values);
  }
});

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

class Login extends React.Component<Props> {
  render() {
    return (
      <GuestLayout>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
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
                    this.props.touched.password
                      ? this.props.errors.password
                      : ""
                  }
                  onBlur={this.props.handleBlur("password")}
                />
                <BaseButton text="Login" onClick={this.props.handleSubmit} />
              </form>
            </div>
          </div>
        </div>
      </GuestLayout>
    );
  }
}

export default withApollo((enhancer(Login));
