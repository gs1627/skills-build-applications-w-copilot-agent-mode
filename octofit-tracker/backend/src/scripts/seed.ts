import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const seedKeyFilter = { seedKey: /^octofit-demo-/ };

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany(seedKeyFilter),
      Leaderboard.deleteMany(seedKeyFilter),
      Team.deleteMany(seedKeyFilter),
      User.deleteMany(seedKeyFilter),
      Workout.deleteMany(seedKeyFilter),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-runs',
        email: 'maya.rivera@octofit.example',
        displayName: 'Maya Rivera',
        seedKey: 'octofit-demo-user-maya',
      },
      {
        username: 'leo-cycles',
        email: 'leo.chen@octofit.example',
        displayName: 'Leo Chen',
        seedKey: 'octofit-demo-user-leo',
      },
      {
        username: 'amina-moves',
        email: 'amina.hassan@octofit.example',
        displayName: 'Amina Hassan',
        seedKey: 'octofit-demo-user-amina',
      },
      {
        username: 'noah-trains',
        email: 'noah.brooks@octofit.example',
        displayName: 'Noah Brooks',
        seedKey: 'octofit-demo-user-noah',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Outdoor miles and weekend trail adventures.',
        members: [users[0]._id, users[1]._id],
        seedKey: 'octofit-demo-team-trail-blazers',
      },
      {
        name: 'Pulse Squad',
        description: 'Consistent movement, one workout at a time.',
        members: [users[2]._id, users[3]._id],
        seedKey: 'octofit-demo-team-pulse-squad',
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { team: teams[1]._id } } },
    ]);

    const now = Date.now();
    await Activity.insertMany([
      {
        user: users[0]._id,
        activityType: 'Running',
        durationMinutes: 42,
        distanceKm: 6.8,
        points: 68,
        completedAt: new Date(now - 1_800_000),
        seedKey: 'octofit-demo-activity-maya-run',
      },
      {
        user: users[1]._id,
        activityType: 'Cycling',
        durationMinutes: 55,
        distanceKm: 18.2,
        points: 92,
        completedAt: new Date(now - 7_200_000),
        seedKey: 'octofit-demo-activity-leo-cycle',
      },
      {
        user: users[2]._id,
        activityType: 'Strength training',
        durationMinutes: 35,
        points: 56,
        completedAt: new Date(now - 10_800_000),
        seedKey: 'octofit-demo-activity-amina-strength',
      },
      {
        user: users[3]._id,
        activityType: 'Walking',
        durationMinutes: 48,
        distanceKm: 3.9,
        points: 48,
        completedAt: new Date(now - 14_400_000),
        seedKey: 'octofit-demo-activity-noah-walk',
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        points: 420,
        rank: 1,
        period: 'weekly',
        seedKey: 'octofit-demo-leaderboard-maya',
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        points: 385,
        rank: 2,
        period: 'weekly',
        seedKey: 'octofit-demo-leaderboard-leo',
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        points: 360,
        rank: 3,
        period: 'weekly',
        seedKey: 'octofit-demo-leaderboard-amina',
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        points: 315,
        rank: 4,
        period: 'weekly',
        seedKey: 'octofit-demo-leaderboard-noah',
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Energizing 20-Minute Run',
        description: 'A steady run with a short warm-up and cool-down.',
        category: 'cardio',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['5-minute warm-up walk', '10-minute easy run', '5-minute cool-down'],
        seedKey: 'octofit-demo-workout-easy-run',
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'A balanced bodyweight circuit for building strength.',
        category: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
        seedKey: 'octofit-demo-workout-strength-circuit',
      },
      {
        title: 'Recovery and Mobility',
        description: 'Gentle stretches to support recovery and flexibility.',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 15,
        exercises: ['Cat-cow stretch', 'Hip flexor stretch', 'Child pose'],
        seedKey: 'octofit-demo-workout-mobility',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding octofit_db:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
