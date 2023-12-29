import mongoose, { Schema, ObjectId } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  password: string;
  rememberMe?: boolean;
  movies: Array<ObjectId>;
};

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rememberMe: Boolean,
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ],
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
