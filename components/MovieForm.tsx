import * as Yup from 'yup';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import UploadDnD from '@/app/upload-dnd/page';
import { IMovie } from '@/models/movie.model';
import ROUTES from '@/constants/routes';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  year: Yup.number().required('Required'),
});

interface MovieProps {
  movieData?: IMovie;
}

const MovieForm: FC<MovieProps> = ({ movieData }) => {
  const [error, setError] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (movieData) {
      setUploadedImageUrl(movieData?.poster || '');
    }
  }, [movieData]);

  return (
    <div className="flex py-20 justify-center">
      <Formik
        initialValues={{
          title: movieData?.title || '',
          year: movieData?.year || new Date().getFullYear(),
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values: any) => {
          try {
            const response = await fetch(`${ROUTES.API_MOVIES}/${movieData ? 'edit/' + movieData?._id : 'create'}`, {
              method: `${movieData ? 'PUT' : 'POST'}`,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...values,
                poster: uploadedImageUrl,
                email: data?.user?.email,
              }),
            });
            if (!response.ok) {
              const errorData = await response.json();
              setError(errorData.message);
            } else {
              setError('');
              router.push(ROUTES.MOVIES);
            }
          } catch (error: any) {
            setError(error.message);
          }
        }}
      >
        {({ isSubmitting }) => (
          <div className="flex flex-col w-full max-w-screen-xl">
            <h2 className="text-white mb-24">{movieData ? 'Edit' : 'Create a new movie'}</h2>
            <div className="flex gap-24">
              <div className="w-1/2 h-full">
                <UploadDnD updateImage={setUploadedImageUrl} imageUrl={uploadedImageUrl} />
              </div>
              <Form className="w-1/2">
                <div className="p-6 w-full max-w-sm">
                  <Field type="text" name="title" placeholder="Title" className="input-field" />
                  <ErrorMessage name="title" component="div" className="error-message" />

                  <Field
                    type="number"
                    name="year"
                    placeholder="Publishing year"
                    className="input-field mt-6 input-field-half"
                  />
                  <ErrorMessage name="year" component="div" className="error-message" />

                  <div className="flex gap-4 mt-12">
                    <button onClick={() => router.push(ROUTES.MOVIES)} className="button-default">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="button-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default MovieForm;
