import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import TodoList from "./components/TodoList";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  addTodo,
  toggleTodo,
  clearCompletedTodo,
  deleteTodo
} from "./actions.js";
class App extends Component {
  //this.state.todos - App component state
  //this.props.todos - redux state
  state = {
    todos: todosList
  };
  handleAddTodo = e => {
    if (e.key === "Enter") {
      this.props.addTodo(e.target.value);
      e.target.value = "";
    }
  };

  handleToggleComplete = (e, todoIdToToggle) => {
    this.props.toggleTodo(todoIdToToggle);
  };
  //delete funtion
  handleDelete = (e, id) => {
    this.props.deleteTodo(id);
  };
  handleClearAllCompleted = () => {
    this.props.clearCompletedTodo();
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleAddTodo}
            autoFocus
          />
        </header>
        <Route
          exact
          path="/"
          render={() => (
            <TodoList
              handleToggleComplete={this.handleToggleComplete}
              handleDelete={this.handleDelete}
              todos={this.props.todos}
            />
          )}
        />
        <Route
          exact
          path="/active"
          render={() => (
            <TodoList
              handleToggleComplete={this.handleToggleComplete}
              handleDelete={this.handleDelete}
              todos={this.props.todos.filter(todo => todo.completed === false)}
            />
          )}
        />
        <Route
          exact
          path="/completed"
          render={() => (
            <TodoList
              handleToggleComplete={this.handleToggleComplete}
              handleDelete={this.handleDelete}
              todos={this.props.todos.filter(todo => todo.completed === true)}
            />
          )}
        />

        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count">
            <strong>
              {this.state.todos.filter(todo => todo.completed === false).length}
            </strong>{" "}
            item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact to="/" activeClassName="selected">
                All
              </NavLink>
            </li>
            <li>
              <NavLink to="/active" activeClassName="selected">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed" activeClassName="selected">
                Completed
              </NavLink>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={this.handleClearAllCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
//asking connect to read certain values form the redux satate
// this.props.todos
//this is a regualr fucniotn
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};
//this is simply  object
//this. props. addTodo
const mapDispatchToProps = {
  addTodo,
  clearCompletedTodo,
  toggleTodo,
  deleteTodo
};
//const mapDispatchToProps = {}
//connect allows to get state values frome the redux state and make them props on  your compmpnents
//automatically cause your component to re re render when those state valuses change
//connect is doing this : store.subscribe(()=>{})
//connect allows you get action careator fucntions and make them props on your componnet
//cconnect automatically calls store.dispatch (addtodoactions)
export default connect(mapStateToProps, mapDispatchToProps)(App);
