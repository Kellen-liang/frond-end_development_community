import React, { useState } from "react";
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


function Register() {
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState({ username: '', password: '', second_password: '', email: '' });
  const navigate = useNavigate()

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const flag = validate(formData)
    console.log('registerFlag---', flag);
    flag && sendData(formData)
  };

  const sendData = async (data) => {
    const res = await axios.post('http://localhost:3002/api/user/register', data)
  }


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
    if (formData?.second_password !== formData?.password) {
      setFormError((pre) => pre + '两次输入的密码不相等\n')
      isValid = false;
    }
    if (!formData?.email?.includes('@')) {
      setFormError((pre) => pre + '请正确填写邮箱地址')
      isValid = false;
    }
    return isValid;
  }


  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <label>
          <span>用户名称:</span>
          <input type="text" name='username' onChange={handleFormChange} />
        </label>
        <label>
          <span>用户密码:</span>
          <input type="password" name='password' onChange={handleFormChange} />
        </label>
        <label>
          <span>再次输入密码:</span>
          <input type="password" name='second_password' onChange={handleFormChange} />
        </label>
        <label>
          <span>用户邮箱:</span>
          <input type="text" name='email' onChange={handleFormChange} />
        </label>
        <div className={styles.formFooter}>
          <button type="submit" className={styles.formSubmit}>注册</button>
          <span onClick={() => navigate('/login')}>切换登录</span>
        </div>
      </form>
      <div className={styles.errorInfo} style={{ display: formError ? 'block' : 'none' }}>{formError}</div>
    </div>
  );
}

export default Register