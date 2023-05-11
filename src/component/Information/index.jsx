import React from "react";
import styles from "./index.module.scss"
import Weather from "../Weather";
import { useState, useEffect } from "react";
import { resource } from "@/utils/common";

function Information({ width, style }) {
  useEffect(()=> {
    
  })
 
  return (
    <div className={styles.information} style={{width, ...style}}>
      <h1 className={styles.informationHeadline}>
        <span>资讯</span>
        <img src={resource('/img/INFORMATION.png')} alt="" />
      </h1>
      <Weather 
        width={'100%'} 
        style={{marginTop : 20}}
      />
      <ul className={styles.informationList}>
        <li className={styles.informationListItem}><a href="https://github.com/Kellen-liang/frond-end_development_community" target="_blank"><img src={resource('/img/github.png')} alt=""/></a><div className={`${styles.informationListItemTag} ${styles.darkTag}`}>github</div></li>
        <li className={styles.informationListItem}><a href="https://juejin.cn/user/1007587030991165" target="_blank"><img src={resource('/img/掘金.jpg')} alt=""/></a><div className={styles.informationListItemTag}>稀土掘金</div></li>
      </ul> 
    </div>
  )
}

export default Information;