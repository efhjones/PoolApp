const createReducer = (initialState, handlers) => (state = initialState, action) => (handlers[action.type] ?
  handlers[action.type](state, action) :
  state);

export default createReducer;
