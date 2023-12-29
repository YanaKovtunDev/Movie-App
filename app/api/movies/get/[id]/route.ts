import { connectToDB } from '@/lib/mongoose';
import { Movie } from '@/models/movie.model';
import { NextResponse } from 'next/server';

export async function GET(req: any, { params }: any) {
  try {
    await connectToDB();
    const { id } = params;

    const movie = await Movie.findOne({ _id: id });
    return NextResponse.json({ movie }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
