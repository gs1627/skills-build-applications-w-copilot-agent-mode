import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <nav className="navbar navbar-expand navbar-dark bg-success shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/octofitapp-small.png" alt="" width="36" height="36" />
            <span>OctoFit Tracker</span>
          </Link>
        </div>
      </nav>
      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <section className="mx-auto text-center" style={{ maxWidth: 720 }}>
                <p className="text-success fw-semibold text-uppercase">
                  Move together
                </p>
                <h1 className="display-4 fw-bold">Your fitness journey starts here.</h1>
                <p className="lead text-body-secondary">
                  Track activities, connect with a team, and celebrate progress.
                  Your OctoFit dashboard is ready to grow.
                </p>
              </section>
            }
          />
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
  )
}

export default App
