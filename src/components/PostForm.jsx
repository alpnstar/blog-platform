import React, { useState } from 'react'
import Input from './UI/Input/Input';
import Button from './UI/Button/Button';

const PostForm = ({ createPost }) => {
    const [postOption, setPostOption] = useState({
        title: '1',
        description: '2',
    })
    function addPost(e) {
        e.preventDefault();
        createPost({ id: Date.now(), ...postOption })
        setPostOption({
            ...postOption,
            title: '',
            description: ''
        })
    }
    return (

        <form>
            {/* Управляемый Компонент  */}
            <Input
                value={postOption.title}
                onChange={e => {
                    setPostOption({ ...postOption, title: e.target.value });
                }}
                placeholder='Название поста' />

            {/* // Неуправляемый Компонент
        <input ref={inputRef} type="text" /> */}

            <Input
                value={postOption.description}
                onChange={e => {
                    setPostOption({ ...postOption, description: e.target.value });
                }}
                placeholder='Описание поста' />
            <Button onClick={addPost}>Добавить</Button>
        </form>

    )
}
export default PostForm;