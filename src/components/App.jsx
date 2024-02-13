import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Layout } from './Layout';

const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

export const App = () => {
  return (
    <Suspense fallback={<div>LOADING PAGE...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<NOtFoundPage />} /> */}
      </Routes>
    </Suspense>
  );
};

export default App;
