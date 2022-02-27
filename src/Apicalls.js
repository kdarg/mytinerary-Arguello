import axios from 'axios';

export const getMyCities = async () => {
    try {
        let data = await axios.get(`http://localhost:4000/api/allcities`)
        return data
    }
    catch (error) {
        throw error
    }
}