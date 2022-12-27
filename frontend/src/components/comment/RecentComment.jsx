import React from 'react'

const RecentComment = (props) => {
    return (
        <div className='mt-2 d-flex flex-row'>
            <p className='me-2'>{props.author}</p>
            <h5>{props.comm}</h5>
        </div>
    )
}

export default RecentComment