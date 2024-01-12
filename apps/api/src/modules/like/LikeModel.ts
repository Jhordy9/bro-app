import mongoose, { Document, Model, Types } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      description: 'User that liked.',
      required: true,
      index: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      index: true,
    },
  },
  {
    collection: 'Like',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export interface ILike extends Document {
  user: mongoose.Schema.Types.ObjectId;
  post?: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LikeModel: Model<ILike> =
  mongoose.models['Like'] || mongoose.model('Like', Schema);

export default LikeModel;
