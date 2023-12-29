'use client';
import { LogOut, PlusCircle } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IMovie } from '@/models/movie.model';
import { useRouter } from 'next/navigation';
import EmptyList from '@/components/EmptyList';
import Layout from '@/components/Layout';
import ROUTES from '@/constants/routes';
import MovieCard from '@/components/MovieCard';

export default function Movies() {
  const { data } = useSession();
  const [error, setError] = useState('');
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchMovies = async () => {
    try {
      const response = await fetch(`${ROUTES.GET_MOVIES}?email=${data?.user?.email}`);

      if (!response.ok) {
        setError('Failed to fetch movies');
      }
      const moviesData = await response.json();
      setMovies(moviesData);
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data?.user?.email) {
      fetchMovies();
    }
  }, [data]);

  return (
    <Layout>
      {loading ? (
        <h5 className="flex items-center justify-center h-screen">Loading movies...</h5>
      ) : error ? (
        <div className="error-message">{`Error with fetching movies: ${error}`}</div>
      ) : !movies.length ? (
        <EmptyList />
      ) : (
        <div className="container mx-auto max-w-screen-xl pt-20 pb-48">
          <header className="flex justify-between items-center p-4 mb-20">
            <div className="flex items-center">
              <h1 className="text-5xl text-white me-3">My movies</h1>
              <PlusCircle className="cursor-pointer" size={32} onClick={() => router.push(ROUTES.CREATE_MOVIE)} />
            </div>
            <div className="flex items-center font-bold cursor-pointer" onClick={() => signOut()}>
              Logout <LogOut className="ms-2" />
            </div>
          </header>

          <div className="grid grid-cols-4 gap-6">
            {movies?.map((movie, key) => <MovieCard key={key} movie={movie} />)}
          </div>
        </div>
      )}
    </Layout>
  );
}
