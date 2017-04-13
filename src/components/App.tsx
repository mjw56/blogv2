import Component from "inferno-component";
import createElement from "inferno-create-element";
import { linkEvent } from "inferno";
import { Header } from "./Header";

// Main App Shell
export class App extends Component<any, any> {
  constructor() {
    super();
    this.handleStoreChange = this.handleStoreChange.bind(this);
  }

  componentDidMount() {
    this.context.store.subscribe(this.handleStoreChange);
  }

  componentWillUnmount() {
    this.context.store.unsubscribe(this.handleStoreChange);
  }

  handleStoreChange(newState) {
    this.forceUpdate();
  }

  render() {
    const { auth, route } = this.context.store.getState();
    return (
      <section id="container">
        <Header auth={auth} />
        <section class={`content ${route}`}>
          {this.props.children}
        </section>
      </section>
    );
  }
}
