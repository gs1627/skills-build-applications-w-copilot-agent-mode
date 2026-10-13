import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    seedKey: { type: String },
  },
  { timestamps: true },
);

userSchema.index({ seedKey: 1 }, { unique: true, sparse: true });

export const User = model('User', userSchema);
