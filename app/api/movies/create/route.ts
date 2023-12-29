import { connectToDB } from '@/lib/mongoose';
import { User } from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { Movie } from '@/models/movie.model';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { title, year, poster, email } = await req.json();
    const userData = await User.findOne({ email }).select('_id');
    const createdMovie = await Movie.create({ title, year, poster, user: userData });
    await User.findByIdAndUpdate(userData, { $push: { movies: createdMovie._id } });

    return NextResponse.json({ message: 'Movie successfully added' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
