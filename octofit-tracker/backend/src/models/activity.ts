import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
    seedKey: { type: String },
  },
  { timestamps: true },
);

activitySchema.index({ seedKey: 1 }, { unique: true, sparse: true });

export const Activity = model('Activity', activitySchema);
