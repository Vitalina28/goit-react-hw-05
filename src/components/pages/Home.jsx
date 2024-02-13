import axios from 'axios';
import Loader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
    const API_KEY = '8029d33b31a05f4bfc09ee2e171723f0';

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
        setMovies([...response.data.results]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {loading && <Loader />}
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
