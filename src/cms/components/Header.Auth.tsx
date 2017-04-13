import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { Avatar } from './Avatar';
import { AppService } from '../services/App';

// handle click of create new post
function createPost({ store }) {
    store.updateState({ route: 'post' });
}

// Auth Header
export const HeaderAuth = ({ avatar, className }, { api, store }) => {
  const { appInit, hasBaseRepo } = store.getState();
  return (
    <div>
      <div className="menu-wrapper">
        <Avatar avatar={avatar} />
        <ul className="sub-menu">
          { appInit && hasBaseRepo
            ? <li onClick={linkEvent({ store }, createPost)}>New Post</li>
            : null
          }
          <li onClick={linkEvent({ api, store }, AppService.logout)}>Logout</li>
        </ul>
      </div>
    </div>
  );
};