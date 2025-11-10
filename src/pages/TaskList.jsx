import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, viewTask } from "../features/taskSlice";
import { NavLink } from "react-router-dom";

const TaskList = () => {
  const { taskList } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewTask());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) dispatch(deleteTask(id));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {taskList.map((t) => (
          <div key={t.id} className="col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>{t.task_title}</h5>
                <p className="text-muted">{t.task_category}</p>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(t.id)}>Delete</button>
                <NavLink className="btn btn-warning" to={`/updateTask/${t.id}`}>Edit</NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
