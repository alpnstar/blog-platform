import React from 'react';
import { Select } from './UI/Select/Select';
import Input from './UI/Input/Input';

export const PostFilter = ({ filter, setFilter, sortPosts }) => {

    return (
        <div className='post-filter'>
            <Input style={{ borderColor: 'teal' }} value={filter.searchQuery} onChange={event => {
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
                        value: 'description',
                        name: 'По описанию',
                    }
                ]} />

        </div>
    )
}
