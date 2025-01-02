'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TodoFormInputs, Todo } from '@/types/todo';

export default function TodoList() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const { register, handleSubmit, reset } = useForm<TodoFormInputs>();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const categories = [
    "Work",
    "Personal",
    "Shopping",
    "Health",
    "Education"
  ];

  const onSubmit = (data: TodoFormInputs) => {
    setTodos([...todos, { task: data.task, category: data.category }]);
    reset();
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("task", { required: true })}
            placeholder="Add new todo"
          />
          <select {...register("category", { required: true })} defaultValue="">
            <option value="" disabled>Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.task} - <span className="todo-category">{todo.category}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

