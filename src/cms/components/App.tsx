import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';
import { Header } from './Header';
import Home from './Home';
import Form from './Form';
import { Api } from '../services/Api';
import { FormService } from '../services/Form';

// handle switch of panels on selection
function getPanel({ goHome, getPosts, store }) {
  const state = store.getState();

  const formService = FormService(store);

  if (state.panel === 'index') {
      return <Home posts={state.posts} />;
  }

  return (
      <Form 
          onComponentDidMount={formService.formMount} 
          onComponentWillUnmount={formService.formUnmount} 
          goHome={linkEvent(store, goHome)}
          getPosts={linkEvent(store, getPosts)}
          FormService={FormService}
      />
  );
}

// app entry point
export function App({ AppService }, { store }) {
    let landing;

    const { auth, posts, panel } = store.getState();

    if (auth) {
        landing = getPanel({
          getPosts: AppService.getPosts, 
          goHome: AppService.goHome, 
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