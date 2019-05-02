import React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";

const CREATE_ALBUM_MUTATION = gql`
  mutation createAlbumMutation($name: String!, $images: [InputImage]!) {
    createAlbum(name: $name, images: $images) {
      id
      name
      images {
        id
        imageLink
      }
    }
  }
`;

const enhancer = withFormik({
  mapPropsToValues: ({ name, images }) => ({
    name: name || "",
    images: images || []
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    images: yup.array()
  }),
  enableReinitialize: true,
  handleSubmit: async (values, { props: { client }, setErrors }) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_ALBUM_MUTATION,
        variables: { name: values.name, images: values.images }
      });
      console.log(response);
      navigate("/", { replace: true });
    } catch (e) {
      setErrors({ message: e.message });
    }
  }
});

const FloatingAlbumForm = props => {
  const alert = props.errors.message ? (
    <div className="notification is-danger">{props.errors.message}</div>
  ) : null;
  return (
    <div className="floating-album-form">
      {alert}
      <div className="box">
        <form>
          <BaseInput
            name="name"
            type="text"
            value={props.values.name}
            onChange={props.handleChange("name")}
            label="Album Name"
            errorText={props.touched.name ? props.errors.name : ""}
            placeholder="Album Name"
            onBlur={props.handleBlur("name")}
          />
          <BaseButton
            type="primary"
            text="Add album"
            onClick={props.handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default withApollo(enhancer(FloatingAlbumForm));
