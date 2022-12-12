import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import StoryList from "../StoryList";
import StoryForm from "../StoryForm";
import { Layout } from "antd";
import styles from './styles';
import { getStories } from "../../actions/stories";
import Menu from "../Menu";

const { Sider, Content } = Layout;

const Home = () => {
    const [selectedId, setSelectedId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStories());
    }, [dispatch]);

    return (
        <Layout>
            <Sider>
                <Menu/>
            </Sider>
            <Content style={styles.content}>
                <StoryList setSelectedId={setSelectedId} />
            </Content>
        </Layout>
    )
}

export default Home;