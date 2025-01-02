'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LoginFormInputs } from '@/types/todo';

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    if (data.username === "admin" && data.password === "password") {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/todos');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

