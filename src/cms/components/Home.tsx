import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import Posts from './Posts';
import { PostsService } from '../services/Posts';

// home panel
export function Home({ posts }, { store }) {
    return (
        <div className="col-lg-12" id="index">
            <span className="title">Welcome Home</span><br />
            <Posts posts={posts} editPost={linkEvent(store, PostsService.editPost)} />
        </div>
    );
}

export default Home;