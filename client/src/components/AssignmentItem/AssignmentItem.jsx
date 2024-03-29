import classes from "./AssignmentItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { currentClassActions } from "../../features/currentClass";
import { isLoadingActions } from "../../features/loading";
import { errorActions } from "../../features/error";
import axios from "axios";

const AssignmentItem = ({ item }) => {
  const dispatch = useDispatch();
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const dark = useSelector((state) => state.DarkMode.isDarkMode);
  const role = useSelector((state) => state.CurrentUser.user.role);

  const deleteAssignmentHandler = async () => {
    dispatch(isLoadingActions.setIsLoading(true));
    let itemToDel = item;
    await axios
      .delete("/api/teacher/assignments/delete", {
        data: { itemToDel, id: currentClass._id },
      })
      .then((serverRes) => {
        dispatch(currentClassActions.removeAssigment(item));
        dispatch(isLoadingActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(errorActions.setIsError(true));
        dispatch(errorActions.setMsg("Error del servidor, por favor intentelo de nuevo..."));
      });
  };

  return (
    <li className={dark ? `${classes.darkInput}` : `${classes.lightInput}`}>
      <p className={classes.listItemP}>{item}</p>
      {role === "Mentor" && (
        <span
          name={item}
          onClick={deleteAssignmentHandler}
          className={classes.span}
        >
          ✖️
        </span>
      )}
    </li>
  );
};

export default AssignmentItem;