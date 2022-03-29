import axios from 'axios';

export const getMyCities = async () => {
    try {
        let data = await axios.get(`https://mytinerary-arguello.herokuapp.com/api/allcities`)
        return data
    }
    catch (error) {
        throw error
    }
}