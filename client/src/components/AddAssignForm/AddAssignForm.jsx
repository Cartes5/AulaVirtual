import Button from "../Utilities/Button/Button";
import classes from "./AddAssignForm.module.css";
import { wrapperActions } from "../../features/wrapper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { errorActions } from "../../features/error";
import { isLoadingActions } from "../../features/loading";
import { useState } from "react";

const AddAssignForm = () => {
  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const [assign, setAssign] = useState("");
  const dark = useSelector((state) => state.DarkMode.isDarkMode);

  const closeFormHandler = (e) => {
    e.preventDefault();
    dispatch(wrapperActions.setInitial());
  };

  const addAssignment = async (e) => {
    e.preventDefault();
    if (assign.length > 0) {
      dispatch(isLoadingActions.setIsLoading(true));
      await axios
        .put("/api/teacher/assignments/new", {
          data: {
            assign,
            currentClass,
          },
        })
        .then((serverRes) => {
          dispatch(isLoadingActions.setIsLoading(false));
          dispatch(wrapperActions.setInitial());
        })
        .catch((err) => {
          dispatch(errorActions.setIsError(true));
          dispatch(errorActions.setMsg("Error del servidor, por favo intentelo de nuevo."));
        });
    }
  };

  return (
    <form onSubmit={addAssignment} className={classes.form}>
      <p className={classes.p}>
        AÑADIENDO TAREA A: {currentClass.className}
      </p>
      <input
        value={assign}
        onChange={(e) => setAssign(e.target.value)}
        className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}
        type="txt"
        placeholder="Nueva tarea"
      />
      <div className={classes.btnBox}>
        <input className={classes.submit} type="submit" />
        <Button innerTxt="Cancelar" clickMe={closeFormHandler} />
      </div>
    </form>
  );
};
export default AddAssignForm;
