import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostItem from "../components/PostItem";
import postService from "../API/PostService";
import useFetching from "../hooks/useFetching";
import FetchStatus from "../components/FetchStatus";
import PostCommentsItem from "../components/PostCommentsItem";

const PostIdPage = () => {

    const param = useParams();
    const [post, setPost] = useState();
    const [postComments, setPostComments] = useState([]);

    const [postFetch, postLoading, postError] = useFetching(async (id) => {
        const response = await postService.getById(id);
        const data = await response.data;
        setPost(data);
    });
    const [postCommentsFetch, postCommentsLoading, postCommentsError] = useFetching(async (id) => {
        const response = await postService.getById(id + '/comments');
        const data = await response.data;
        setPostComments(data);
    });
    useEffect(() => {
        postFetch(param.id);
        postCommentsFetch(param.id);
    }, []);
    return (
        <div className='container'>
            <h1>Вы попали на страницу поста #{param.id}</h1>
            <div style={{margin: '20px 0'}}>
                <FetchStatus
                    condition={!post}
                    loading={postLoading}
                    error={postError}>
                    <PostItem data={post} buttons={false}/>
                </FetchStatus>
            </div>
            <div style={{}}>
                <h3>Блок комментариев</h3>
                <FetchStatus
                    condition={postComments.length === 0}
                    loading={postCommentsLoading}
                    error={postCommentsError}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        {postComments.map(item =>
                            <PostCommentsItem key={item.id} data={item}/>)}

                    </div>
                </FetchStatus>
            </div>
            <div>
            </div>
        </div>
    );
};

export default PostIdPage;