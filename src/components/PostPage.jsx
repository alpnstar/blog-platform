import React from 'react';
import Button from './UI/Button/Button';

const PostPage = ({ page, setPage, max }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <h1 style={{ color: 'teal' }}>{page}</h1>
            </div>
            <Button onClick={() => {
                page != 1 && setPage(page - 1);
            }}>Предыдущая страница</Button>
            <Button onClick={() => {
                page != max && setPage(page + 1);
            }}>Следующая страница</Button>
        </div>
    )
}

export default PostPage