"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const sendCollection = async (res, collection, loader) => {
    try {
        const data = await loader();
        res.json({ apiUrl: baseUrl, collection, data });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `Failed to load ${collection}` });
    }
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiUrl: baseUrl });
});
app.get('/api/users', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'users', () => models_1.User.find({}).lean().exec());
});
app.get('/api/users/', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'users', () => models_1.User.find({}).lean().exec());
});
app.get('/api/teams', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'teams', () => models_1.Team.find({}).lean().exec());
});
app.get('/api/teams/', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'teams', () => models_1.Team.find({}).lean().exec());
});
app.get('/api/activities', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'activities', () => models_1.Activity.find({}).lean().exec());
});
app.get('/api/activities/', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'activities', () => models_1.Activity.find({}).lean().exec());
});
app.get('/api/leaderboard', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'leaderboard', () => models_1.LeaderboardEntry.find({}).lean().exec());
});
app.get('/api/leaderboard/', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'leaderboard', () => models_1.LeaderboardEntry.find({}).lean().exec());
});
app.get('/api/workouts', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'workouts', () => models_1.Workout.find({}).lean().exec());
});
app.get('/api/workouts/', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    await sendCollection(res, 'workouts', () => models_1.Workout.find({}).lean().exec());
});
async function startServer() {
    await (0, database_1.connectToDatabase)();
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
}
startServer().catch((error) => {
    console.error(error);
    process.exit(1);
});
