"use client";
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth-form';

export const metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = (values) => {
    if (typeof window === 'undefined') return;
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('users') || '[]');
    } catch {
      users = [];
    }
    const signUpDate = new Date().toISOString();
    const user = { ...values, signUpDate };
    users.push(user);
    localStorage.setItem('signUpDate', signUpDate);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ username: user.username, name: user.name, loginDate: signUpDate })
    );
    window.dispatchEvent(new Event('userChange'));
    router.push('/');
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <AuthForm
        submitText="Create Account"
        includeName
        includeUsername
        onSubmit={handleSignUp}
      />
    </main>
  );
}
