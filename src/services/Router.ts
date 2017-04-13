// Router Service
export function RouterService(store) {
  // change route
  function go(route) {
    store.updateState({ route });
  }

  return {
    go
  };
}
