import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';

// User Avatar Image
export const Avatar = ({ avatar, className = '' }) => (
    <img className={`component_avatar ${className}`} src={avatar} />
);