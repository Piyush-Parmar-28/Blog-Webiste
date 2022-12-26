import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
    return (
        <div className="posts">
            <p>My Posts</p>
            {posts.map((p) => (
                <Post post={p} />
            ))}
        </div>
    );
}
