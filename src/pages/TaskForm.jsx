import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask, viewTask } from "../features/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { taskList } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(viewTask());
    if (id) {
      const task = taskList.find((t) => t.id === Number(id));
      reset(task);
    }
  }, [id, dispatch]);

  const onSubmit = (data) => {
    if (id) dispatch(updateTask({ ...data, id: Number(id) }));
    else dispatch(createTask(data));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-lg-6 mx-auto p-4 shadow mt-5">
      <h3 className="text-center">{id ? "Update Task" : "Add Task"}</h3>
      <input {...register("task_title")} className="form-control mt-3" placeholder="Task Title" />
      <input {...register("task_category")} className="form-control mt-3" placeholder="Category" />
      <button className="btn btn-dark mt-4 w-100">{id ? "Update" : "Add"}</button>
    </form>
  );
};

export default TaskForm;
