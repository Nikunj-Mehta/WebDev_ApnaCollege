import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{id: "abc", task: "demo-task", isDone: false}],
};

export const todoSlice = createSlice({ // Slice is a bundle of reducers and actions and it is for todo.
  name: "todo",
  initialState,
  reducers: { // state, action
    addTodo: (state, action) => { // addTodo m bs task ayega jo action.payload se ayega baaki sb same he rhega.
      const newTodo = {
        id: nanoid(),
        task: action.payload,
        isDone: false,
      };
      state.todos.push(newTodo); // direct mutation - it is a benefit of redux over react.
    },
    deleteTodo: (state, action) => {
      // action.payload m id ayegi us todo ki usse hum filter out krnge
      state.todos = state.todos.filter((todo) => todo.id != action.payload)
    },
    markAsDone: (state, action) => {
      // action.payload m todo id ayegi jaha se hum todo ko access kr k uska isDone true set kr denge.
      state.todos = state.todos.map((todo) => {
        if(todo.id === action.payload) {
          todo.isDone = true;
        }
        return todo; // return unchanged todos
      });
    },
  },
});
export const {addTodo, deleteTodo, markAsDone} = todoSlice.actions; // action creaters are generated for each reducer functions
export default todoSlice.reducer;
