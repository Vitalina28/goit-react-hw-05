import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const API_KEY = '8029d33b31a05f4bfc09ee2e171723f0';

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}${movieId}/credits?api_key=${API_KEY}`
        );
        console.log(response);
        setCast(response.data.cast);
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
      {cast.map(actor => (
        <ul key={actor.id}>
          <li>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt=""
              width="200"
              height="200"
            />
            <h2>{actor.name}</h2>
            <h3>{actor.character}</h3>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Cast;
