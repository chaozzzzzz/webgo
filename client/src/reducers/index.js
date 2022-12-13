import { combineReducers } from "redux";

import stories from "./stories";
import user from "./user"
import ui from "./ui"

export default combineReducers({
    stories,
    user,
    ui
});