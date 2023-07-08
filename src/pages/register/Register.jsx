import { Link, Navigate } from "react-router-dom";
import "./register.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm } from "../../util/hooks";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register(props) {

  const context = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [redirectToHome, setRedirectToHome] = useState(false);
  const [errors, setErrors] = useState({}); 

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      setRedirectToHome(true);
    },
    onError(err) {
      setErrors({ general: err.graphQLErrors[0].message });
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Virtual T</h1>
          <p>Se parte de esta grandiosa comunidad de desarrolladores.</p>
          <span>Ya tienes cuenta?</span>
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
        </div>
        <div className="right">
          <h1>Registro de usuario</h1>
          <form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={onChange}
            />
            <input
              type="email"
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
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              value={values.name}
              onChange={onChange}
            />
            <button type="submit">Registrarse</button>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $name: String!
  ) {
    register(
      registerUserInput: {
        username: $username
        email: $email
        password: $password
        name: $name
      }
    ) {
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

export default Register;
