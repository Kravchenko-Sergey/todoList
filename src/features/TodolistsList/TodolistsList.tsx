import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterValuesType, todolistsActions, todolistsThunks } from "features/TodolistsList/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/tasks.reducer";
import { TaskStatuses } from "api/todolists-api";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "hooks/useAppDispatch";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { selectTasks } from "features/TodolistsList/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/todolists.selectors";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(todolistsThunks.fetchTodolists());
  }, [dispatch]);

  const removeTask = useCallback(function (taskId: string, todolistId: string) {
    dispatch(tasksThunks.removeTask({ taskId, todolistId }));
  }, []);

  const addTask = useCallback(function (todolistId: string, title: string) {
    dispatch(tasksThunks.addTask({ todolistId, title }));
  }, []);

  const changeStatus = useCallback(
    function (taskId: string, status: TaskStatuses, todolistId: string) {
      dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }));
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    function (taskId: string, title: string, todolistId: string) {
      dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    function (filter: FilterValuesType, id: string) {
      dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    (id: string) => {
      dispatch(todolistsThunks.removeTodolist({ id }));
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      dispatch(todolistsThunks.changeTodolistTitle({ id, title }));
    },
    [dispatch],
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.addTodolist({ title }));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container style={{ display: "flex", gap: 20, justifyContent: "space-between" }}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id} style={{ width: "49.1%" }}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={tasks[tl.id]}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
