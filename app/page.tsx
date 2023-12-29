import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import LoginForm from '@/components/LoginForm';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect('/movies');

  return <LoginForm />;
}
