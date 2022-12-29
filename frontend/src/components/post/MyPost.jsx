import { useContext, useState } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function MyPost({ post }) {
    const PF = "http://localhost:5000/images/";
    const { user, dispatch } = useContext(Context);
    const [currentUser, setCurrentUser] = useState(user);

    const handleLike = async (postID, userID) => {
        const details = {
            userID,
            postID
        };

        try {
            const updatedUserData = await axios.post("posts/like", details);
            setCurrentUser(updatedUserData.data)
        } catch (err) {
            console.log("error is: ");
            console.log(err);
        }
    };

    const handleDisLike = async (postID, userID) => {
        
        const details = {
            userID,
            postID
        };

        try {
            const updatedUserData = await axios.post("posts/dislike", details);
            setCurrentUser(updatedUserData.data)
        } catch (err) {
            console.log("error is: ");
            console.log(err);
        }
    };

    return (
        <div className="post p-3 form-control">

            <Link to={`/post/${post._id}`} className="link d-flex justify-content-center align-items-center">
                <span className="postTitle">{post.title}</span>
            </Link>

            <div className="d-flex justify-content-between">
                <span className="postCat">{post.category}</span>

                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>

            </div>
            <hr />

            <p className="postDesc d-flex justify-content-center align-items-center mt-2">{post.desc}</p>
            <hr />
        </div>
    );
}