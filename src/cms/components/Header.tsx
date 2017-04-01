import createElement from 'inferno-create-element';

export const Header = ({ auth, goNewPost }) => (
    <header className="header black-bg">
        <a href="index.html" className="circle"></a>

        { auth
            ? (
                <a className="ghost-btn orange" onClick={goNewPost}>
                    <span>+ New Post</span>
                </a>
            )
            : null
        }
    </header>
);