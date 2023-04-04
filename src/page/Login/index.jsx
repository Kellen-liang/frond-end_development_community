import React, { useState, useRef } from "react";
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'

function Login() {
  const location = useLocation()
  const loginError = useRef('')
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [formData, setFormData] = useState({username:'', password:'', email:''});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    //情况错误信息
    loginError.current = ''
   for(let key in formData) {
    switch (key) {
      case 'username': formData[key]?.length < 3 && (loginError.current = '用户名称不能小于3个字符\n')
        break;
      case 'password': formData[key]?.length < 8 && (loginError.current += '用户密码不能小于8个字符\n')
        break;
      case 'email': !formData[key].includes('@') && (loginError.current += '请正确填写邮箱地址')
        break;
      default:
        break;
    }
   }

   console.log(loginError.current);
  };

 

  const validate = () => {
    let isValid = true;
    if (username.length < 3) {
      setUsernameError('用户名称不能小于3个字符');
      isValid = false;
    } else {
      setUsernameError('');
    }
    if (password.length < 8) {
      setPasswordError('用户密码不能小于8个字符');
      isValid = false;
    } else {
      setPasswordError('');
    }
    if (!email.includes('@')) {
      setEmailError('请正确填写邮箱地址');
      isValid = false;
    } else {
      setEmailError('');
    }
    return isValid;
  }

  // location.pathname !== '/login' && location.pathname !== '/register'


  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label key='username'>
          <span>用户名称:</span>
          <input type="text" name='username' onChange={handleChange} />
        </label>
        <label>
          <span>用户密码:</span>
          <input type="password" name='password' onChange={handleChange} />
        </label>
        <label>
          <span>用户邮箱:</span>
          <input type="text" name='email' onChange={handleChange} />
        </label>
        <button type="submit" className={styles.formSubmit}>注册</button>
      </form>
      <div>{loginError.current}</div>
    </div>
  );
}

export default Login