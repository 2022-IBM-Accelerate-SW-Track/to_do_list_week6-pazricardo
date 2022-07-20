import React, { Component } from "react";
import Todos from "../component/todos";
import AddTodo from "../component/AddTodo";
import "../pages/Home.css";
import Axios from "axios";

class Home extends Component {

  state = {
    todos: [],
  };
    

  deleteTodo = (id) => {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: todos,
    });
  };

  addTodo = (todo) => { 
    const exists = this.state.todos.find(t => t.content === todo.content);
    if (exists || todo.content.trim() == null || todo.content.trim() === '' || todo.due == null || todo.due === 'Invalid Date'){ return }
    todo.id = Math.random();

     // Send Task Item to database as a json object upon submission
     const jsonObject = {
      id: todo.id,
      task: todo.content,
      currentDate: todo.date,
      dueDate: todo.duedate
    };

    Axios({
      method: "POST",
      url: "http://localhost:8080/items",
      data: {jsonObject},
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
        console.log(res.data.message);
    });

    // Create a array that contains the current array and the new todo item
    let new_list = [...this.state.todos, todo];
    // Update the local state with the new array.
    this.setState({
      todos: new_list,
    });
  };

  updateTodo = (id, newTodo) => {
    if (newTodo.content.trim() === null || newTodo.content.trim() === ''){ return }
    this.setState(prev => prev.map(item => (item.id === id ? newTodo : item)))
  }
   
  render() {  
    return (
      <div className="Home">
        <h1>Todo List </h1>
        
        <AddTodo addTodo={this.addTodo} />
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo} />
      </div>
    );
  }
}

export default Home;
