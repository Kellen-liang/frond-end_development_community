import React from "react";
import axios from "axios";
import styles from "./index.module.scss"
import { weatherList } from "./weatherList";
import { useState, useEffect } from "react";
import { resource } from "@/utils/common";

function Weather({width, style}) {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [weatherInfo, setWeatherInfo] = useState({})

  useEffect(()=>{
    getWeatherInfo()
    const timerID = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => {
      clearInterval(timerID)
    }
  },[])
  
  /**
   * @description 免费天气Api：http://www.tianqiapi.com/index/doc?version=day
   */
  const getWeatherInfo = async () => {
    try {
      const res = await axios.get('https://www.yiketianqi.com/free/day', {
        params: {
          appid: '62565573',
          appsecret: '6rCj71Gy',
          unescape: '1',
          vue: '1'
        }
        })
      console.log(res);
      setWeatherInfo(res?.data)
    } catch (error) {
      console.error(error);
    }
  }

  const pushWeatherDetail = () => {
    window.open("https://www.qweather.com/")
    // const a = document.createElement('a')
    // a.href = 'https://www.qweather.com/'
    // a.click()
  }

  return (
    <div className={styles.weather} style={{width, ...style}} onClick={pushWeatherDetail}>
      <div className={styles.time}><span>{time}</span></div>
      <div className={styles.date}>
        <span>{weatherInfo.date}</span>
        <span>{weatherInfo.week}</span>
      </div>
      <ul className={styles.weatherInfo}>
        <li><img src={resource('/weather/天气属性/地址-on.svg')} alt="" /><span>{weatherInfo.city}</span></li>
        <li><img src={resource('/weather/天气属性/温度计.svg')} alt="" /><span>{weatherInfo.tem}</span></li>
        <li><img src={weatherList[weatherInfo.wea_img] || weatherList['qing']} alt="" /><span>{weatherInfo.wea}</span></li>
        <li><img src={resource('/weather/天气属性/风向.svg')} alt="" /><span>{weatherInfo.win}</span></li>
        <li><img src={resource('/weather/天气属性/湿度.svg')} alt="" /><span>{weatherInfo.humidity}</span></li>
        <li><img src={resource('/weather/天气属性/大气.svg')} alt="" /><span>{weatherInfo.pressure}</span></li>
      </ul>
    </div>
  )
}

export default Weather;