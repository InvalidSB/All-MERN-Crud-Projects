import axios from "axios";
import React, { useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CreateNewPost() {
  const [title, setTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setshortDescription] = useState("");

  const submitHandler = () => {
    const postData = {
      title: title,
      postCategory: postCategory,
      description: description,
      shortDescription: shortDescription,
    };
    console.log(postData);
    axios.post(`http://localhost:8080/api/posts/add`, postData).then((res) => {
      if (res.data.success) {
        console.log("data posted cusseccfully ");
        setTitle("");
        setDescription("");
        setPostCategory("");
        setshortDescription("");
      }
    });
  };

  return (
    <>
      <h1 style={{ marginBottom: 40, marginTop: 40, textAlign: "center" }}>
        Create New Post
      </h1>
      <div style={{ width: "50%", padding: 30, margin: "auto" }}>
        <div>
          <div>
            <form className="row g-3">
              <div className="col-md-6">
                <label for="inputText" className="form-label">
                  TITLE
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog Title"
                  aria-label="Blog Title"
                />
              </div>
              <div className="col-md-6">
                <label for="inputState" className="form-label">
                  CATEGORY{" "}
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  name="postCategory"
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                >
                  <option defaultValue>Others</option>
                  <option>Javascript</option>
                  <option>Python</option>
                  <option>Data Science</option>
                  <option>Html and Css</option>
                </select>
              </div>

              <div className="col-md-12">
                <label for="inputText" className="form-label">
                Short DESCRIPTION
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="shortDescription"
                  value={shortDescription}
                  onChange={(e) => setshortDescription(e.target.value)}
                  placeholder="Blog shortDescription"
                  aria-label="Blog shortDescription"
                />
              </div>

              <div className="col-md-12">
                  <label>BLOG DESCRIPTION</label>
                <div className="form-floating">
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                    }}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-info"
                onClick={submitHandler}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewPost;
