import axios from "axios";

const url = `${process.env.REACT_APP_API_BASE_URL}/stories`;

export const fetchStories = async () => axios.get(url);
//export const fetchOwnStories = async () => axios.get(`${url}/own`);
export const createStory = async (story) => axios.post(url, story);
export const updateStory = async (id, story) => axios.patch(`${url}/${id}`, story);
export const deleteStory = async (id) => axios.delete(`${url}/${id}`);
export const likeStory = async (id) => axios.patch(`${url}/${id}/likeStory`);