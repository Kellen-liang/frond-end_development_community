import React, { useState, useRef } from "react";
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function Login() {
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate()
  
  const handFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (event, type) => {
    event.preventDefault();
    console.log(formData);

    const flag = validate(formData)
    console.log('flag---', flag);
    flag && sendData(formData)

  };


  const sendData = async (data) => {
    axios.defaults.withCredentials = true
    const res = await axios.post('http://localhost:3001/api/user/login', data)
    console.log(res);
    await axios.post('http://localhost:3001/api/user/get')
  }


  //表单校验
  const validate = (formData) => {
    let isValid = true;
    setFormError('')
    if (formData?.username?.length < 3) {
      setFormError((pre) => '用户名称不能小于3个字符\n')
      isValid = false;
    }
    if (formData?.password?.length < 8) {
      setFormError((pre) => pre + '用户密码不能小于8个字符\n')
      isValid = false;
    }
    return isValid;
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label key='username'>
          <span>用户名称:</span>
          <input type="text" name='username' onChange={handFormChange} />
        </label>
        <label>
          <span>用户密码:</span>
          <input type="password" name='password' onChange={handFormChange} />
        </label>
        <div className={styles.formFooter}>
          <button type="submit" className={styles.formSubmit}>登录</button>
          <span onClick={() => navigate('/register')}>切换注册</span>
        </div>
      </form>
      <div className={styles.errorInfo} style={{ display: formError ? 'block' : 'none' }}>{formError}</div>
    </div>
  );
}

export default Login