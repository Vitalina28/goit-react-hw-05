import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const API_KEY = '8029d33b31a05f4bfc09ee2e171723f0';

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}${movieId}/reviews?api_key=${API_KEY}`
        );
        console.log(response);
        setReviews(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {reviews.length > 0 ? (
        reviews.map(review => (
          <ul key={review.id}>
            <li>
              <h2>Author: {review.author}.</h2>
              <p>{review.content}</p>
            </li>
          </ul>
        ))
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default Reviews;
