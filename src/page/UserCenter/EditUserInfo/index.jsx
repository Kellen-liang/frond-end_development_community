import React, { useState, useRef, useEffect, useContext } from "react";
import styles from './index.module.scss'
import { Menu, message } from 'antd'
import { LeftOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'
import Form from "./Form";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo, updataUserInfo, updataUserPassword } from "@/utils/apis";
import { AuthContext } from "@/context/authContext";


function EditUserInfo(props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState({})
  //菜单列表
  const menu = useRef([
    {
      key: 'userInfo',
      icon: <UserOutlined />,
      label: '个人资料'
    },
    {
      key: 'changePassword',
      icon: <SettingOutlined />,
      label: '修改密码'
    },
  ])
  const [menuKey, setMenuKey] = useState('userInfo')
  //内容显示菜单
  const onClickMenu = ({ key }) => {
    if (key === menuKey) {
      return
    }
    setMenuKey(key)
  }

  useEffect(() => {
    getUserInfoById(id)
  },[])

  const getUserInfoById = async (id) => {
    const params = { id }
    const res = await getUserInfo(params)
    setUserInfo(res.data.data)
  }

  const userInfoFromItem = [
    {
      label: '用户名',
      labelKey: 'username',
      placeholder: '填写你的用户名',
      defaultValue: userInfo.username || '',
      maxLength: 10,
      type: 'text'
    },
    {
      label: '职位',
      labelKey: 'posts',
      placeholder: '填写你的职位',
      defaultValue: userInfo.posts || '',
      maxLength: 50,
      type: 'text'
    },
    {
      label: '公司',
      labelKey: 'company',
      placeholder: '填写你的公司',
      defaultValue: userInfo.company || '',
      maxLength: 50,
      type: 'text'
    },
    {
      label: '邮箱',
      labelKey: 'email',
      placeholder: '填写你的主页介绍',
      defaultValue: userInfo.email || '',
      maxLength: 20,
      type: 'text'
    },
    {
      label: '个人介绍',
      labelKey: 'introduction',
      placeholder: '填写你的个性签名',
      defaultValue: userInfo.introduction || '',
      maxLength: 100,
      type: 'textarea'
    },
  ]
  const userPasswordFromItem = [
    {
      label: '现密码',
      labelKey: 'current_password',
      placeholder: '输入你现在的密码',
      maxLength: 20,
      type: 'password'
    },
    {
      label: '新密码',
      labelKey: 'new_password',
      placeholder: '输入你的新密码',
      maxLength: 20,
      type: 'password'
    },
    {
      label: '再次输入',
      labelKey: 'new_password_second',
      placeholder: '再次输入新密码',
      maxLength: 20,
      type: 'password'
    },
    
  ]
  //个人资料提交事件
  const onHandleUserInfo = async (formData) => {
    console.log('----',formData);
    if (menuKey === 'userInfo') {
      const res = await updataUserInfo({...formData, id})
      if(res.data?.status === 0) {
        message.error(res.data.errmsg || '修改失败，服务器请求错误')
      }
      else {
        message.success('修改成功')
        getUserInfoById(id)
      }
    } 
    else {
      if (formData.new_password !== formData.new_password_second) return message.error('两次输入的密码不一致')
      if (formData.new_password.length < 8) return message.error('新密码必须大于或等于8位')
      const params = {
        id,
        current_password: formData.current_password,
        new_password: formData.new_password
      }
      const res = await updataUserPassword(params)
      if(res.data?.status === 0) {
        message.error(res.data.errmsg || '修改失败，服务器请求错误')
      }
      else {
        await logout()
        message.success('修改成功，请重新登录')
        navigate('/login')
      }
    }
  }
  return (
    <div className={styles.editUserInfoContainer}>
      <div className={styles.header} onClick={() => navigate(-1)}><span><LeftOutlined /> 返回个人主页</span></div>
      <div className={styles.main}>
        <section className={styles.mainLift}>
          <Menu
            style={{ height: '100%' }}
            items={menu.current}
            defaultSelectedKeys={['userInfo']}
            onClick={onClickMenu}
          />
        </section>
        <section className={styles.mainRight}>
          <div className={styles.mainRightTitle}>{menuKey === 'userInfo' ? '个人资料' : '修改密码'}</div>
          <div className={styles.mainRightContent}>
            <Form
              fromItem={menuKey === 'userInfo' ? userInfoFromItem : userPasswordFromItem}
              submitBtnText='保存修改'
              onSubmit={onHandleUserInfo}
            />
            {/* <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.formItem}>
                <span>用户名</span>
                <input type="text" name="username" placeholder="填写你的用户名"  maxLength={10} onChange={handleChange} />
                <span className={styles.suffix}>{formData?.username?.length || 0}/10</span>
              </label>
              <label className={styles.formItem}>
                <span>职位</span>
                <input type="text" name="position" placeholder="填写你的职位" maxLength={50} onChange={handleChange} />
                <span className={styles.suffix}>{formData?.position?.length || 0}/50</span>
              </label >
              <label className={styles.formItem}>
                <span>公司</span>
                <input type="text" name="company" placeholder="填写你的公司" maxLength={50} onChange={handleChange} />
                <span className={styles.suffix}>{formData?.company?.length || 0}/50</span>
              </label>
              <label className={styles.formItem}>
                <span>主页介绍</span>
                <input name="main_page_introduction" placeholder="填写你的主页介绍" maxLength={100} onChange={handleChange} />
                <span className={styles.suffix}>{formData?.main_page_introduction?.length || 0}/100</span>
              </label>
              <label className={styles.formItem}>
                <span>个人介绍</span>
                <textarea  name="introduction" placeholder="填写你的个性签名" rows={5} maxLength={100} onChange={handleChange}/>
                <span className={styles.textareaSuffix}>{formData?.introduction?.length || 0}/100</span>
              </label>
              <label className={styles.formItem}>
                <button type="submit" className={styles.formBtn}>保存修改</button>
              </label>
            </form> */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default EditUserInfo;