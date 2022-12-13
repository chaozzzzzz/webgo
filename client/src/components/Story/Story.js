import React, { useEffect, useState } from 'react';
import { Card, Tooltip, Typography, Image } from "antd";
import { EditOutlined, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import styles from './styles';
import { deleteStory, likeStory } from '../../actions/stories';
import { Navigate } from 'react-router-dom';
import { redirect } from '../../actions/ui';

const { Meta } = Card;
const { Link, Paragraph, Text } = Typography;

function Story({ story, setSelectedId, user }) {
  console.log(user)
  const dispatch = useDispatch();
  const selectedId = useSelector(state => state.ui);
  const [expand, setExpand] = useState(true);
  const [nav, setNav] = useState(false);

  if (nav) {
    return <Navigate to={{pathname:'/post',
    // state:{
    //   storyId: story._id}}
    }} />
  }
  return (
    <Card
      style={styles.card}
      cover={<Image src={story.image} />}
      actions={[
        <div style={styles.actions}>
          <Tooltip
            placement='top'
            title='Like'
            color='magenta'
            onClick={() => {  
                dispatch(likeStory(story._id))
            }}
          >
            <HeartTwoTone twoToneColor="magenta" />
            &nbsp; {story.likes} &nbsp;
          </Tooltip>
        </div>,
        <Tooltip
          placement='top'
          title='Edit'
        >
          <EditOutlined onClick={() => {
            if (user.user.username === story.username) {
            setSelectedId(story._id);
            setNav(true)
            setSelectedId = {setSelectedId}
            dispatch(redirect(story._id))
            }
            else
              console.log("can't eidt others' story")
          }} />
        </Tooltip>,
        <Tooltip
          placement='top'
          title='Delete'
          color='red'
        >
          <DeleteTwoTone twoToneColor="red" onClick={() => 
            {
              if (user.user.username === story.username)
               dispatch(deleteStory(story._id))
              else
                console.log("can't delete others' story")
               }} />
        </Tooltip>
      ]}
    >
      <Meta title={story.username} />
      <Paragraph
        style={{ margin: 0 }}
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: "more",
          onExpand: () => {
            setExpand(true);
          },
          onEllipsis: () => {
            setExpand(false);
          }
        }}
      >
        {story.caption}
      </Paragraph>
      {expand ?
        <Link href="#">{story.tags.split(" ").map((tag) => `#${tag} `)}</Link>
        : null }
        <br />
        <Text type="secondary">{moment(story.postDate).fromNow()}</Text>
    </Card>
  )
}

export default Story