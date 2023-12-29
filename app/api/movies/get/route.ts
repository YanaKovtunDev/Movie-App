import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import { User } from '@/models/user.model';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const email = req.nextUrl.searchParams.get('email');
    if (!email) {
      return NextResponse.json({ message: 'No user found' }, { status: 400 });
    }
    const movies = await User.findOne({ email })?.populate('movies');
    if (!movies) {
      return NextResponse.json({ message: 'Your movie list is empty' }, { status: 400 });
    }
    return NextResponse.json(movies.movies);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
