import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Virtual T</h1>
          <p>
           Se parte de esta grandiosa comunidad de desarrolladores.
          </p>
          <span>Ya tienes cuenta?</span>
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
        </div>
        <div className="right">
          <h1>Registro de usuario</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <button>Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
