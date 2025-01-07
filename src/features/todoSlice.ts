import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 interface Todo { 
  id: number;
  name: string;
  description?: string;
  completed: boolean;
}  

interface TodoState {
  listTodos: Todo[];
}

const initialState: TodoState = {
  listTodos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.listTodos.push({
        ...action.payload,
        id: Date.now(),
      completed: false,});
    },
    deleteTodo: (state, action: PayloadAction<number>) => { 
      state.listTodos = state.listTodos.filter((todo) => todo.id !== action.payload);
    },   
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.listTodos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.listTodos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.listTodos[index] = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete, editTodo } = todoSlice.actions;
export default todoSlice.reducer;