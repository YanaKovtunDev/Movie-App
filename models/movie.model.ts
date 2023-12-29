import mongoose, { ObjectId, Schema } from 'mongoose';
import { IUser } from '@/models/user.model';

export type IMovie = {
  title: string;
  year: number;
  poster?: string;
  user: IUser;
  _id: ObjectId;
};

const MovieSchema = new Schema<IMovie>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  poster: { type: String, required: false },
});

export const Movie = mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);
