import { useContext, useState } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function MyPost({ post }) {
    const PF = "http://localhost:5000/images/";
    const { user, dispatch } = useContext(Context);
    const [currentUser, setCurrentUser] = useState(user);

    // console.log("current user: ");
    // console.log(currentUser);

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
        // console.log("postID: " + postID);
        // console.log("userID: " + userID);

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
        <div className="post">
            {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">{post.category}</span>
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            <p className="postDesc">{post.desc}</p>

            <div className="d-flex flex-row">
                <button type="button" className="btn btn-success" onClick={() => { handleLike(post._id, currentUser._id) }}>Like</button>
                <button type="button" className="btn btn-danger" onClick={() => { handleDisLike(post._id, currentUser._id) }}>Dislike</button>

                {

                    currentUser.Liked.includes(post._id) === true ?
                        <div>
                            <i className="bi bi-hand-thumbs-up-fill"></i>
                            <i className="bi bi-hand-thumbs-down"></i>
                        </div>
                        :
                        currentUser.Disliked.includes(post._id) === true ?
                            <div>
                                <i className="bi bi-hand-thumbs-up"></i>
                                <i className="bi bi-hand-thumbs-down-fill"></i>
                            </div>
                            :
                            <div>
                                <i className="bi bi-hand-thumbs-up"></i>
                                <i className="bi bi-hand-thumbs-down"></i>
                            </div>
                }
            </div>
        </div>
    );
}