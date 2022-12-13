const userReducer = (state = {}, action) => {
  switch (action.type) {
      case "FETCH_USER":
          return {...state, user: action.payload, loggedIn:true};
      case "LOGIN_USER":
          return {...state, user:action.payload, loggedIn:true};
      //case "REGISTER_USER":
        //  return state
      case "LOGOUT_USER":
          return {...state, user:{}, loggedIn:false};
      default:
          return state;
  }

};

export default userReducer;