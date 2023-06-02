import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPostMutation } from "../../slices/postsApiSlice";
import Loader from "../../components/Loader";
import PostDeleteButton from "./PostDeleteButton";

const PostScreen = () => {
  let { postId } = useParams();
  const [post, setPost] = useState(undefined);
  const { userInfo } = useSelector((state) => state.auth);
  const [getPost, { isLoading }] = useGetPostMutation();

  const fetchPost = async () => {
    const res = await getPost(postId).unwrap();
    setPost(res);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return isLoading ? (
    <Loader />
  ) : post ? (
    <>
      <div className="row my-3">
        <div className="col-md-8">
          <p className="display-1 text-primary">{post.title}</p>
        </div>
        <div className="col-md-4 text-end">
          {userInfo && userInfo.email === post.author && (
            <PostDeleteButton postId={postId} />
          )}
        </div>
      </div>
      <p>
        {post.categories.map((cat) => (
          <span key={cat} className="badge fs-6 text-bg-warning mx-1">
            {cat}
          </span>
        ))}
      </p>
      <div className="row">
        <div className="col-md-6">
          <span className="h4 text-muted">{post.author}</span>
        </div>
        <div className="col-md-6 text-end">
          <span className="h5 text-muted">
            {post.created_at.split("T")[0].split("-").reverse().join("-")}
          </span>
        </div>
      </div>
      <img src={post.cover_img_url} className="img-fluid my-3" alt="..." />
      <div className="row">
        <div className="col-md-12">{post.body}</div>
      </div>
    </>
  ) : (
    <h1 className="text-danger">No post found</h1>
  );
};

export default PostScreen;
