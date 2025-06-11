import AuthForm from '@/components/auth-form';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <AuthForm submitText="Login" includeUsername includeEmail={false} />
    </main>
  );
}
