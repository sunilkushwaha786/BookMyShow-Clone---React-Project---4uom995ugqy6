export let initialData = {
    status : false,
    name : "sing up"}

export const reducer = (state,action) => {
  switch (action.type) {
    case "COMPLETE":
      return {
        ...state,
        status : true,
        name : action.data
      };
    default:
      return state;
  }
};
