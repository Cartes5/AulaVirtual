import classes from "./UserMainAside.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { currentUserActions } from "../../../features/currentUser";
import { isLoadingActions } from "../../../features/loading";
import { errorActions } from "../../../features/error";
import axios from "axios";
import ClassItem from "../ClassItem/ClassItem";
import React, { useState } from "react";

const UserMainAside = ({ socket }) => {
  const dispatch = useDispatch();
  const [className, setClassName] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);
  const user = useSelector((state) => state.CurrentUser.user);
  const role = useSelector((state) => state.WhatRole.role);
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  const addClassHandler = () => {
    if (className.length > 0) {
      dispatch(isLoadingActions.setIsLoading(true));
      axios
        .post("/api/teacher/newclass", {
          user,
          className,
          teacherId: user._id,
        })
        .then((serverRes) => {
          setClassName("");
          dispatch(isLoadingActions.setIsLoading(false));
          dispatch(currentUserActions.addNewClass(serverRes.data));
        })
        .catch((err) => {
          dispatch(errorActions.setIsError(true));
          dispatch(errorActions.setMsg("Error en el servidor, por favor intentelo de nuevo"));
        });
    } else {
      setInvalidForm(true);
    }
  };

  const enrollClassHandler = async () => {
    if (className.length > 0) {
      dispatch(isLoadingActions.setIsLoading(true));

      await axios
        .put("/api/student/newclass", {
          secretKey: className, //En este caso la clave es secreta
          user,
        })
        .then((serverRes) => {
          dispatch(isLoadingActions.setIsLoading(false));
          setClassName("");
          dispatch(currentUserActions.addNewClass(serverRes.data));
        })
        .catch((err) => {
          dispatch(errorActions.setIsError(true));
          err.response.status === 404
            ? dispatch(errorActions.setMsg("No se encontraron clases con esa id"))
            : dispatch(errorActions.setMsg("Error en el servidor, por favor intentelo de nuevo"));
        });
    } else {
      setInvalidForm(true);
    }
  };

  return (
    <aside className={classes.aside}>
      <ul className={classes.ul}>
        {user.classes.map((obj, index) => {
          return <ClassItem socket={socket} key={`CLASS_${index}`} obj={obj} />;
        })}
      </ul>
      <input
        className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        type="text"
        placeholder={role === "Mentor" ? "Nombre nueva clase" : "Clave clase"}
      />
      {invalidForm && <p>REQUERIDO</p>}
      <div className={classes.btnBox}>
        {role === "Mentor" ? (
          <Button clickMe={addClassHandler} innerTxt={"Añadir clase"} />
        ) : (
          <Button clickMe={enrollClassHandler} innerTxt={"Inscribir clase"} />
        )}
      </div>
    </aside>
  );
};

export default UserMainAside;