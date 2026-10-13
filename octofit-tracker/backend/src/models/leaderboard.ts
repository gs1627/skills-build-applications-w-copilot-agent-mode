import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
    seedKey: { type: String },
  },
  { timestamps: true },
);

leaderboardSchema.index({ seedKey: 1 }, { unique: true, sparse: true });

export const Leaderboard = model('Leaderboard', leaderboardSchema);
