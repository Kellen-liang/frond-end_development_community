import React, { useState, useRef } from "react";
import styles from './index.module.scss'
import { Menu } from 'antd'
import { LeftOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'
import Form from "./Form";
import { useNavigate } from "react-router-dom";

function EditUserInfo(props) {

  const navigate = useNavigate()
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

  const userInfoFromItem = [
    {
      label: '用户名',
      labelKey: 'username',
      placeholder: '填写你的用户名',
      maxLength: 10,
      type: 'text'
    },
    {
      label: '职位',
      labelKey: 'position',
      placeholder: '填写你的职位',
      maxLength: 50,
      type: 'text'
    },
    {
      label: '公司',
      labelKey: 'company',
      placeholder: '填写你的公司',
      maxLength: 50,
      type: 'text'
    },
    {
      label: '主页介绍',
      labelKey: 'main_page_introduction',
      placeholder: '填写你的主页介绍',
      maxLength: 100,
      type: 'text'
    },
    {
      label: '个人介绍',
      labelKey: 'introduction',
      placeholder: '填写你的个性签名',
      maxLength: 100,
      type: 'textarea'
    },
  ]
  const userPasswordFromItem = [
    {
      label: '现密码',
      labelKey: 'nowPassword',
      placeholder: '输入你现在的密码',
      maxLength: 20,
      type: 'password'
    },
    {
      label: '新密码',
      labelKey: 'newPassword',
      placeholder: '输入你的新密码',
      maxLength: 20,
      type: 'password'
    },
    {
      label: '再次输入',
      labelKey: 'newPassword_second',
      placeholder: '再次输入新密码',
      maxLength: 20,
      type: 'password'
    },
    
  ]
  //个人资料提交事件
  const onHandleUserInfo = (formData) => {
    console.log('----',formData);
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