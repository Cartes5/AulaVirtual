import classes from "./Login.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Utilities/Button/Button";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { isLoggedInActions } from "../../features/isLoggedIn";
import { whatRoleActions } from "../../features/whatRole";
import { currentUserActions } from "../../features/currentUser";
import { isLoadingActions } from "../../features/loading";
import { errorActions } from "../../features/error";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  const closeModalHandler = (event) => {
    event.preventDefault();
    dispatch(toggleLogRegModalActions.setIsModal());
  };

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [invalidRole, setInvalidRole] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    role: "",
  });

  const inputChangeHandler = (event) => {
    setEmailInvalid(false);
    setPasswordInvalid(false);
    setInvalidRole(false);

    const { name, value } = event.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const logInHandler = async (event) => {
    event.preventDefault();

    dispatch(isLoadingActions.setIsLoading(true));

    let url;
    if (userInfo.role === "teacher") {
      url = "/api/login/teacher";
    } else if (userInfo.role === "student") {
      url = "/api/login/student";
    } else {
      setInvalidRole(true);
      dispatch(errorActions.setIsError(true));
      dispatch(errorActions.setMsg("Por favor, selecciona tu rol"));
    }

    if (
      userInfo.email.includes("@") &&
      userInfo.email.length > 7 &&
      userInfo.password.length >= 6 &&
      invalidRole === false
    ) {
      await axios
        .get(url, {
          params: { email: userInfo.email, password: userInfo.password },
        })
        .then((serverRes) => {
          dispatch(isLoadingActions.setIsLoading(false));
          dispatch(currentUserActions.setCurrentUser(serverRes.data[0]));
          dispatch(whatRoleActions.setRole(serverRes.data[0].role));
          dispatch(isLoggedInActions.setIsLoggedIn());
        })
        .catch((err) => {
          dispatch(errorActions.setIsError(true));

          if (err.response.status === 404) {
            dispatch(errorActions.setMsg("No esta registrado"));
          } else if (err.response.status === 401) {
            dispatch(errorActions.setMsg("Contraseña incorrecta"));
          } else {
            dispatch(errorActions.setMsg("Error del servidor, intentelo de nuevo"));
          }
        });
    } else {
      !userInfo.email.includes("@") && setEmailInvalid(true);
      userInfo.email.length <= 7 && setEmailInvalid(true);
      userInfo.password.length < 6 && setPasswordInvalid(true);
      userInfo.role === "" && setInvalidRole(true);
      dispatch(isLoadingActions.setIsLoading(false));
    }
  };

  return (
    <div className={classes.div}>
      <form className={classes.form}>
        <h2 className={dark ? `${classes.darkH2}` : `${classes.lightH2}`}>
          Logueate
        </h2>

        <input
          onChange={inputChangeHandler}
          value={userInfo.email}
          name="email"
          className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
          type="email"
          placeholder="Email"
        />
        {emailInvalid && <p className={classes.serverErr}>Ingrese un email valido</p>}

        <input
          onChange={inputChangeHandler}
          value={userInfo.password}
          name="password"
          className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
          type="password"
          placeholder="Password"
        />
        {passwordInvalid && (
          <p className={classes.serverErr}>
            La contraseña debe tener al menos 6 caracteres
          </p>
        )}

        <select
          className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
          onChange={inputChangeHandler}
          name="role"
          value={userInfo.role}
        >
          <option className={classes.option} value="">
            Seleccionar
          </option>
          <option className={classes.option} value="teacher">
            Profesor
          </option>
          <option className={classes.option} value="student">
            Estudiante
          </option>
        </select>
        {invalidRole && (
          <p className={classes.serverErr}>Por favor, selecciona una opcion</p>
        )}

        <div className={classes.btnBox}>
          <Button innerTxt={"Login"} clickMe={logInHandler} />
          <Button innerTxt={"Volver"} clickMe={closeModalHandler} />
        </div>
      </form>
    </div>
  );
};

export default Login;