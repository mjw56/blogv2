import Component from 'inferno-component';

// Provider passes context to children
export class Provider extends Component<{ store: any, router: any }, any> {
	store: any;
	router: any;

	constructor(props, context?: any) {
		super(props, context);
		this.store = props.store;
		this.router = props.router;
	}

	getChildContext() {
		return { 
			store: this.store,
			router: this.router
		};
	}

	render() {
		return this.props.children;
	}
}