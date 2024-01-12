import mongoose, { Document, Model } from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Post',
  }
);

export type IPost = {
  author: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
} & Document;

const PostModel: Model<IPost> =
  mongoose.models['Post'] || mongoose.model('Post', PostSchema);

export default PostModel;
