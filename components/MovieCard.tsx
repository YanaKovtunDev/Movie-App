import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { IMovie } from '@/models/movie.model';

interface MovieCardProps {
  movie: IMovie;
}
const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();
  return (
    <div className="card-movie" onClick={() => router.push(`${ROUTES.MOVIES}/${movie._id}`)}>
      {movie?.poster ? (
        <img src={movie.poster} alt={movie.title} className="card-img" />
      ) : (
        <div className="card-img flex items-center justify-center">No poster added</div>
      )}
      <div className="p-4">
        <h5 className="text-white">{movie?.title}</h5>
        <p className="text-gray-300">{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
