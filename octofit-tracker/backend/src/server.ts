import express, { type NextFunction, type Request, type Response } from 'express';
import { connectDatabase } from './config/database';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

type AsyncRoute = (request: Request, response: Response) => Promise<void>;

const asyncRoute =
  (handler: AsyncRoute) =>
  (request: Request, response: Response, next: NextFunction): void => {
    void handler(request, response).catch(next);
  };

app.get(
  '/api/users/',
  asyncRoute(async (_request, response) => {
    response.json(await User.find().populate('team', 'name').lean());
  }),
);
app.get(
  '/api/teams/',
  asyncRoute(async (_request, response) => {
    response.json(await Team.find().populate('members', 'username displayName').lean());
  }),
);
app.get(
  '/api/activities/',
  asyncRoute(async (_request, response) => {
    response.json(
      await Activity.find().populate('user', 'username displayName').sort({ completedAt: -1 }).lean(),
    );
  }),
);
app.get(
  '/api/leaderboard/',
  asyncRoute(async (_request, response) => {
    response.json(
      await Leaderboard.find()
        .populate('user', 'username displayName')
        .populate('team', 'name')
        .sort({ rank: 1 })
        .lean(),
    );
  }),
);
app.get(
  '/api/workouts/',
  asyncRoute(async (_request, response) => {
    response.json(await Workout.find().sort({ title: 1 }).lean());
  }),
);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' });
});

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening at ${baseUrl}`);
  });
}

void startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exitCode = 1;
});
