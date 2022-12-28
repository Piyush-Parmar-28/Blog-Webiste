import React, {useState, useEffect} from 'react'

const MyComments = (props) => {
    const [comments, setComments]= useState([]);

    useEffect(() => {
        setComments(props.myComments)
    }, []);

    console.log("props Comments are: ");
    console.log(props.myComments);

    console.log("Comments are: ");
    console.log(comments);

    return (
        <div>
            <h5>My Comments: </h5>
            {comments.map((comm) => (
                <p>{comm}</p>
            ))}
        </div>
    )
}

export default MyComments