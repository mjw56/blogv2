import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { Avatar } from './Avatar';

// Auth Header
export const HeaderAuth = ({ avatar }) => (
  <span>
    <Avatar avatar={avatar} />
  </span>
);