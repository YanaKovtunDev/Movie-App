'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import MovieForm from '@/components/MovieForm';
import { IMovie } from '@/models/movie.model';
import Layout from '@/components/Layout';

export default function EditMovie() {
  const [error, setError] = useState('');
  const { id } = useParams();
  const { data } = useSession();
  const [movie, updateMovie] = useState<IMovie | undefined>(undefined);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`/api/movies/get/${id}`);

      if (!response.ok) {
        setError('Failed to fetch movie');
      }
      const moviesData = await response.json();
      updateMovie(moviesData?.movie);
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    }
  };
  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, [id]);

  return <Layout>{error ? <div className="error-message">{error}</div> : <MovieForm movieData={movie} />}</Layout>;
}
