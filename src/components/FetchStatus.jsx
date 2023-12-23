import React from 'react';
import Loader from "./UI/Loader/Loader";

const fetchStatus = ({condition, loading, error, children}) => {
    return (
        <div>

            {((condition) &&
                ((loading && <Loader/>) || (error && <h1>Error</h1>) || (
                    <h1>Посты не найдены</h1>
                ))) || (
                <div>
                    {children}
                </div>
            )}
        </div>
    )

};

export default fetchStatus;