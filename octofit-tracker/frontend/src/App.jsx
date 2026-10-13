import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navigation = [
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
];

function Home() {
  return (
    <section className="mx-auto text-center" style={{ maxWidth: 760 }}>
      <p className="text-success fw-semibold text-uppercase">Move together</p>
      <h1 className="display-4 fw-bold">Your fitness journey starts here.</h1>
      <p className="lead text-body-secondary mb-4">
        Track activities, connect with your team, and celebrate every step of
        your progress.
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {navigation.map(({ label, to }) => (
          <Link className="btn btn-outline-success" key={to} to={to}>
            Explore {label.toLowerCase()}
          </Link>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
        <div className="container flex-wrap">
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to="/"
          >
            <img src="/octofitapp-small.png" alt="" width="36" height="36" />
            <span>OctoFit Tracker</span>
          </Link>
          <div className="navbar-nav flex-row flex-wrap gap-1">
            {navigation.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-2${isActive ? ' active fw-semibold' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <section className="text-center">
                <h1>Page not found</h1>
                <Link to="/">Return to the dashboard</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
