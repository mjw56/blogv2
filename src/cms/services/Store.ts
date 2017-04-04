// Store Service
// Holds all global state for application
export function createStore(initialState = {}, render): { getState: Function, updateState: Function } {
  // initial state passed in
  let state = initialState;

  // get the current state
  const getState = function() {
    return state;
  }

  // updates the state and renders
  const updateState = function(newState) {
    state = Object.assign({}, state, newState);

    // re-render
    render({
      ...state
    });
  };

  // return API
  return {
    getState,
    updateState
  };
}
