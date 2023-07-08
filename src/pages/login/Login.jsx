import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm } from "../../util/hooks";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

function Login() {
  
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });
  const [redirectToHome, setRedirectToHome] = useState(false);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      setRedirectToHome(true);
    },
    onError(err) {
      setErrors({ general: err.graphQLErrors[0].message });
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Virtual T</h1>
          <p>Bienvenido developer.</p>
          <span>No tienes cuenta?</span>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
        <div className="right">
          <h1>Iniciar Sesión</h1>
          <form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={onChange}
            />
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                value={values.password}
                onChange={onChange}
                className={showPassword ? "show-password" : ""}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <button type="submit">Login</button>
          </form>
          {Object.keys(errors).length > 0 && (
            <div className="error-container">
              {Object.values(errors).map((error, index) => (
                <div key={index} className="error-item">
                  {error}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(loginUserInput: { email: $email, password: $password }) {
      access_token
      user {
        id
        name
        email
        cover_img
        profile_img
      }
    }
  }
`;

export default Login;
