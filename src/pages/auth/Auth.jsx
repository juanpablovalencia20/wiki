import {  Navigate } from "react-router-dom";
import "./auth.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm } from "../../util/hooks";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LockIcon from "@mui/icons-material/Lock";
import Logo from "../../assets/logo.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';



function Auth(props) {
  const context = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const [redirectToHome, setRedirectToHome] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { onChange, onSubmit, values } = useForm(registerUser, {
    name: "",
    email: "",
    password: "",
  });
  
  const { onChange: onChangeLogin, onSubmit: onSubmitLogin, values: loginValues } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  function loginUserCallback() {
    loginUser();
  }

  const [loginUser, { loadingLogin }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      setRedirectToHome(true);
    },
    onError(err) {
      setErrors({ general: err.graphQLErrors[0].message });
    },
    variables: loginValues,
  });

  function registerUser() {
    addUser();
  }

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

 
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container-auth");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  const formatFirstLetterToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(event);
    if (name === "name") {
      const formattedValue = formatFirstLetterToUpperCase(value);
      onChange({ target: { name, value: formattedValue } });
    }
  };

  return (
    <div class="container-auth">
      <div class="forms-container-auth">
        <div class="signin-signup">
          <form 
            onSubmit={onSubmitLogin}
            noValidate
            className={loadingLogin ? "loadingLogin" : ""}
           class="sign-in-form">
            <h2 class="title">Iniciar Sesión</h2>
            <div class="input-field">
              <i> <EmailIcon /> </i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginValues.email}
                onChange={onChangeLogin}
              />
            </div>
            <div class="input-field">
            <i><LockIcon /></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                value={loginValues.password}
                onChange={onChangeLogin}
                className={showPassword ? "show-password" : ""}
              />
              <div class="icon-container" onClick={togglePasswordVisibility}>
                <i>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </i>
              </div>
            </div>
            <input type="submit" value="Iniciar Sesión" class="btn solid" />
            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i> <FacebookIcon/></i>
              </a>
              <a href="#" class="social-icon">
                <i> <GoogleIcon/></i>
              </a>
          
            </div>
          </form>

          <form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
            class="sign-up-form"
          >
            <h2 class="title">Registrarse</h2>
            <div class="input-field">
              <i> <PersonIcon /> </i>
              <input
                type="text"
                placeholder="Nombre"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div class="input-field">
              <i> <EmailIcon /> </i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={onChange}
              />
            </div>
            <div class="input-field">
            <i><LockIcon /></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                value={values.password}
                onChange={onChange}
                className={showPassword ? "show-password" : ""}
              />
              <div class="icon-container" onClick={togglePasswordVisibility}>
                <i>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </i>
              </div>
            </div>

            <input type="submit" class="btn" value="Registarse" />
            <p class="social-text">Or Sign up with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i> <FacebookIcon/></i>
              </a>
              <a href="#" class="social-icon">
                <i> <GoogleIcon/></i>
              </a>
          
            </div>  
          </form>
        </div>
      </div>

      <div class="panels-container-auth">
        <div class="panel left-panel">
          <div class="content">
            <h3>Eres nuevo aqui?</h3>
            <p>
              Registrate, se parte de la comunidad Virtual Technology.
              Soluciones Informáticas y Casa de Software!
            </p>
            <button class="btn transparent" id="sign-up-btn">
              Registrarse
            </button>
          </div>
          <img src={Logo} class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>Ya tienes cuenta?</h3>
            <p>
              Nos alegra verte de nuevo. Inicia sesión y sigue compartiendo tu
              pasión por el código con nosotros.
            </p>
            <button class="btn transparent" id="sign-in-btn">
              Iniciar Sesión
            </button>
          </div>
          <img src={Logo} class="image" alt="" />
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

const REGISTER_USER = gql`
  mutation register($email: String!, $password: String!, $name: String!) {
    register(
      registerUserInput: { email: $email, password: $password, name: $name }
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



export default Auth;
