import * as api from "../api";
import {
  FETCH_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
} from "../constants/actionTypes";

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUser();
        dispatch({ type: FETCH_USER, payload: data });
    } catch (error) {
        console.log(error.message)
    }
};

export const loginUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.loginUser(user);
        dispatch({ type: LOGIN_USER, payload: data });
    } catch (error) {
        console.log(error.message)
    }
};

export const registerUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.registerUser(user);

        dispatch({ type: REGISTER_USER, payload: data });
    } catch (error) {
        console.log(error.message)
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await api.logoutUser();

        dispatch({ type: LOGOUT_USER, payload: null });
    } catch (error) {
        console.log(error.message)
    }
};
