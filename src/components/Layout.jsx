import { Outlet } from 'react-router-dom';
import { Link, List } from './Loyout.staled';

export const Layout = () => {
  return (
    <div>
      <nav>
        <List>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </List>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
