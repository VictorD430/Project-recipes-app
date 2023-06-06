const INITIAL_STATE = {
  userEmail: '',
  userRecipes: {
    inProgress: {},
    favorites: [],
  },
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  default:
    return state;
  }
};

export default user;
