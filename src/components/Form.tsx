import Component from "inferno-component";
import createElement from "inferno-create-element";
import { linkEvent } from "inferno";
import { FormService } from "../services/Form";

// store any image uploads until submission
function imageSelectionForCover(t) {
  t.formService.getImage("cover-image").then(({ file, content }) => {
    document.getElementById("file-preview").src = content;
    const { user } = t.context.store.getState();

    t.context.api
      .post("add-image", {
        name: file.name,
        content: content.replace(/^(.+,)/, ""),
        token: t.context.api.getToken(),
        owner: user.login
      })
      .then(res => {
        t.cover = file.name;
      });
  });
}

function imageSelectionForPostBody(t) {
  t.formService.getImage("post-image").then(({ file, content }) => {
    const { user } = t.context.store.getState();

    t.context.api
      .post("add-image", {
        name: file.name,
        content: content.replace(/^(.+,)/, ""),
        token: t.context.api.getToken(),
        owner: user.login
      })
      .then(res => {
        const content = document.getElementById("content").value;

        if (content === "") {
          document.getElementById(
            "content"
          ).value = `![${file.name}](../../media/${file.name})`;
        } else {
          document.getElementById(
            "content"
          ).value = `${content}\n\n![${file.name}](../../media/${file.name})`;
        }
      });
  });
}

// submit the form
function formSubmission(t, event) {
  t.formService
    .submit(
      {
        token: t.context.api.getToken(),
        state: t.context.store.getState(),
        cover: t.cover
      },
      event
    )
    .then(res => {
      t.context.store.updateState({ route: "index" });
    });
}

function closeForm(store) {
  store.updateState({ route: "index", postToEdit: null });
}

// Generic Form
// TODO: Split into New/Edit
export class Form extends Component<any, any> {
  formService;
  cover = "";

  constructor(props, context?: any) {
    super(props, context);
    this.formService = FormService();
  }

  componentDidMount() {
    const state = this.context.store.getState();
    this.formService
      .formMount(this.context.store.getState())
      .then(() => {
        // check post details, go fetch if necessary
        if (state.postToEdit) {
          Promise.all([
            this.context.api.request(
              "/repos/:username/fuusio/contents/config.json"
            ),
            this.context.api.request(
              `/repos/:username/fuusio/contents/drafts/${state.postToEdit.slug}/index.md`
            )
          ])
            .then(([config, post]) => {
              try {
                const parsedConfig = JSON.parse(atob(config.content));
                const parsedPost = JSON.parse(atob(post.content));

                document.getElementById("title").value = parsedConfig.posts[
                  state.postToEdit.slug
                ].title;
                document.getElementById("content").value = parsedPost;
              } catch (e) {
                console.log(
                  "failed to parse post title and contents for edit",
                  e
                );
              }
            })
            .catch(e =>
              console.log("failed to fetch details for post to edit"));
        }
      })
      .catch(e => console.log("failed to mount form"));
  }

  componentWillUnmount() {
    this.formService.formUnmount();
    this.formService = null;
  }

  render() {
    const state = this.context.store.getState();
    const { api, router, store } = this.context;
    return (
      <div>
        <div className="col-lg-7" id="new-post">
          <div className="form-panel">
            <div className="form-header">
              <h4 className="mb">
                <i className="fa fa-angle-right" />
                {" "}
                {state.route === "new-post" ? `New Post` : `Edit Post`}
              </h4>
              <h4 className="close" onClick={linkEvent(store, closeForm)}>X</h4>
            </div>
            <form
              className="form-horizontal style-form"
              id="post-form"
              data-type={state.route}
            >
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">Title</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  Content
                  <input
                    type="file"
                    id="post-image"
                    style={{ display: "none" }}
                    onChange={linkEvent(this, imageSelectionForPostBody)}
                  />
                  <div class="content-upload-btn form-acc">
                    <i className="fa fa-file-image-o" />
                  </div>
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    className="form-control"
                    name="content"
                    id="content"
                    onInput={this.formService.changeEventHandler}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 col-sm-2 control-label">
                  Cover Photo
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    id="cover-image"
                    onChange={linkEvent(this, imageSelectionForCover)}
                  />
                  <img
                    src=""
                    alt="Image preview..."
                    id="file-preview"
                    name="file-preview"
                  />
                </div>
              </div>
              <a
                class="ghost-btn purple"
                id="submit-btn"
                onClick={linkEvent(this, formSubmission)}
              >
                <span>
                  {state.route === "new-post" ? `Submit` : `Save`}
                </span>
              </a>
              {state.route === "edit"
                ? <a
                    class="ghost-btn red"
                    id="delete-btn"
                    onClick={linkEvent(
                      { router, store },
                      this.formService.deletePost
                    )}
                  >
                    <span>Delete</span>
                  </a>
                : null}
            </form>
          </div>
        </div>
        <div className="col-lg-5" id="post-preview">
          <span class="content">
            <span class="preview">✨ Your post will preview here... ✨</span>
          </span>
        </div>
      </div>
    );
  }
}
