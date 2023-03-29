import axios from 'axios';

export const getMyCities = async () => {
    try {
        let data = await axios.get(`${REACT_APP_BACKEND_URL}/api/allcities`)
        return data
    }
    catch (error) {
        throw error
    }
}