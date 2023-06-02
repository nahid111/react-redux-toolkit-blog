import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../slices/postsApi";
import Loader from "../../components/Loader";

const PostsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: postList, isLoading, isFetching } = useGetPostsQuery();

  return isLoading || isFetching ? (
    <Loader />
  ) : postList.length > 0 ? (
    <>
      <div className="row">
        <div className="col-md-8">
          <h1 className="fs-1">Posts</h1>
        </div>
        <div className="col-md-4 text-end">
          {userInfo && (
            <LinkContainer to="/posts/add">
              <button type="button" className="btn btn-outline-primary">
                Add Post
              </button>
            </LinkContainer>
          )}
        </div>
      </div>
      <hr />
      {postList.map((post) => (
        <LinkContainer key={post.id} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
          <a>
            <div className="card mb-3 border-light bg-secondary bg-opacity-10">
              <div className="row g-0">
                <div className="col-md-3">
                  <img src={post.cover_img_url} className="img-fluid" />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {post.author}
                    </h6>
                    <div className="card-text text-muted">
                      <p>
                        {post.created_at
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </p>
                      <p>{post.categories.map((cat) => cat + " ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </LinkContainer>
      ))}
    </>
  ) : (
    <h1>No post found</h1>
  );
};

export default PostsScreen;
