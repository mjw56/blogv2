// store interface
interface Store {
  subscribe(Function): void;
  unsubscribe(Function): void;
  getState(): Object;
  updateState(Object): void;
}

// Store Service
// Holds all global state for application
export function createStore(initialState = {}): Store {
  // initial state passed in
  let state = initialState;
  // start with no subscribers
  let subscriptions = [];

  // register a subscription from a component
  const subscribe = (listener) => {
    subscriptions.push(listener);
  };

  // de-register a listening component
  const unsubscribe = (listener) => {
    subscriptions.splice(subscriptions.indexOf(listener), 1);
  };

  // get the current state
  const getState = function() {
    return state;
  };

  // updates the state and renders
  const updateState = function(newState) {
    state = Object.assign({}, state, newState);

    // can call subscribers here...
    subscriptions.forEach(s => s(state));
  };

  // return API
  return {
    subscribe,
    unsubscribe,
    getState,
    updateState,
  };
}
