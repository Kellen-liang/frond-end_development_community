import React, { useState } from "react";
import styles from './index.module.scss'

function Form(props) {
  const { fromItem = [], onSubmit , submitBtnText = 'Submit'} = props
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData)
  };


  const selectFormItem = (item) => {
    const {type, label, labelKey, placeholder, maxLength} = item
    switch (type) {
      case 'text': return (
        <label className={styles.formItem} key={labelKey}>
          <span>{label}</span>
            <input type="text" name={labelKey} placeholder={placeholder} maxLength={maxLength} onChange={handleChange} />
          <span className={styles.suffix}>{formData?.labelKey?.length || 0}/{maxLength}</span>
        </label>
      )
      case 'password': return (
        <label className={styles.formItem} key={labelKey}>
          <span>{label}</span>
            <input type="text" name={labelKey} placeholder={placeholder} maxLength={maxLength} onChange={handleChange} />
          <span className={styles.suffix}>{formData?.labelKey?.length || 0}/{maxLength}</span>
        </label>
      )
      case 'textarea': return (
        <label className={styles.formItem} key={labelKey}>
          <span>{label}</span>
          <textarea name={labelKey} placeholder={placeholder} rows={5} maxLength={maxLength} onChange={handleChange} />
          <span className={styles.textareaSuffix}>{formData?.labelKey?.length || 0}/{maxLength}</span>
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