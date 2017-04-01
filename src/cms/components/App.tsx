import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { Header } from './Header';
import Home from './Home';
import Form from './Form';
import { Api } from '../services/Api';
import { FormService } from '../services/Form';

// handle switch of panels on selection
function getPanel({ goHome, getPosts, panel, store }) {
  const state = store.getState();

  const formService = FormService(store);

  if (panel === 'index') {
      return <Home posts={state.posts} />;
  }

  return (
      <Form 
          type={panel} 
          onComponentDidMount={formService.formMount} 
          onComponentWillUnmount={formService.formUnmount} 
          goHome={linkEvent(store, goHome)} 
          changeEventHandler={formService.changeEventHandler}
          previewFile={formService.previewFile}
          deletePost={linkEvent({ store, getPosts, goHome }, formService.deletePost)}
      />
  );
}

// app entry point
export function App({ AppService, auth, posts, panel }, { store }) {
    let landing;

    if (auth) {
        landing = getPanel({
          getPosts: AppService.getPosts, 
          goHome: AppService.goHome, 
          panel, 
          store 
        });
    } else {
        landing = (<button onClick={linkEvent({ Api, store}, AppService.login)}>Login with GitHub</button>);
    }

    return (
        <section id="container">
            <Header auth={auth} goNewPost={linkEvent(store, AppService.goNewPost)} />
            <section class={`${panel}-content`}>
                <section className="wrapper">
                    <div className="row">
                        { landing }
                    </div>
                </section>
            </section>
        </section>
    );
}