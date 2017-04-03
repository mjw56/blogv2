import createElement from 'inferno-create-element';
import { fileIsAnImage, getTokenFromString, timeDifference } from '../services/Misc';

// List of Posts in DB
export const Posts = ({ posts = [], editPost }) => (
    <div className="post-list">
        {
            posts.slice().reverse().map(post => (
                <div className="desc">
                  <div className="thumb left">
                      <span className="badge bg-theme"><i className="fa fa-clock-o"></i></span>
                      <muted>{timeDifference(Date.now(), post.timestamp)}</muted>
                  </div>
                  <div className="details">
                    <p>
                      <a>{post.deets.title}</a><br/>
                    </p>
                    <span className="badge bg-theme edit">
                        <i className="fa fa-edit" onClick={editPost} data-id={post.timestamp}></i>
                    </span>
                  </div>
                </div>
            ))
        }
    </div>
);

export default Posts;