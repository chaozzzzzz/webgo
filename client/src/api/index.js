import axios from "axios";

const url = `${process.env.REACT_APP_API_BASE_URL}`;

export const fetchStories = async () => axios.get(`${url}/stories`);
//export const fetchOwnStories = async () => axios.get(`${url}/own`);
export const createStory = async (story) => axios.post(`${url}/stories`, story);
export const updateStory = async (id, story) => axios.patch(`${url}/stories/${id}`, story);
export const deleteStory = async (id) => axios.delete(`${url}/stories/${id}`);
export const likeStory = async (id) => axios.patch(`${url}/stories/${id}/likeStory`);


export const fetchUser = async () => axios.get(`${url}/user`)
export const loginUser = async(user) => axios.post(`${url}/user/login`, user)
export const registerUser = async(user) => axios.post(`${url}/user/register`, user)
export const logoutUser = async() => axios.post(`${url}/user/logout`)