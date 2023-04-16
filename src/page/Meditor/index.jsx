import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import MEDitor from '@uiw/react-md-editor';
import { UploadOutlined } from '@ant-design/icons';
import { Popover, Form, Select, Radio, Upload, Button, Input, message } from 'antd'
import { categoryTag, TAG } from "@/utils/common";
import { createNewArticle } from "@/utils/apis";


const Meditor = (props) => {
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')

  const navigate = useNavigate()
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }

  const handleForm = (formData) => {
    console.log('formData--',formData);
    if(formData.tag?.length > 3) return message.error('文章标签不能超过3个')
    const data = {
      ...formData,
      article_title: articleTitle,
      article_content: articleContent,
      article_cover: formData.article_cover ? formData?.article_cover[0].response.path : '',
      tag: formData.tag?.join()
    }
    
    console.log('data',data);
    sendCreateArticle(data)
  }

  const sendCreateArticle = async (data) => {
    const res = await createNewArticle(data)
    console.log(res);
    if(res.data.status) {
      message.success('创建成功')
      navigate('/home')
    } else
    {
      message.error(res.data.errmsg)
    }
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
            { TAG.map((item, index) => <Option key={index} value={item}>{item}</Option> )}
          </Select>
        </Form.Item>
        <Form.Item
          name="article_cover"
          label="上传封面"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="建议尺寸：1200 * 734"
        >
          <Upload
            listType="picture"
            accept="image/png, image/jpeg"
            maxCount={4}
            action="http://localhost:3002/api/upload"
          >
            <Button icon={<UploadOutlined />}>点击上传图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="article_intro"
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


  
  // useEffect(()=> {
  //   fetch('/src/assets/md/js基础知识.md')
  //   .then(response => response.text())
  //   .then(text => {
  //     console.log(text);
  //     setMarkdown(text)
  //   })
  // },[])


  const onChangeContent = (value) => {
    // console.log('value', value);
    setArticleContent(value)
  }
  return (
    <div className={styles.meditorContainer}>
      <header>
        <input type="text" placeholder="输入文章标题" onChange={(e) => setArticleTitle(e.target.value?.trim())}/>
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
          value={articleContent}
          onChange={onChangeContent}
          // width={1200} // 编辑器宽度
          height={'100%'} // 编辑器高度
        />
      </main>
    </div>

  )
}

export default Meditor