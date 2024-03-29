import classes from "./MainSecCompTwo.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentClassActions } from "../../../features/currentClass";
import axios from "axios";
import AssignmentItem from "../../AssignmentItem/AssignmentItem";

const MainSecCompTwo = ({ socket }) => {
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const dispatch = useDispatch();

  // ESTE EFECTO ACTUALIZA LAS TAREAS
  useEffect(() => {
    axios
      .get(`/api/classes/${currentClass._id}`)
      .then((serverRes) => {
        dispatch(currentClassActions.setCurrentClass(serverRes.data));
      })
      .catch((err) => console.log(err));
    //
  }, [dispatch, JSON.stringify(currentClass)]);

  return (
    <article className={classes.article}>
      <p className={classes.p2}>Tareas:</p>
      <ul className={classes.ul}>
        {currentClass.assignments.map((item, index) => {
          return <AssignmentItem key={`Assignment_${index}`} item={item} />;
        })}
      </ul>
    </article>
  );
};

export default MainSecCompTwo;