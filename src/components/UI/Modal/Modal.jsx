import React from 'react'
import cl from './Modal.module.css';

const Modal = ({ children, visibility, setVisibility }) => {
    return (
        <>
            <div
                className={[visibility ? cl.background : '']}
                onClick={() => setVisibility(!visibility)}
            ></div>
            <div className={[cl.modal, (visibility) ? cl.modalActive : ''].join(' ')}>
                {children}
            </div>
        </>
    )
}

export default Modal