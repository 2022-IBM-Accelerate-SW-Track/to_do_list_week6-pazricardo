import React from "react";
import "../component/todos.css";
import {  Card, Grid, ListItemButton, ListItemText, Checkbox } from "@mui/material";


const Todos = ({ todos, deleteTodo }) => {
  console.log(todos);
  const todoList = todos.length ? (
    todos.map((todo) => {
      let color = '#fffffff'
      if (new Date() > new Date(todo.due)){
        color = '#d9b60bf7'
      }
      return (
        <Grid key={todo.id} container spacing={2}>
          <Card data-testid={todo.content} style={{marginTop:10, background: color}}>
          
            <ListItemButton component="a" href="#simple-list">
              <Checkbox style={{paddingLeft:0}} color="primary" onClick={() => deleteTodo(todo.id)}/>
              <ListItemText primary={todo.content} secondary={todo.due}/>
            </ListItemButton>
          </Card>
        </Grid>
      );
    })
  ) : (
    <p>You have no todo's left </p>
  );

  return (
    <div className="todoCollection" style={{ padding: "10px" }}>
      {todoList}
    </div>
  );


};

export default Todos;
