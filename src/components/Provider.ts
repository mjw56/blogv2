import Component from 'inferno-component';

// Provider passes context to children
export class Provider extends Component<{ api: any, store: any, router: any }, any> {
	api: any;
	store: any;
	router: any;

	constructor(props, context?: any) {
		super(props, context);
		this.api = props.api;
		this.store = props.store;
		this.router = props.router;
	}

	getChildContext() {
		return { 
			api: this.api,
			store: this.store,
			router: this.router
		};
	}

	render() {
		return this.props.children;
	}
}