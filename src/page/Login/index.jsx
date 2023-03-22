import React from "react";
import { useForm } from "react-hook-form";
import styles from './index.module.scss'

function Login() {
  // create a form instance
  const { register, handleSubmit, formState } = useForm();

  // handle form submission
  const onSubmit = (data) => {
    console.log(data);
    // do something with the data, such as sending it to an API
  };


  // get the errors object from form state
  const { errors } = formState;

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div className={`${styles.formDefault} `}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Email is required",
              minLength: {
                value: 5,
                message: '最少三个字符'
              }
            })}
          />
        </div>
        <div className={`${styles.formDefault} `}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {/* <div className={styles.popover} style={{display: errors.password ? 'block' : 'none', top: 100}}>{errors.password?.message}</div> */}
        </div>
        <button className={styles.formSubmit} type="submit">Login</button>
        <div className={styles.popover} style={{display: (errors.username || errors.password) ? 'block' : 'none'}}>{errors.username?.message }<br/>{errors.password?.message || null}</div>
      </form>
      
    </div>
  );
}

export default Login