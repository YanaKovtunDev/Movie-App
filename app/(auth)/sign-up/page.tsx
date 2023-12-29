import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignUpForm from '@/components/RegisterForm';

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/movies');

  return (
    <div className="h-screen bg-background">
      <SignUpForm />
    </div>
  );
}
