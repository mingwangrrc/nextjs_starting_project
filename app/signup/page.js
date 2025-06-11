import AuthForm from '@/components/auth-form';

export const metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <main>
      <h1>Sign Up</h1>
      <AuthForm submitText="Create Account" includeName />
    </main>
  );
}
