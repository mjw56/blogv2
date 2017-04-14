import { fileIsAnImage, signS3 } from "./Misc";

// Form Service
// Currently andles form logistics
// (form setup/destroy, WebSocket communication, Image uploads)
export function FormService() {
  let formWS = null;

  // get image that was uploaded via dialog
  function getImage(id) {
    return new Promise((resolve, reject) => {
      var file = document.getElementById(id).files[0];
      var reader = new FileReader();

      if (!file) {
        console.log("no file selected");
        return;
      }

      if (file && fileIsAnImage(file.name)) {
        reader.readAsDataURL(file);

        function onLoad() {
          reader.removeEventListener("load", onLoad, false);

          resolve({ file, content: reader.result });
        }

        const listener = reader.addEventListener("load", onLoad, false);
      }
    });
  }

  // when form mounts, boot up the web socket
  function formMount(state) {
    return new Promise((resolve, reject) => {
      formWS = new WebSocket(`ws://${location.host}`);
      formWS.onerror = () => console.log("WebSocket error");
      formWS.onopen = () => {
        console.log("WebSocket is opened");
        resolve();
      };
      formWS.onclose = () => console.log("WebSocket connection closed");

      formWS.onmessage = msg => {
        document.getElementById("post-preview").innerHTML = msg.data;
      };
    });
  }

  // when form unmounts, destroy the web socket
  function formUnmount() {
    formWS.close();
    formWS = null;
  }

  // listen for when the textarea has been updated
  // this sends the content over the socket
  function changeEventHandler(event) {
    formWS.send(JSON.stringify({ content: event.target.value }));
  }

  // handle the submission of the form
  function submit({ state, token, cover }, event) {
    return new Promise((resolve, reject) => {
      // prevent the default browser form behavior, we'll handle it
      event.preventDefault();

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let route = "";
      let data = {};

      // check the state of postToEdit
      if (!state.postToEdit) {
        route = "save-post";
        data = {
          deets: {
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
          },
          token,
          cover,
          user: {
            login: state.user.login,
            name: state.user.name
          }
        };
      } else {
        route = "update-post";

        data = {
          post: state.postToEdit,
          deets: {
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
          },
          token,
          user: {
            login: state.user.login,
            name: state.user.name
          }
        };
      }

      fetch(route, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      }).then(res => {
        if (res && res.status === 200) {
          // reset UI state
          document.getElementById("submit-btn").classList.remove("purple");
          document.getElementById("submit-btn").classList.add("green");

          setTimeout(function() {
            resolve();
          }, 2500);
        } else {
          reject("SAVE FAILURE");
        }
      });
    });
  }

  // delete a post from the database
  function deletePost({ store, getPosts, router }) {
    const state = store.getState();

    // prevent the default browser form behavior, we'll handle it
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const _id = document.getElementById("post-form").attributes["data-id"]
      .nodeValue;
    const post = state.posts.find(p => p._id === _id);

    const data = {
      timestamp: post.timestamp
    };

    fetch("delete-post", {
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
          document.getElementById("delete-btn").classList.remove("orange");
          document.getElementById("delete-btn").classList.add("green");

          setTimeout(function() {
            store.updateState({ route: "index" });
          }, 2500);
        } else {
          console.log("DELETE FAILURE");
        }
      });
  }

  return {
    formMount,
    formUnmount,
    changeEventHandler,
    getImage,
    deletePost,
    submit
  };
}
