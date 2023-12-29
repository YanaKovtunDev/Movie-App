import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import ROUTES from '@/constants/routes';
import AuthForm from '@/components/AuthForm';
import authOptions from '@/app/api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect(ROUTES.MOVIES);

  return <AuthForm />;
}
