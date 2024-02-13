import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Button, Input } from './Movies.styled';
import Loader from 'components/Loader';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  const quite = searchParams.get('quite') || '';

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
      const API_KEY = '8029d33b31a05f4bfc09ee2e171723f0';

      if (quite === '') {
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}?api_key=${API_KEY}&query=${quite}`
        );
        setMovies([...response.data.results]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quite]);

  const handleNameChange = event => {
    setSearchQuery(event.target.value);
  };

  const hanldeSubmit = event => {
    event.preventDefault();
    setSearchQuery(searchQuery.trim());
  };

  const handleClick = () => {
    setSearchParams({ quite: searchQuery });
    setSearchQuery('');
  };

  return (
    <div>
      <form onSubmit={hanldeSubmit}>
        <Input type="text" onChange={handleNameChange} value={searchQuery} />
        <Button type="submit" onClick={handleClick}>
          Search
        </Button>
      </form>
      {loading && <Loader />}
      {movies.length > 0 &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
    </div>
  );
};

export default Movies;
