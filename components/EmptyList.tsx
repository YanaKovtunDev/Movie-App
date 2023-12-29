import { useRouter } from 'next/navigation';

const EmptyList = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-white mb-6">Your movie list is empty</h1>
      <div>
        <button className="button-primary mt-6" onClick={() => router.push('/movies/create')}>
          Add a new movie
        </button>
      </div>
    </div>
  );
};

export default EmptyList;
