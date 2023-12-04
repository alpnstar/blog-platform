import React from 'react'
import cl from './loader.module.css';

const Loader = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        }}>
            <div className={cl.loader}>
            </div>
            <h1>Идет загрузка...</h1>
        </div>
    )
}

export default Loader