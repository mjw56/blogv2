import Component from 'inferno-component';

export class Provider extends Component<any, any> {
	store: any;

	constructor(props, context?: any) {
		super(props, context);
		this.store = props.store;
	}

	getChildContext() {
		return { store: this.store };
	}

	render() {
		return this.props.children;
	}
}