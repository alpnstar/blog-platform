import React from 'react';

const PostCommentsItem = ({data}) => {
    return (
        <div style={{border: '2px lightgray solid', padding: '5px'}}>
            <h3 style={{color: 'teal'}}>{data.email}</h3>
            <h4>{data.name}</h4>
            <p>{data.body}</p>
        </div>
    );
};

export default PostCommentsItem;