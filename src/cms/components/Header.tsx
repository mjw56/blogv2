import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';

// Generic App Header
// TODO: handle auth/no-auth
export const Header = ({ auth }, { router }) => (
    <header className="header black-bg">
        <a href="index.html" className="circle"></a>

        { auth
            ? (
                <a className="ghost-btn orange" onClick={linkEvent('new-post', router.go)}>
                    <span>+ New Post</span>
                </a>
            )
            : null
        }
    </header>
);