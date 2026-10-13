import { model, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    seedKey: { type: String },
  },
  { timestamps: true },
);

teamSchema.index({ seedKey: 1 }, { unique: true, sparse: true });

export const Team = model('Team', teamSchema);
