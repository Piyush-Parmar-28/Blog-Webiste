import axios from 'axios';
import * as React from 'react';
import { useState } from "react";
import RecentComment from './RecentComment';

export default function CommentBox(props) {
    const [postData, setPostData] = useState(props.data);

    console.log("Post Data is: ");
    console.log(postData);

    const [commentValue, setCommentValue] = useState("");

    const handleComment = async (event) => {
        setCommentValue(event.target.value)
    }

    const postComment = async (postID, userID) => {
        console.log("user ID: " + userID);
        console.log("post ID: " + postID);

        const commentDetails = {
            userID,
            postID,
            commentValue
        }

        await axios.post("posts/addComment", commentDetails)
        setCommentValue("")

        console.log("Before updating post: ");
        console.log(postData);
        const updatedPost = await axios.post("posts/getPost", commentDetails)
        console.log("The updadted post is: ");
        console.log(updatedPost);
        setPostData(updatedPost.data)
    }

    return (
        <>
            <div className="mt-3">
                <div className='d-flex flex-row justify-content-around'>
                    <textarea name="message" className='form-control me-2' id="message" rows="1" placeholder="Create Comment" required value={commentValue} onChange={handleComment}></textarea>

                    <button type="button" className="btn btn-secondary"><i className="bi bi-send" onClick={() => { postComment(postData._id, postData.userID) }}></i></button>
                </div>


                {postData.comment.map((comment) => (
                    <RecentComment
                        key={comment._id}
                        author={postData.username}
                        comm={comment.commentValue}
                    />
                ))}
            </div>
        </>
    );
}