import Inferno from 'inferno';

// onComponentDidMount
function mounted() {
    // fetch('/get-posts')
    //     .then(res => res.json())
    //     .then(posts => {
    //         // after data success re-render
    //         render({ posts });
    //     });
}

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

// top-level root node
function Posts({ posts = [] }) {
    return (
        <div>
            {
                posts.map(post => (
                    <div className="desc">
                      <div className="thumb">
                          <span className="badge bg-theme"><i className="fa fa-clock-o"></i></span>
                      </div>
                      <div className="details">
                        <p><muted>{timeDifference(Date.now(), post.timestamp)}</muted><br/>
                          <a href="#">{post.deets.title}</a><br/>
                        </p>
                      </div>
                    </div>
                ))
            }
        </div>
    );
}

// wrapper for inferno render
function render({ posts }) {
    Inferno.render(
        <Posts onComponentDidMount={ mounted } posts={posts} />,  
        document.getElementById("posts")
    );
}

// initial render
render({});

export default render;