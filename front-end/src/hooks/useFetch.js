import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (options) => {
  const [requestState, setRequestState] = useState({
    data: [],
    isLoading: true,
    isError: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseJSON = await axios.request(options);
        setRequestState((prevState) => ({
          ...prevState,
          data: responseJSON,
          isLoading: false,
        }));
      } catch (error) {
        setRequestState((prevState) => ({
          ...prevState,
          isError: error,
        }));
      }
    };
    fetchData();
  }, [options]);
  return [
    requestState.data,
    requestState.isLoading,
    requestState.isError,
  ];
};

export default useFetch;
