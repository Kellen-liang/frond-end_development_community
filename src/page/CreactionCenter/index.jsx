import React from "react";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";

import MEDitor from '@uiw/react-md-editor';
const Index = (props) => {

 

  const [markdown, setMarkdown] = useState('');
  useEffect(()=> {
    fetch('/src/assets/md/js基础知识.md')
    .then(response => response.text())
    .then(text => {
      console.log(text);
      setMarkdown(text)
    })
  },[])

  
  const demo = (value) => {
    console.log('value', value);
    setMarkdown(value)
  }
  return (
    <header className={styles.demo}>
      <MEDitor    // 编辑器
          value={markdown}
          onChange={demo}
          // width={1200} // 编辑器宽度
          height={'100%'} // 编辑器高度
        />
        
    </header>
  )
}

export default Index