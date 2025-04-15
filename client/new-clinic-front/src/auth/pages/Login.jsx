import { Link, useNavigate } from "react-router-dom";
import Button from "../../newClinic/components/shared/Button";
import Input from "../../newClinic/components/shared/Input";
import { useState, useContext } from "react";
import logo from "../../assets/logo.jpg"; // Ruta al logo
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const containerStyles = "flex flex-col items-center h-42";
  const textBoxStyles = "w-4/6 mt-4";
  const buttonStyles = "bg-blue-700 hover:bg-blue-900 text-white mt-6 mb-6 p-3 rounded";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Es necesario el email y contraseña");
      setErrorMessage("Es necesario el email y contraseña.");
      return;
    }

    const user = { email, password };

    try {
      const url = "/api/v1/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        login(email);
        navigate("/");
        setEmail("");
        setPassword("");
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Correo o contraseña incorrectos."
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Ocurrió un error durante el proceso. Intenta nuevamente.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-500">
      <div className="w-full max-w-[600px] p-8 shadow-2xl rounded-lg shadow-blue-900 bg-white">
        <div className="flex items-center">
          <Link to="../../newClinic/pages/AboutUs">
            <img
              src={logo}
              alt="Logo de New Clinic"
              className="hover:scale-105 transition-all w-3/4 max-w-[440px] mt-4 ml-16"
            />
          </Link>
        </div>

        <form onSubmit={onSubmit} className={containerStyles}>
          <Input
            text={email}
            nameRef="email"
            handleText={(e) => setEmail(e.target.value.toLowerCase())}
            placeHolder="Email"
            extraStyle={textBoxStyles}
          />
          <Input
            text={password}
            nameRef="password"
            handleText={(e) => setPassword(e.target.value)}
            type="password"
            placeHolder="Contraseña"
            extraStyle={textBoxStyles}
          />

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <Button type="submit" extraStyle={buttonStyles}>
            {"Iniciar sesión como colaborador"}
          </Button>

          <p>
            <Link
              to="../forgot-password"
              className="text-blue-200 hover:text-blue-400 ml-2 cursor-pointer"
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;