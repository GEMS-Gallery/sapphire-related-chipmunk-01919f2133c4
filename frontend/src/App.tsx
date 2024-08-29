import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { backend } from 'declarations/backend';

type Todo = {
  id: bigint;
  text: string;
  completed: boolean;
  createdAt: bigint;
  completedAt: bigint | null;
};

type Inputs = {
  todoText: string;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await backend.getTodos();
      setTodos(fetchedTodos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await backend.addTodo(data.todoText);
      reset();
      await fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      setLoading(false);
    }
  };

  const handleComplete = async (id: bigint) => {
    try {
      setLoading(true);
      await backend.completeTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error('Error completing todo:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      setLoading(true);
      await backend.deleteTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">Cat Todo List</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <TextField
          {...register('todoText', { required: true })}
          label="New Todo"
          variant="outlined"
          fullWidth
          className="mb-2"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Todo
        </Button>
      </form>
      {loading ? (
        <CircularProgress className="mx-auto block" />
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem key={Number(todo.id)} dense>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleComplete(todo.id)}
                className="paw-checkbox mr-2"
              />
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default App;
