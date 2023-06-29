import { Link } from "react-router-dom";
import "./login.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

const {login} = useContext(AuthContext);

const handleLogin = () => {
  login();
};
 
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Virtual T</h1>
          <p>
         Bienvenido developer.
          </p>
          <span>No tienes cuenta?</span>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
        <div className="right">
          <h1>Iniciar Sesión</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
