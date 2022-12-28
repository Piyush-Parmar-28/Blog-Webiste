import MyPost from "../post/MyPost";
import "./posts.css";

export default function MyPosts({ posts }) {
    return (
        <div className="posts">
            <p>My Posts</p>

            {posts.map((p) => (
                <MyPost
                    post={p} 
                />
            ))}
        </div>
    );
}
