import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ROUTES from '@/constants/routes';
import AuthForm from '@/components/AuthForm';

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) redirect(ROUTES.MOVIES);

  return (
    <div className="h-screen bg-background">
      <AuthForm isSignUp />
    </div>
  );
}
