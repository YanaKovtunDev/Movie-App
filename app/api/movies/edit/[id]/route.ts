import { connectToDB } from '@/lib/mongoose';
import { Movie } from '@/models/movie.model';
import { NextResponse } from 'next/server';

export async function PUT(req: any, { params }: any) {
  try {
    await connectToDB();
    const { id } = params;
    const options = { new: true };
    const body = await req.json();
    await Movie.findByIdAndUpdate(id, body, options);
    return NextResponse.json({ message: 'Movie successfully updated' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
