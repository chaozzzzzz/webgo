import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Input, Typography, Button } from "antd";
import FileBase64 from "react-file-base64";
import styles from './styles';
import { getStories,createStory, updateStory } from '../../actions/stories';
import { Layout } from "antd";
import Menu from '../Menu';
import { Navigate, useLocation } from 'react-router-dom';
import { configConsumerProps } from 'antd/lib/config-provider';
import { getUser } from '../../actions/user';
import { redirect } from '../../actions/ui';
import moment from 'moment'

const { Sider, Content } = Layout;
const { Title } = Typography;

function StoryForm () {
  const storyId = useSelector(state => state.ui);
  console.log(storyId)
  const [selectedId, setSelectedId] = useState(Object.values(storyId).length === 0 ? null : storyId.selectedId);
  const user = useSelector(state => state.user);
  const stories = useSelector((state) => selectedId ? state.stories : [] )
  console.log(stories)
  const story = stories? Object.values(stories).filter(story => story._id === selectedId):null

  const dispatch = useDispatch();
  //const story = useSelector((state) => selectedId ? state.stories.filter(story => story._id === selectedId) : null);
  const [nav, setNav] = useState(false)
  //const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onSubmit = (formValues) => {
    formValues.username = user.user.username
    formValues.postDate = moment(new Date())
    selectedId ?
    dispatch(updateStory(selectedId, formValues))
    : dispatch(createStory(formValues));
    reset();
  };
  
  useEffect(() => {
    dispatch(getStories())
    dispatch(getUser())
  }, [dispatch]);

  const reset = () => {
    form.resetFields();
    setSelectedId(null);
    dispatch(redirect(null))
    setNav(true)
  }

  if (nav) {
    return <Navigate to={'/'} ></Navigate>
  }

  return (
    <Layout>
    <Sider>
    <Menu user={user}/>
    </Sider>
    <Content>
    <Card
      style={styles.formCard}
      title={
        <Title level={4} style={styles.formTitle}>
          {selectedId ? "Editing" : "Share" } a story
        </Title>
      }
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        size="middle"
        onFinish={onSubmit}
      >
        
        <Form.Item name="caption" label="Caption" rules={[{ required: true }]} >
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }} 
          />
        </Form.Item>
        <Form.Item name="tags" label="Tags" rules={[{ required: true }]}>
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }}  />
        </Form.Item>
        <Form.Item name="image" label="Image" rules={[{ required: true }]}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={(e) => {
              form.setFieldsValue({
                image: e.base64
              })
            }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6
          }}
        >
         <Button
          type="primary"
          block
          htmlType='submit'
         >
           Share
         </Button>
        </Form.Item>
        {!selectedId ? null :
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 6
            }}
          >
          <Button
            type="primary"
            block
            htmlType='button'
            danger
            onClick={reset}
          >
            Discard
          </Button>
          </Form.Item>
        }
      </Form>

    </Card>
    // </Content>

    // </Layout>
  )
}

export default StoryForm