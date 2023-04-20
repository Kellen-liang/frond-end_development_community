import React, { useState } from "react";
import styles from './index.module.scss'
import { useLayoutEffect } from "react";

function Form(props) {
  const { fromItem = [], onSubmit , submitBtnText = 'Submit'} = props

  const [formData, setFormData] = useState();

  useLayoutEffect(() => {
    const defaultValue = {}
    fromItem.forEach(item => {
      defaultValue[item.labelKey] = item.defaultValue || ''
    });
    setFormData(defaultValue)
  },[fromItem])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData)
  };

  const selectFormItem = (item) => {
    const {type, label, labelKey, placeholder, maxLength, defaultValue} = item
    switch (type) {
      case 'text': return (
        <label className={styles.formItem} key={labelKey}>
          <span>{label}</span>
          <input type="text" name={labelKey} defaultValue={defaultValue}  placeholder={placeholder} maxLength={maxLength} onChange={handleChange} />
          {/* <span className={styles.suffix}>{formData.labelKey|| 0}/{maxLength}</span> */}
        </label>
      )
      case 'password': return (
        <label className={styles.formItem} key={labelKey}>
          <span>{label}</span>
          <input type="password" name={labelKey}  maxLength={maxLength} onChange={handleChange} />
          {/* <span className={styles.suffix}>{formData?.labelKey?.length || 0}/{maxLength}</span> */}
        </label>
      )
      case 'textarea': return (
        <label className={styles.formItem} key={labelKey}>
          <span>{label}</span>
          <textarea name={labelKey} placeholder={placeholder} defaultValue={defaultValue} rows={5} maxLength={maxLength} onChange={handleChange} />
          {/* <span className={styles.textareaSuffix}>{formData?.labelKey?.length || 0}/{maxLength}</span> */}
        </label>
      )
      default: return
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      { fromItem.length && fromItem.map(item => selectFormItem(item))} 
      <label className={styles.formItem}>
        <button type="submit" className={styles.formBtn}>{submitBtnText}</button>
      </label>
    </form>
  )
}

export default Form;