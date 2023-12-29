import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import ROUTES from '@/constants/routes';
import AuthForm from '@/components/AuthForm';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect(ROUTES.MOVIES);

  return <AuthForm />;
}
