import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, trim: true }],
    seedKey: { type: String },
  },
  { timestamps: true },
);

workoutSchema.index({ seedKey: 1 }, { unique: true, sparse: true });

export const Workout = model('Workout', workoutSchema);
