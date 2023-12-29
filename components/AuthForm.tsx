'use client';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import ROUTES from '@/constants/routes';
import { signIn } from 'next-auth/react';
import API from '@/constants/api';

type AuthProps = {
  isSignUp?: boolean;
};
const AuthForm: FC<AuthProps> = ({ isSignUp }) => {
  const [error, setError] = useState('');
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    ...(isSignUp && { name: Yup.string().required('Required') }),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: any) => {
    if (isSignUp) {
      try {
        const response = await fetch(API.SIGN_UP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
        } else {
          setError('');
          await router.push(ROUTES.MOVIES);
        }
      } catch (error: any) {
        setError(error);
      }
    } else {
      try {
        const response = await signIn('credentials', {
          ...values,
          redirect: true,
        });
        if (response?.error) {
          setError('Invalid Credentials');
          return;
        }
        router.replace(ROUTES.MOVIES);
      } catch (error: any) {
        setError(error);
      }
    }
  };

  return (
    <Formik
      initialValues={isSignUp ? { name: '', email: '', password: '' } : { name: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ isSubmitting }) => (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-white mb-6">{isSignUp ? 'Sign up' : 'Sign in'}</h1>
          <Form>
            <div className="p-6 w-full max-w-xs">
              {isSignUp && (
                <>
                  <Field type="text" name="name" placeholder="User name" className="input-field" />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </>
              )}

              <Field type="email" name="email" placeholder="Email" className="input-field mt-6" />
              <ErrorMessage name="email" component="div" className="error-message" />

              <Field type="password" name="password" placeholder="Password" className="input-field mt-6" />
              <ErrorMessage name="password" component="div" className="error-message" />

              <button type="submit" disabled={isSubmitting} className="button-primary mt-6">
                {isSignUp ? 'Register' : 'Login'}
              </button>
            </div>
          </Form>
          <div>
            {isSignUp ? 'Already have an account?' : 'Don`t have an account yet?'}
            <Link href={isSignUp ? ROUTES.HOME : ROUTES.SIGN_UP} className="font-bold ms-2">
              {isSignUp ? 'Sign in' : 'Sign up'}
            </Link>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </Formik>
  );
};

export default AuthForm;
