import React from "react";
import { useState } from "react";
import { Empty } from 'antd'
import styles from "./index.module.scss"
import UserCardList from "./UserCardList";
import ChatPopover from "./ChatPopover";

function Inbox(props) {

  const [userList, setUserList] = useState([
    {
      userId:'001',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      userName: 'Kellen',
      userMessage: '啊看世界杯的asdasd按asf属地卡'
    },
    {
      userId:'002',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      userName: 'Kellen',
      userMessage: '啊看世界杯的asdasd按asf属地卡'
    },
    {
      userId:'003',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      userName: 'Kellen',
      userMessage: '啊看世界杯的asdasd按asf属地卡'
    },
    {
      userId:'004',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      userName: 'Kellen',
      userMessage: '啊看世界杯的asdasd按asf属地卡'
    },
    {
      userId:'005',
      userIcon: '/src/assets/svg/带刀剑士.svg',
      userName: 'Kellen',
      userMessage: '啊看世界杯的asdasd按asf属地卡'
    },
  ])

  const onClick = (index, record) =>{
    console.log('index',index);
    console.log('record',record);
  }
  return (
    <div className={`${styles.inboxContainer} commonCard`}>
      <section className={styles.inboxLeft}>
        <div className={styles.inboxLeftTop}>
          <div className={styles.inboxSearch}>
            <input type="text" placeholder="搜索联系人"/><i className={styles.inboxSearchBtn}></i>
          </div>
        </div>
        <div className={`${styles.inboxLeftUserList} customScorllType`}>
          <UserCardList data={userList} onClick={onClick}/>
        </div>
      </section>
      <section className={styles.inboxRight}>
        <div className={`${styles.inboxChatContent} customScorllType`}>
          {/* <Empty className='empty' description={'人影都没一个'} image={'/src/assets/img/喵喵.jpg'} imageStyle={{width:200, height:240}}/> */}
          <ChatPopover></ChatPopover>
        </div>
        <textarea placeholder="输入消息，按Shift + Enter 发送" className={`${styles.inboxChatInput} customScorllType`}></textarea>
      </section>
    </div>
  )
}

export default Inbox;