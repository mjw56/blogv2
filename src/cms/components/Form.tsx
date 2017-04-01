import createElement from 'inferno-create-element';
import { linkEvent } from 'inferno';

// new post panel
export const PostFormPanel = ({ 
  submit,
  deletePost,
  previewFile,
  handleImageSelection, 
  changeEventHandler,
  type,
  goHome
}, { store }) => {
    return (
      <div>
          <div className="col-lg-7" id="new-post">
              <div className="form-panel">
                  <div className="form-header">
                      <h4 className="mb"><i className="fa fa-angle-right"></i> { (type === 'new-post') ? `New Post` : `Edit Post`}</h4>
                      <h4 className="close" onClick={goHome}>X</h4>
                  </div>
                  <form className="form-horizontal style-form" id="post-form" data-type={type}>
                      <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">Title</label>
                          <div className="col-sm-10">
                              <input type="text" className="form-control" name="title" id="title" />
                          </div>
                      </div>
                      <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">
                              Content
                              <input type="file" id="uploadImage" style={{ display: 'none' }} onChange={handleImageSelection} />
                              <div class="content-upload-btn form-acc">
                                  <i className="fa fa-file-image-o"></i>
                              </div>
                          </label>
                          <div className="col-sm-10">
                              <textarea type="text" className="form-control" name="content" id="content" onInput={changeEventHandler}></textarea>
                          </div>
                      </div>
                      <div className="form-group">
                          <label className="col-sm-2 col-sm-2 control-label">Cover Photo</label>
                          <div className="col-sm-10">
                              <input type="file" className="form-control" name="file" id="file" onChange={previewFile} />
                              <img src="" alt="Image preview..." id="file-preview" name="file-preview" />
                          </div>
                      </div>
                      <a class="ghost-btn purple" id="submit-btn" onClick={submit}>
                          <span>
                              { (type === 'new-post') ? `Submit` : `Save`}
                          </span>
                      </a>
                      {
                          (type === 'edit')
                              ? (<a class="ghost-btn red" id="delete-btn" onClick={deletePost}>
                                  <span>Delete</span>
                              </a>)
                              : null
                      }
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
};

export default PostFormPanel;