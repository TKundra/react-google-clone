import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const StateContext = createContext();
const BASE_URL = 'https://google-search3.p.rapidapi.com/api/v1';
const API_KEY = process.env.REACT_APP_API_KEY;

export const StateContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchedTerm, setSearchedTerm] = useState('');

    const getResults = async(url) => {
        setLoading(true);
        await axios({
            method: 'GET',
            url: `${BASE_URL}${url}`,
            headers: {
                'x-user-agent': 'desktop',
                'x-proxy-location': 'IN',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': API_KEY
            }
        })
        .then((response) => setResults(response.data))
        .catch((error) => console.log(error.message));
        setLoading(false);
    };

    return (
        <StateContext.Provider value={{ getResults, results, searchedTerm, setSearchedTerm, loading }} >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext);