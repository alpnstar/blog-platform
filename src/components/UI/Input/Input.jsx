import React from 'react';
import classes from './input.module.css';

const Input = React.forwardRef((props, fooRef) => {
    return (
        <input ref={fooRef} {...props} className={classes.myInput} type="text" />
    )
})

export default Input