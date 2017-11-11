const createReducer = (initialState, handlers) => {
  console.log('INITIAL STATE', initialState)
  return (state = initialState, action) => {
    return handlers.hasOwnProperty(action.type) ?
      handlers[action.type](state, action) :
      state;
  }
};

export default createReducer;
