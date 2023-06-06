const INITIAL_STATE = {
  userEmail: '',
  userRecipes: {
    inProgress: {},
    favorites: [],
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default user;
