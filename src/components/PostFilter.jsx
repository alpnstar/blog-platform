import React from 'react';
import  Select  from './UI/Select/Select';
import Input from './UI/Input/Input';

const PostFilter = ({ filter, setFilter, sortPosts }) => {

    return (
        <div className='post-filter'>
            <Input value={filter.searchQuery} onChange={event => {
                setFilter({ ...filter, searchQuery: event.target.value });
            }} />
            <Select value={filter.selectedSort}
                onChange={sortPosts}
                defaultValue={'Сортировка'}
                options={[
                    {
                        value: 'title',
                        name: 'По названию',
                    },
                    {
                        value: 'body',
                        name: 'По описанию',
                    }
                ]} />

        </div>
    )
}
export default PostFilter;