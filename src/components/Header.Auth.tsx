import createElement from "inferno-create-element";
import { linkEvent } from "inferno";
import { Avatar } from "./Avatar";
import { AppService } from "../services/App";

// follow 
function goTo({ store, route }) {
  store.updateState({ route });
}

// Auth Header
export const HeaderAuth = ({ avatar, className }, { api, store }) => {
  const { appInit, hasBaseRepo } = store.getState();
  return (
    <div>
      <div className="menu-wrapper">
        <Avatar avatar={avatar} />
        <ul className="sub-menu">
          {appInit && hasBaseRepo
            ? <li onClick={linkEvent({ store, route: 'post' }, goTo)}>New Post</li>
            : null}
          <li onClick={linkEvent({ store, route: 'settings' }, goTo)}>Settings</li>
          <li onClick={linkEvent({ store, route: 'deploy' }, goTo)}>Deploy</li>
          <li onClick={linkEvent({ store }, AppService.logout)}>Logout</li>
        </ul>
      </div>
    </div>
  );
};
