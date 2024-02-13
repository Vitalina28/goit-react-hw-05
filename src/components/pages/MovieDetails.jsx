import axios from 'axios';
import Loader from 'components/Loader';
import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Card, Info } from './MovieDetails.staled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkLocationRef = useRef(location);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const API_KEY = '8029d33b31a05f4bfc09ee2e171723f0';

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}${movieId}?api_key=${API_KEY}`
        );
        setMovie(response.data);
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
      {movie && (
        <div>
          <Link to={backLinkLocationRef.current.state?.from ?? '/'}>
            <button type="submit">Go back</button>
          </Link>
          <Card>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
              width="250"
              height="250"
            />
            <Info>
              <h2>{movie.title}</h2>
              <p>User Score: {movie.vote_average}</p>
              <h3>Overview: </h3>
              <p>{movie.overview}</p>
              <h3>Gender</h3>

              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </Info>
          </Card>
          <hr />
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetails;
