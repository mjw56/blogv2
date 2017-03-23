import Inferno from 'inferno';

// global state tree
let state = {
    posts: [],
    panel: 'index'
};

// mini setState function
function updateState(oldState, newState) {
    state = Object.assign({}, oldState, newState);
    return state;
}

// onComponentDidMount
function mounted() {
    getPosts();
}

function getPosts() {
    fetch('/get-posts')
        .then(res => res.json())
        .then(posts => {
            // after data success re-render
             render({
                state: updateState(state, { posts })
            });
        });
}

// handle the submission of the form
function submit(event) {
    // prevent the default browser form behavior, we'll handle it
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let route = '';
    let data = {};

    if (state.panel === 'new-post') {
        route = 'save-post';
        data = {
            'title': document.getElementById('title').value,
            'content': document.getElementById('content').value,
            'cover': document.getElementById('file-preview').src
        };
    } else {
        route = 'update-post';
        const _id = document.getElementById('post-form').attributes['data-id'].nodeValue;

        const post = state.posts.find(p => p._id === _id);

        data = {
            _id: post._id,
            deets: {
                'title': document.getElementById('title').value,
                'content': document.getElementById('content').value,
                'cover': document.getElementById('file-preview').src
            },
            timestamp: post.timestamp
        };
    }

    fetch(route, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res) {
            // fetch new list
            getPosts();

            // reset UI state
            document.getElementById('submit-btn').classList.remove('btn-theme');
            document.getElementById('submit-btn').classList.add('btn-success');

            setTimeout(function() {
                document.getElementById('submit-btn').classList.remove('btn-success');
                document.getElementById('submit-btn').classList.add('btn-theme');

                goHome();
            }, 5000);
        } else {
            console.log('SAVE FAILURE');
        }
    });
}

// this calls s3 to upload the file with the signed request
function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200) {
                document.getElementById('file-preview').src = url;
            }
            else{
                alert('Could not upload file.');
            }
        }
    };
    xhr.send(file);
}

// get signed s3 request from server
function signS3(file) {
    fetch(`/sign-s3?file-name=${file.name}&file-type=${file.type}`)
        .then(res => res.json())
        .then(res => {
            uploadFile(file, res.signedRequest, res.url);
        });
}

// this will populate the image preview dialog
// after user has selected a file to upload
function previewFile() {
    var preview = document.getElementById('file-preview');
    var file    = document.getElementById('file').files[0];
    var reader  = new FileReader();

    if (!file) {
        console.log('no file selected');
        return;
    }

    reader.addEventListener("load", function () {
        // load image into DOM
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);

        // get signature for upload to s3
        signS3(file);
    }
}

// helper for UI time display
function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < 30 * 1000) {
         return 'Just Now';   
    }

    else if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

// header
function Header() {
    return (
        <header className="header black-bg">
            <div className="sidebar-toggle-box">
                <div className="fa fa-bars tooltips"></div>
            </div>
            <a href="index.html" className="logo"><b>HOME</b></a>
            <div className="nav notify-row" id="top_menu">
                <ul className="nav top-menu">
                </ul>
            </div>
        </header>
    );
}

// take me home
function goHome() {
    render({
        state: updateState(state, { panel: 'index' })
    });
}

// handle selection of panel from sidebar
function selectPanel(panel) {
    render({ 
        state: updateState(state, { panel })
    });
}

// left sidebar
function LeftSidebar() {
    return (
        <aside>
            <div id="sidebar"  className="nav-collapse">
                <ul className="sidebar-menu" id="nav-accordion">
                
                    <p className="centered"><a><img src="assets/img/profile.jpg" className="img-circle" width="60" /></a></p>
                    <h5 className="centered">Mike Wilcox</h5>
                        
                    <li className="mt index" onClick={() => selectPanel('index')}>
                        <a className={ state.panel === 'index' ? 'active' : ''}>
                            <i className="fa fa-dashboard"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li className="mt new-post" onClick={() => selectPanel('new-post')}>
                        <a className={ state.panel === 'new-post' ? 'active' : ''}>
                            <i className="fa fa-dashboard"></i>
                            <span>New Post</span>
                        </a>
                    </li>

                </ul>
            </div>
        </aside>
    );
}

// right sidebar
function RightSidebar({ posts }) {
    return (
        <div className="col-lg-3 ds">
            <h3>POSTS</h3>

            <Posts posts={posts} /> 
            <h3>TEAM MEMBERS</h3>
            <div className="desc">
                <div className="thumb">
                    <img className="img-circle" src="assets/img/profile.jpg" width="35px" height="35px" align="" />
                </div>
                <div className="details">
                    <p><a href="#">MIKE WILCOX</a><br/>
                        <muted>Available</muted>
                    </p>
                </div>
            </div>          
        </div>
    );
}

function editPost(event) {
    // look up the post by grabbing id from the list element
    let post = state.posts.find(p => p.timestamp === parseInt(event.target.attributes['data-id'].nodeValue, 10));

    // check out route, switch if necessary
    if (state.panel !== 'edit-post') {
        selectPanel('edit-post');
    }

    document.getElementById('post-form').setAttribute('data-id', post._id);

    // populate the UI fields
    document.getElementById('title').value = post.deets.title;
    document.getElementById('content').value = post.deets.content;
    document.getElementById('file-preview').src = post.deets.cover;

    post = null;
}

// posts list
function Posts({ posts }) {
    return (
        <div className="post-list">
            {
                posts.slice().reverse().map(post => (
                    <div className="desc">
                      <div className="thumb left">
                          <span className="badge bg-theme"><i className="fa fa-clock-o"></i></span>
                      </div>
                      <div className="details">
                        <p><muted>{timeDifference(Date.now(), post.timestamp)}</muted><br/>
                          <a>{post.deets.title}</a><br/>
                        </p>
                      </div>
                      <div className="thumb right">
                          <span className="badge bg-theme">
                              <i className="fa fa-edit" onClick={editPost} data-id={post.timestamp}></i>
                        </span>
                      </div>
                    </div>
                ))
            }
        </div>
    );
}

// home panel
function HomePanel() {
    return (
        <div className="col-lg-9" id="index">
            <span className="title">Welcome Home!</span>  
        </div>
    );
}

// new post panel
function PostFormPanel({ type }) {
    return (
        <div className="col-lg-9" id="new-post">
            <div className="form-panel">
                <div className="form-header">
                    <h4 className="mb"><i className="fa fa-angle-right"></i> New Post</h4>
                    <h4 className="close" onClick={goHome}>X</h4>
                </div>
                <form onSubmit={submit} className="form-horizontal style-form" id="post-form" data-type={type}>
                    <div className="form-group">
                        <label className="col-sm-2 col-sm-2 control-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="title" id="title" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-sm-2 control-label">Content</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" name="content" id="content"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-sm-2 control-label">Cover Photo</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control" name="file" id="file" onChange={previewFile} />
                            <img src="" alt="Image preview..." id="file-preview" name="file-preview" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-theme" id="submit-btn">
                        { (type === 'new') ? `Submit` : `Edit`}
                    </button>
                </form>
            </div>
        </div>
    );
}

// handle switch of panels on selection
function getPanel(panel) {
    switch(panel) {
        case 'new-post':
            return <PostFormPanel type="new" />;
            break;
        case 'edit-post':
            return <PostFormPanel type="edit" />;
            break;
        default:
            return <HomePanel />;
            break;
    }
}

// app entry point
function App({ posts, panel }) {
    return (
        <section id="container">
            <Header />

            <LeftSidebar />

            <section id="main-content">
                <section className="wrapper">

                    <div className="row">
                        { getPanel(panel) }

                        <RightSidebar posts={posts} />
                    </div>
                </section>
            </section>
        </section>
    );
}

// wrapper for inferno render
function render({ state }) {
    Inferno.render(
        <App onComponentDidMount={ mounted } posts={state.posts} panel={state.panel} />,  
        document.getElementById("root")
    );
}

// initial render
render({ state });

export default render;
