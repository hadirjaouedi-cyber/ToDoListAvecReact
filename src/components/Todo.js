
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
//ICONS
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";


import { useTodos,useTodosDispach} from "../contexts/Todocontext";
import {useToast } from '../contexts/ToastContext';

//TEXTFIELD


const Todo = ({ todo, handleCheck, showDelete, showUpdate }) => {

  const {showHideToast}=useToast();

  const dispach= useTodosDispach();
  //EVENT HANDLERS
  function handleCheckClick() {
    dispach({type:"togglechecked",
      payload:todo
    })
    showHideToast("modified succeffuly ")
  }

  function handleUpdateClick() {

    showUpdate(todo);
  }

  function handleDeleteClick() {
    showDelete(todo);
  }
  //===EVENT HANDLERS ===

  return (
    <>
      <Card
        className="todo"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/*ACTION BUTTONS  */}
              {/*CHECK BUTTON */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 2px",
                }}
                onClick={() => {
                  handleCheckClick();
                }}
              >
                <CheckIcon />
              </IconButton>
              {/*===CHECK BUTTON=== */}
              {/*UPDATE BUTTON*/}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 2px",
                }}
                onClick={handleUpdateClick}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/*===UPDATE BUTTON=== */}
              {/*DELETE BUTTON */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 2px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/*===DELETE BUTTON ===*/}
              {/* ===ACTION BUTTONS  */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
