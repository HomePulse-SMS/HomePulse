import {useEffect, useState} from "react";
import axios from "axios";

const useFetchData = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwtToken');
            console.log("In Dashboard Token: "+token);
            if (!token) {
                setError("Authentication token not found.");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:9090/secretory/${endpoint}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("In DataFetchPoint:", response.data.data);
                setData(response.data?.data || []);
            } catch (err) {
                setError(`Failed to fetch data from ${endpoint}.`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData()
    }, [endpoint]);

    return { data, loading, error };
};

export default useFetchData;