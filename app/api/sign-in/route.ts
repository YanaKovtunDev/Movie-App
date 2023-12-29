import { connectToDB } from '@/lib/mongoose';
import { User } from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  try {
    await connectToDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select('_id');
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred while registering the user', error });
  }
}
