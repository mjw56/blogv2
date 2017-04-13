import Component from "inferno-component";
import createElement from "inferno-create-element";

// Route handles Component delegation
export class Route extends Component<any, any> {
  constructor(props, context?: any) {
    super(props, context);
  }

  render() {
    const { component, render } = this.props;

    const match = this.props.path === this.context.store.getState().route;

    if (!match) return null;

    if (component) {
      return createElement(this.props.component, {}, null);
    }

    if (render) {
      return render({ match });
    }

    return null;
  }
}
