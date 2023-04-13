import React from "react";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import MEDitor from '@uiw/react-md-editor';
import { UploadOutlined } from '@ant-design/icons';
import { Popover, Form, Select, Radio, Upload, Button, Input } from 'antd'
import { categoryTag } from "@/utils/common";

const Meditor = (props) => {


  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }


  const handleForm = (value) => {
    console.log(value);
  }
  const releaseInfoForm = () => (
    <div className={styles.form}>
      <div className={styles.formTitle}>发布文章</div>
      <Form
        onFinish={handleForm}
        style={{ marginTop: 20 }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
      >
        <Form.Item
          style={{ fontSize: 20 }}
          name="category"
          label="分类"
          rules={[{ required: true, message: '请填入分类！' }]}
        >
          <Radio.Group buttonStyle="solid">
            {categoryTag.map((item, index) => (
              <Radio.Button key={index} style={{ margin: '0 5px 5px 0', borderRadius: 0 }} value={item.value}>{item.label}</Radio.Button>
            ))}

          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="tag"
          label="添加标签"
          rules={[{ required: true, message: '请添加标签！', type: 'array' }]}
        >
          <Select mode="multiple" placeholder="请搜索添加标签">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="cover"
          label="上传封面"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="建议尺寸：1200 * 734"
        >
          <Upload
            listType="picture"
            accept="image/png, image/jpeg"
            action="http://localhost:3002/api/upload"
          >
            <Button icon={<UploadOutlined />}>点击上传图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="intro"
          label="编辑简介"
          rules={[
            {
              required: true,
              message: '请输入简介',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={100} rows={3} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 5,
          }}
        >
          <Button type="primary" htmlType="submit">
            保存提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )


  const [markdown, setMarkdown] = useState('');
  // useEffect(()=> {
  //   fetch('/src/assets/md/js基础知识.md')
  //   .then(response => response.text())
  //   .then(text => {
  //     console.log(text);
  //     setMarkdown(text)
  //   })
  // },[])


  const demo = (value) => {
    console.log('value', value);
    setMarkdown(value)
  }
  return (
    <div className={styles.meditorContainer}>
      <header>
        <input type="text" placeholder="输入文章标题" />
        <Popover
          trigger="click"
          placement="bottom"
          content={releaseInfoForm}
          arrow={false}
          destroyTooltipOnHide={true}
        >
          <div className={styles.releaseBtn}>发布</div>
        </Popover>

      </header>
      <main>
        <MEDitor    // 编辑器
          value={markdown}
          onChange={demo}
          // width={1200} // 编辑器宽度
          height={'100%'} // 编辑器高度
        />
      </main>
    </div>

  )
}

export default Meditor