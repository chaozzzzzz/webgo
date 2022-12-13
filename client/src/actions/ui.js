export const REDIRECT = "REDIRECT";


// action creators

export const redirect = id => {

  return { type: REDIRECT, payload: id };

};