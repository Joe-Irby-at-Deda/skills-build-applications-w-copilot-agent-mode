"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const db_1 = require("../db");
const models_1 = require("../models");
// Seed the octofit_db database with test data
async function seedDatabase() {
    await (0, db_1.connectToDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    await Promise.all([
        models_1.User.create([
            { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'captain' },
            { name: 'Liam Ortiz', email: 'liam.ortiz@example.com', role: 'member' },
            { name: 'Mina Patel', email: 'mina.patel@example.com', role: 'member' },
        ]),
        models_1.Team.create([
            { name: 'Power Striders', members: 8 },
            { name: 'Night Runners', members: 5 },
        ]),
        models_1.Activity.create([
            { type: 'run', duration: 32, distance: 5.4 },
            { type: 'cycle', duration: 47, distance: 12.1 },
            { type: 'swim', duration: 25, distance: 1.2 },
        ]),
        models_1.LeaderboardEntry.create([
            { name: 'Ava Chen', points: 2480 },
            { name: 'Liam Ortiz', points: 2210 },
            { name: 'Mina Patel', points: 2145 },
        ]),
        models_1.Workout.create([
            { title: 'Tempo Run', difficulty: 'intermediate' },
            { title: 'Core Strength', difficulty: 'beginner' },
            { title: 'Hill Intervals', difficulty: 'advanced' },
        ]),
    ]);
    console.log('Seed the octofit_db database with test data');
}
if (require.main === module) {
    seedDatabase()
        .then(() => process.exit(0))
        .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
