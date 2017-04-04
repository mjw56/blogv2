import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { Posts } from './Posts';
import { AppService } from '../services/App';
import { PostsService } from '../services/Posts';

// Home Screen with Auth
export class Home extends Component<any, any> {
	constructor(props, context?: any) {
		super(props, context);
	}

    componentDidMount() {
      // when home mounts we need to fetch posts and the user deets
      // we should then call the store to update the state
      Promise.all([AppService.getPosts()])
        .then(res => {
            // update store!
            this.context.store.updateState({ posts: res[0] });
        });
    }

	render() {
        return (
            <div className="col-lg-12" id="index">
                <span className="title">Welcome Home</span><br />
                <Posts posts={this.context.store.getState().posts} editPost={linkEvent(this.context.store, PostsService.editPost)} />
            </div>
        );
	}
}