import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { Posts } from './Posts';

// handle click to fork repo
function forkRepo() {
    const { context, setState } = this.data;

    context.api.forkRepo({ owner: 'galaksi', repo: 'fuusio' })
        .then(res => {
            setState.call(this.data, { hasBaseRepo: true });
        })
        .catch(err => console.log('error: forking base repo', err));
}

// handle click of create new post
function createPost({ context }) {
    context.store.updateState({ route: 'post' });
}

// Home Screen with Auth
export class Home extends Component<any, any> {
	constructor(props, context?: any) {
		super(props, context);
	}

    componentDidMount() {
      // when home mounts we need to fetch user deets
      // also, need to check for existence of the base repo
      // if it is there, set hasBaseRepo to true, otherwise
      // will display button for user to set it all up which
      // will create the fork and allow user to start creating posts!
      this.context.api.getRepo('fuusio')
        .then(res => {
                this.context.store.updateState({
                    appInit: true,
                    hasBaseRepo: (res && res.message !== 'Not Found') ? true : false,
                });
        });
    }

	render() {
        const { appInit, hasBaseRepo } = this.context.store.getState();
        return (
            <div className="col-lg-12" id="index">
                {
                    appInit ? 
                        !hasBaseRepo
                            ? (
                                <div>
                                    <span className="title">Welcome Home</span><br /><br />
                                    First things first! We'll need to fork the base blog repo over to your account.<br />
                                    From there, all new posts you create will live under this newly forked repo.
                                    <br /><br />
                                    <a className="ghost-btn purple" onClick={linkEvent(this, forkRepo)}>
                                        <span>Let's Go! Create the Blog Repo! <i className="fa fa-github"></i></span>
                                    </a>
                                </div>
                            )
                            : <Posts />
                    : null
                }

            </div>
        );
	}
}