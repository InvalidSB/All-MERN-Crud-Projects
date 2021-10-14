import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  const [showdelete, setShowDelete] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/api/posts").then((res) => {
      console.log(res);
      setPosts(res.data.posts);
    });
  }, [showdelete]);

  const FilterContent = (posts, searchData) => {
    const result = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchData) ||
        post.postCategory.toLowerCase().includes(searchData) ||
        post.shortDescription.toLowerCase().includes(searchData)
    );

    setPosts(result);
  };

  const handleSearch = (e) => {
    const searchData = e.target.value;
    axios.get("http://localhost:8080/api/posts").then((res) => {
      FilterContent(res.data.posts, searchData);
    });
  };

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8080/api/posts/delete/${id}`)
      .then(() => console.log("delete successfully"))
      .catch((error) => console.log(error));

    setShowDelete(true);
  };

  return (
    <div className="App">
      <h1 style={{ marginBottom: 40 }}>All posts</h1>
      <div className="container">
        <form class=" col-lg-3 d-flex mb-5">
          <input
            class="form-control me-5"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
            aria-label="Search"
          />
        </form>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          {posts.map((post, i) => {
            return (
              <div class="col">
                <div class="card">
                  <img
                    src={`https://source.unsplash.com/1600x900/?${post.postCategory}`}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <div
                      class="card-title"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>
                        {i + 1}.&nbsp;
                        <a href={`/posts/details/${post._id}`} style={{textDecoration:"none"}}>{post.title}</a>
                      </h3>
                      <h5>
                        {" "}
                        <a
                          // className="btn btn-warning"
                          style={{ textDecoration: "none" }}
                          href={`/posts/edit/${post._id}`}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>Edit
                        </a>
                      </h5>{" "}
                      &nbsp;
                    </div>
                    <p
                      class="card-text"
                      dangerouslySetInnerHTML={{ __html: post.shortDescription }}
                    ></p>
                  </div>

                  <a
                    className="btn btn-danger"
                    onClick={(id) => deleteHandler(post._id)}
                  >
                    {" "}
                    <i className="fas fa-delete"></i>delete
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
