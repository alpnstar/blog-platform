import { useState } from "react"

const useFetching = callback => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (limit,page) => {
        try {
            setIsLoading(true);
            await callback(limit,page);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error]
}
export default useFetching;