const uiReducer = (state = {}, action) => {

  switch (action.type) {

    case "REDIRECT":

      return { 
        ...state,
        selectedId: action.payload 
      };

    default:

      return state;

  }

};


export default uiReducer;