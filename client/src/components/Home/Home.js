import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import StoryList from "../StoryList";
import StoryForm from "../StoryForm";
import { Layout } from "antd";
import styles from './styles';
import { getStories } from "../../actions/stories";
import Menu from "../Menu";
import { fetchUser } from "../../api";
import { getUser } from "../../actions/user";

const { Sider, Content } = Layout;

const Home = () => {
    const user = useSelector(state => state.user)
    const stories = useSelector(state => state.stories)
    const [selectedId, setSelectedId] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUser())
        dispatch(getStories())
    },[dispatch])
    // useEffect(() => {
    //     dispatch(getStories());
    // }, [dispatch]);
    console.log(user)
    //console.log(stories)
    return (
        // <div>
        //     { user?.loggedIn ? 
        //         <p> {user.user.username} </p> :
        //         <p> no </p> 
        //     } 
        // </div>
        
        <Layout>
            <Sider>
                <Menu user={user}/>
            </Sider>
            <Content style={styles.content}>
                <StoryList setSelectedId={setSelectedId} user={user}/>
            </Content>
        </Layout>
    )
}

export default Home;