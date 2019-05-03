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
      userId
      images {
        id
        imageLink
      }
    }
  }
`;

const ALBUMS_QUERY = gql`
  {
    albums {
      id
      name
      userId
      images {
        id
        unsplashId
        imageLink
      }
      user {
        name
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
      await client.mutate({
        mutation: CREATE_ALBUM_MUTATION,
        variables: { name: values.name, images: values.images },
        update: (proxy, { data: { createAlbum } }) => {
          try {
            const data = proxy.readQuery({ query: ALBUMS_QUERY });
            data.albums.push(createAlbum);
            proxy.writeQuery({ query: ALBUMS_QUERY, data });
          } catch (error) {
            console.error(error);
          }
        }
      });
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
