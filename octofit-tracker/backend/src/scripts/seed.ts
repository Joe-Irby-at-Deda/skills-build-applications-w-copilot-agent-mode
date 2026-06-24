import { connectToDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
export async function seedDatabase(): Promise<void> {
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await Promise.all([
    User.create([
      { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'captain' },
      { name: 'Liam Ortiz', email: 'liam.ortiz@example.com', role: 'member' },
      { name: 'Mina Patel', email: 'mina.patel@example.com', role: 'member' },
    ]),
    Team.create([
      { name: 'Power Striders', members: 8 },
      { name: 'Night Runners', members: 5 },
    ]),
    Activity.create([
      { type: 'run', duration: 32, distance: 5.4 },
      { type: 'cycle', duration: 47, distance: 12.1 },
      { type: 'swim', duration: 25, distance: 1.2 },
    ]),
    LeaderboardEntry.create([
      { name: 'Ava Chen', points: 2480 },
      { name: 'Liam Ortiz', points: 2210 },
      { name: 'Mina Patel', points: 2145 },
    ]),
    Workout.create([
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
