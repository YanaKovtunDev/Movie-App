'use client';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export default function SignUpForm() {
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values: any) => {
        try {
          const response = await fetch('api/sign-up', {
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
            await router.push('movies');
          }
        } catch (error: any) {
          setError(error);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-white mb-6">Sign up</h1>
          <Form className="">
            <div className="p-6 w-full max-w-xs">
              <Field type="text" name="name" placeholder="User name" className="input-field" />
              <ErrorMessage name="email" component="div" className="error-message" />

              <Field type="email" name="email" placeholder="Email" className="input-field mt-6" />
              <ErrorMessage name="email" component="div" className="error-message" />

              <Field type="password" name="password" placeholder="Password" className="input-field mt-6" />
              <ErrorMessage name="password" component="div" className="error-message" />

              <button type="submit" disabled={isSubmitting} className="button-primary mt-6">
                Register
              </button>
            </div>
          </Form>
          <div>
            Already have an account?
            <Link href={'/'} className="font-bold ms-2">
              Sign in
            </Link>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </Formik>
  );
}
