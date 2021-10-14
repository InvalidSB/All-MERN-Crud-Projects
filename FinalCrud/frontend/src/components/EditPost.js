import axios from "axios";
import React, { useState, useEffect } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditPost(props) {
  const [title, setTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setshortDescription] = useState("");


  useEffect(() => {
    const id = props.match.params.id;
    axios.get(`http://localhost:8080/api/posts/details/${id}`).then((res) => {
      // console.log(res.data.post);
      if (res.data.success) {
        setTitle(res.data.post.title);
        setDescription(res.data.post.description);
        setshortDescription(res.data.post.shortDescription);
        setPostCategory(res.data.post.postCategory);
      }
    });
  }, []);

  const editsubmitHandler = () => {
    const id = props.match.params.id;

    const postData = {
      title: title,
      postCategory: postCategory,
      description: description,
      shortDescription: shortDescription,
    };
    axios
      .put(`http://localhost:8080/api/posts/update/${id}`, postData)
      .then((res) => {
        if (res.data.success) {
          console.log("data posted cusseccfully ");
        }
      });
  };

  return (
    <>
      <h1 style={{ marginBottom: 40, marginTop: 40, textAlign: "center" }}>
        Edit Here
      </h1>
      <div>
          
      </div>
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
                <div className="form-floating">
                  {/* <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"  name="description" value={postData.description}  onChange={ChangeHandler} style={{height: 100}}/> */}
                  <label for="floatingTextarea2">BLOG DESCRIPTION</label>
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
                onClick={editsubmitHandler}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost;
