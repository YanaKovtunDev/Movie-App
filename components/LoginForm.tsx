'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const [error, setError] = useState('');

  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values: any) => {
        try {
          const response = await signIn('credentials', {
            ...values,
            redirect: true,
          });
          if (response?.error) {
            setError('Invalid Credentials');
            return;
          }
          router.replace('/movies');
        } catch (error: any) {
          setError(error);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-white mb-6">Sign in</h1>
          <Form className="">
            <div className="p-6 w-full max-w-xs">
              <Field type="email" name="email" placeholder="Email" className="input-field" />
              <ErrorMessage name="email" component="div" className="error-message" />

              <Field type="password" name="password" placeholder="Password" className="input-field mt-6" />
              <ErrorMessage name="password" component="div" className="error-message" />

              <button type="submit" disabled={isSubmitting} className="button-primary mt-6">
                Login
              </button>
            </div>
          </Form>
          <div>
            Don`t have an account yet?
            <Link href={'/sign-up'} className="font-bold ms-2">
              Sign up
            </Link>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
