import React, { useState, useEffect } from 'react'
import "./comment.css"

const MyComments = (props) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(props.myComments)
    }, []);

    // console.log("Comments are: ");
    // console.log(comments);
    // console.log(props);

    return (
        <div>
            <h5 className='commentTitle d-flex justify-content-center align-items-center'>My Comments</h5>

            <div className='d-flex'>
                {comments.map((comm) => (
                    <p className='form-control commentBox d-flex justify-content-center'>{comm}</p>
                ))}
            </div>
        </div>
    )
}

export default MyComments