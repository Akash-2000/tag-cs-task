import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { API_URL } from "../constant.js";

const useFetchPosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { data, loading, error };
};

export default useFetchPosts;
