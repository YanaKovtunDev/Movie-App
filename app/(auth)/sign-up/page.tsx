import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ROUTES from '@/constants/routes';
import AuthForm from '@/components/AuthForm';
import authOptions from '@/app/api/auth/[...nextauth]/options';

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) redirect(ROUTES.MOVIES);

  return (
    <div className="h-screen bg-background">
      <AuthForm isSignUp />
    </div>
  );
}
