import Component from "inferno-component";
import createElement from "inferno-create-element";
import { Route } from "./Route";
import { Login } from "./Login";

// Wrapper around Route for handling Authentication
export class AuthRoute extends Component<any, any> {
  constructor(props, context?: any) {
    super(props, context);
  }

  render() {
    const { component: Component } = this.props;

    return (
      <Route
        path={this.props.path}
        render={renderProps => {
          if (this.context.store.getState().auth && renderProps.match) {
            return <Component />;
          }

          return <Login />;
        }}
      />
    );
  }
}
