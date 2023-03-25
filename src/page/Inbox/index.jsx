import React from "react";
import { useState, useRef } from "react";
import { Empty } from 'antd'
import { cloneDeep } from "lodash"; 
import styles from "./index.module.scss"
import UserCardList from "./UserCardList";
import ChatPopover from "./ChatPopover";

function Inbox(props) {

  const [chatInputContent, setChatInputContent] = useState('')
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

  const [chatInfoLIst, setchatInfoLIst] = useState([
    {username: 'Kellen', userIcon: '/src/assets/svg/带刀剑士.svg', chatCentent: '你好呀', addtime: '2023-3-25', isMine: true},
    {username: 'CoCo', userIcon: '/src/assets/svg/带刀剑士.svg', chatCentent: '你好呀', addtime: '2023-3-25', isMine: false}
  ])
  
  const onClick = (index, record) =>{
    console.log('index',index);
    console.log('record',record);
  }
  const onClickGetName = (value, record) => {
    console.log(value);
    console.log(record);
  }
  const handleKeyDown = (e) => {

    //触发Shift + Enter事件
    if (e.shiftKey && e.keyCode === 13) {
      e.preventDefault(); //取消事件的默认动作*换行
      const value = e.target.value
      if (!value.length) return
      const templist = cloneDeep(chatInfoLIst)
      templist.push(
        {username: 'Kellen', userIcon: '/src/assets/svg/带刀剑士.svg', chatCentent: value, addtime: '2023-3-25', isMine: true},
      )
      setchatInfoLIst(templist)
      setChatInputContent('')
    }
  }
  return (
    <div className={`${styles.inboxContainer}`}>
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
          { chatInfoLIst.length ? 
            chatInfoLIst.map((chat, index) => 
              <ChatPopover
                key={index}
                record={chat} 
                isMine={chat.isMine}
                userIcon={chat.userIcon}
                username={chat.username}
                chatContent={chat.chatCentent}
                addTime={chat.addtime}
                onClick={onClickGetName}
              />
          ) : (
            <Empty className='empty' description={'人影都没一个'} image={'/src/assets/img/喵喵.jpg'} imageStyle={{width:200, height:240}}/>
          )}
          
        </div>
        <textarea 
          placeholder="输入消息，按Shift + Enter 发送" 
          className={`${styles.inboxChatInput} customScorllType`}
          onKeyDown={handleKeyDown}
          value={chatInputContent}
          onChange={(e) => setChatInputContent(e.target.value)}
          ></textarea>
      </section>
    </div>
  )
}

export default Inbox;