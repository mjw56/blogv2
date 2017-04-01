// store to hold global UI state
export function createStore(initialState = {}, render): { getState: Function, updateState: Function } {
  let state = initialState;

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

  return {
    getState,
    updateState
  };
}
