import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import { User } from '@/models/user.model';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    await connectToDB();
    const user = await User.findOne({ email }).select('_id');

    if (user) {
      return NextResponse.json({ message: 'User already exists!' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: 'User is successfully registered' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
