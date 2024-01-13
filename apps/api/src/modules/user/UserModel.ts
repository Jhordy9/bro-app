import mongoose, { Document, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      index: true,
    },
    password: {
      type: String,
      hidden: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'User',
  }
);

export type IUser = {
  name: string;
  email: string;
  password: string;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
  lastPostDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
} & Document;

UserSchema.pre<IUser>('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

const UserModel: Model<IUser> =
  mongoose.models['User'] || mongoose.model('User', UserSchema);

export default UserModel;
