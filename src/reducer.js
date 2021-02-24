import todosList from "./todos.json";
import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  CLEAR_COMPLETED_TODOS
} from "./actions.js";

const intialState = {
  todos: todosList
};

const todosReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      //action is looks like {type:ADD_TODO, payload:newTodo}
      const newTodos = state.todos.slice();
      newTodos.push(action.payload);
      return { todos: newTodos };
    case TOGGLE_TODO: {
      const newTodos = state.todos.map(todo => {
        //find todo to modify
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return { todos: newTodos };
    }

    case DELETE_TODO: {
      const todoAfterDel = state.todos.filter(
        todo => todo.id !== action.payload
      );
      return { todos: todoAfterDel };
    }
    case CLEAR_COMPLETED_TODOS:
      const todoAfterDelAllCompleted = state.todos.filter(
        todo => todo.completed === false
      );
      return { todos: todoAfterDelAllCompleted };
    default:
      return state;
  }
};

export default todosReducer;
