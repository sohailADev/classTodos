import React, { Component } from "react";
import TodoItem from "./TodoItem";
import "./TodoItem";
class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              title={todo.title}
              completed={todo.completed}
              key={todo.id}
              handleToggleComplete={event =>
                this.props.handleToggleComplete(event, todo.id)
              }
              handleDelete={event => this.props.handleDelete(event, todo.id)}
            />
          ))}
        </ul>
      </section>
    );
  }
}
export default TodoList;
