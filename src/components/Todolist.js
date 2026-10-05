import * as React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState, useContext, useEffect, useMemo, useReducer } from "react";
import { ToastContext } from "../contexts/ToastContext";
import {useTodos,useTodosDispach} from "../contexts/Todocontext"
//components
import Todo from "./Todo";
//DIALOG
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export default function SimpleContainer() {

  const { showHideToast } = useContext(ToastContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodsType, setDisplayedTodsType] = useState("all");
  const [dialogTodo, setDialogTodo] = useState(null);

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const todos=useTodos();
  const dispach=useTodosDispach();
  console.log("todos =", todos, "| isArray =", Array.isArray(todos));
  //FILTRED ARRAYS
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const noneCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);
  let toBeRenderdedTodos = todos;
  if (displayedTodsType == "completed") {
    toBeRenderdedTodos = completedTodos;
  } else if (displayedTodsType == "noneCompleted") {
    toBeRenderdedTodos = noneCompletedTodos;
  } else {
    toBeRenderdedTodos = todos;
  }

  useEffect(() => {
       dispach({type:"get"})
  }, []);
  function handleAddClick() {
    dispach({ type: "added", payload: { newTitle: titleInput } });
    setTitleInput("");
    showHideToast("added successfuly");
  }

  function changeDisplayedType(e) {
    setDisplayedTodsType(e.target.value);
  }
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }
  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispach({ type: "deleted", payload: dialogTodo });
    setShowDeleteDialog(false);
    showHideToast("deleted successfuly ");
  }
  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }
  function handleUpdateConfirm() {
    dispach({
      type: "updated",
      payload: {
        id: dialogTodo.id,
        title: dialogTodo.title,
        details: dialogTodo.details,
      },
    });
    setShowUpdateDialog(false);
    showHideToast("updated successfuly ");
  }
  const tododsjsx = toBeRenderdedTodos.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });
  return (
    <>
      {/* DELETE MODAL */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure You Want To Delete Mission ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You Are Not Able To Go Back !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus>Disagree</Button>
          <Button onClick={handleDeleteConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
      {/* ===DELETE MODAL=== */}
      {/* UPDATE MODAL */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Updating Mission  ?"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="title of mission"
            fullWidth
            variant="standard"
            value={dialogTodo?.title || ""}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Details of mission"
            fullWidth
            variant="standard"
            value={dialogTodo?.details || ""}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus>Disagree</Button>
          <Button onClick={handleUpdateConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
      {/* ===UPDATE MODAL=== */}
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              style={{ textAlign: "center" }}
              variant="h5"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              To Do
            </Typography>
            <Divider />
            {/* FILTER BUTTONS */}
            <ToggleButtonGroup
              onChange={changeDisplayedType}
              value={displayedTodsType}
              exclusive
              aria-label="text alignment"
            >
              <ToggleButton value="all">ALL</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="noneCompleted">Not Completed</ToggleButton>
            </ToggleButtonGroup>
            {/*=== FILTER BUTTONS */}
            {/*all TODOS*/}
            {tododsjsx}
            {/*== all TODOS*/}
            {/*INPUT+ADD BUTTONS */}
            <Grid container sx={{ marginTop: 2 }} spacing={2}>
              <Grid
                size={8}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="name of mission"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                size={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length == 0}
                >
                  add
                </Button>
              </Grid>
            </Grid>

            {/*===INPUT+ADD BUTTONS=== */}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
