import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
    return (
        <div className="posts">
            <p>All Posts</p>

            {posts.map((p) => (
                <Post post={p} />
            ))}
        </div>
    );
}
