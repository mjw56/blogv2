import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { Avatar } from './Avatar';
import { AppService } from '../services/App';

// Auth Header
export const HeaderAuth = ({ avatar }, { store }) => (
  <div className="menu-wrapper">
    <Avatar avatar={avatar} />
    <ul className="sub-menu">
      <li onClick={linkEvent(store, AppService.logout)}>Logout</li>
    </ul>
  </div>
);