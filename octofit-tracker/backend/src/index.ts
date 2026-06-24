import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

const sendCollection = async (
  res: Response,
  collection: string,
  loader: () => Promise<unknown[]>,
) => {
  try {
    const data = await loader();
    res.json({ apiUrl: baseUrl, collection, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to load ${collection}` });
  }
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', apiUrl: baseUrl });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'users', () => User.find({}).lean().exec());
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'users', () => User.find({}).lean().exec());
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'teams', () => Team.find({}).lean().exec());
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'teams', () => Team.find({}).lean().exec());
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'activities', () => Activity.find({}).lean().exec());
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'activities', () => Activity.find({}).lean().exec());
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'leaderboard', () => LeaderboardEntry.find({}).lean().exec());
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'leaderboard', () => LeaderboardEntry.find({}).lean().exec());
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'workouts', () => Workout.find({}).lean().exec());
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  await connectToDatabase();
  await sendCollection(res, 'workouts', () => Workout.find({}).lean().exec());
});

async function startServer(): Promise<void> {
  await connectToDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
}

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
