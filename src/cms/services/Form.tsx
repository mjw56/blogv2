import { fileIsAnImage, signS3 } from './Misc';

export function FormService(store) {
    let formWS = null;

    // this calls s3 to upload the file with the signed request
    function uploadFile(file, signedRequest, url){
        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', signedRequest);
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4){
                    if(xhr.status === 200) {
                        resolve();
                    }
                    else{
                        reject();
                    }
                }
            };
            xhr.send(file);
        });
    }

    // this will populate the image preview dialog
    // after user has selected a file to upload
    function previewFile() {
        var preview = document.getElementById('file-preview');
        var file = document.getElementById('file').files[0];
        var reader = new FileReader();

        if (!file) {
            console.log('no file selected');
            return;
        }

        reader.addEventListener("load", function () {
            // load image into DOM
            preview.src = reader.result;
        }, false);

        if (file && fileIsAnImage(file.name)) {
            reader.readAsDataURL(file);

            // get signature for upload to s3
            signS3(file).then(function(res) {
                uploadFile(file, res.signedRequest, res.url).then(function() {
                    document.getElementById('file-preview').src = res.url;
                });
            });
        }
    }

    function formMount() {
        const state = store.getState();

        formWS = new WebSocket(`ws://${location.host}`);
        formWS.onerror = () => console.log('WebSocket error');
        formWS.onopen = () => {
            console.log('WebSocket connection established');

            // check the route, are we on edit?
            if (state.panel === 'edit-post') {
                formWS.send(JSON.stringify({ content: document.getElementById('content').value }));
            }
        };
        formWS.onclose = () => console.log('WebSocket connection closed');

        formWS.onmessage = (msg) => {
            document.getElementById('post-preview').innerHTML = msg.data;
        }
    }

    function formUnmount() {
        formWS.close();
        formWS = null;
    }

    function changeEventHandler(event) {
        formWS.send(JSON.stringify({ content: event.target.value }));
    }

    function handleImageSelection() {
        var file = document.getElementById('uploadImage').files[0];
        var reader = new FileReader();

        if (!file) {
            console.log('no file selected');
            return;
        }

        if (file && fileIsAnImage(file.name)) {
            reader.readAsDataURL(file);

            // get signature for upload to s3
            signS3(file).then(res => {
                uploadFile(file, res.signedRequest, res.url).then(function() {
                    const content = document.getElementById('content').value;
                    const newContent = (content !== '')
                        ? `${content}\n![${file.name}](${res.url})`
                        : `![${file.name}](${res.url})`;

                    document.getElementById('content').value = newContent;
                    formWS.send(JSON.stringify({ content: document.getElementById('content').value }));
                });
            });
        }
    }

    // handle the submission of the form
    function submit({ getPosts, goHome, store }, event) {
        const state = store.getState();

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
                document.getElementById('submit-btn').classList.remove('purple');
                document.getElementById('submit-btn').classList.add('green');

                setTimeout(function() {
                    goHome();
                }, 2500);
            } else {
                console.log('SAVE FAILURE');
            }
        });
    }

    // delete a post from the database
    function deletePost({ store, getPosts, goHome }) {
        const state = store.getState();

        // prevent the default browser form behavior, we'll handle it
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const _id = document.getElementById('post-form').attributes['data-id'].nodeValue;
        const post = state.posts.find(p => p._id === _id);

        const data = {
            timestamp: post.timestamp
        };

        fetch('delete-post', {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res) {
                // fetch new list
                getPosts(store);

                // reset UI state
                document.getElementById('delete-btn').classList.remove('orange');
                document.getElementById('delete-btn').classList.add('green');

                setTimeout(function() {
                    goHome(store);
                }, 2500);
            } else {
                console.log('DELETE FAILURE');
            }
        });
    }

    return {
        formMount,
        formUnmount,
        changeEventHandler,
        handleImageSelection,
        previewFile,
        deletePost
    }
}