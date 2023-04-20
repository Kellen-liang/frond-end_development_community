import React from "react";
import axios from "axios";
import styles from "./index.module.scss"
import { weatherList } from "./weatherList";
import { useState, useEffect } from "react";

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
      const res = await axios.get('http://localhost:3002/api/weatherInfo')
      console.log('weatherInfo',res);
      setWeatherInfo(res?.data?.data)
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
        <span>{weatherInfo?.date || '2023-4-17'}</span>
        <span>{weatherInfo?.week || '星期一'}</span>
      </div>
      <ul className={styles.weatherInfo}>
        <li><img src="/src/assets/weather/天气属性/地址-on.svg" alt="" /><span>{weatherInfo?.city || '广州'}</span></li>
        <li><img src="/src/assets/weather/天气属性/温度计.svg" alt="" /><span>{weatherInfo?.tem || 29}</span></li>
        <li><img src={weatherList[weatherInfo?.wea_img || 'yun'] || weatherList['qing']} alt="" /><span>{weatherInfo?.wea || '多云'}</span></li>
        <li><img src="/src/assets/weather/天气属性/风向.svg" alt="" /><span>{weatherInfo?.win || '南风'}</span></li>
        <li><img src="/src/assets/weather/天气属性/湿度.svg" alt="" /><span>{weatherInfo?.humidity || '27%'}</span></li>
        <li><img src="/src/assets/weather/天气属性/大气.svg" alt="" /><span>{weatherInfo?.pressure || '987'}</span></li>
      </ul>
    </div>
  )
}

export default Weather;