import axios from 'axios';
import * as React from 'react';
import {useState} from "react";

export default function Comment(props) {
    const [commentValue, setCommentValue]= useState("");

    const handleComment= async (event) =>{
        setCommentValue( event.target.value )
    }

    const postComment= async (postID, userID)=>{
        console.log("user ID: "+ userID);
        console.log("post ID: "+ postID);

        const commentDetails= {
            userID, 
            postID,
            commentValue
        }

        await axios.post("posts/addComment", commentDetails)
        setCommentValue("")
    }

    return (
        <>
            <div className="mt-3 d-flex flex-row justify-content-around">
                <textarea name="message" id="message" rows="1" placeholder="Create Comment" required value={commentValue} onChange={handleComment}></textarea>

                <button type="button" className="btn btn-secondary"><i className="bi bi-send" onClick={() => {postComment(props.postID ,props.userID) }}></i></button>
            </div>
        </>
    );
}