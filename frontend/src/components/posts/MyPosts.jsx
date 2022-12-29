import MyPost from "../post/MyPost";
import "./post.css";

export default function MyPosts({ posts }) {
    return (
        <div >
            <h5 className="postHeading d-flex align-align-items-center justify-content-center">My Posts</h5>

            <div className="posts">
                {posts.map((p) => (
                    <MyPost
                        key={p._id}
                        post={p}
                    />
                ))}
            </div>

        </div>
    );
}
