"use client";
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth-form';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = ({ username, password }) => {
    if (typeof window === 'undefined') return;
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('users') || '[]');
    } catch {
      users = [];
    }
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      alert('Invalid username or password');
      return;
    }
    const loginDate = new Date().toISOString();
    user.lastLogin = loginDate;
    localStorage.setItem('loginDate', loginDate);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ username: user.username, name: user.name, loginDate })
    );
    window.dispatchEvent(new Event('userChange'));
    router.push('/');
  };

  return (
    <main>
      <h1>Login</h1>
      <AuthForm
        submitText="Login"
        includeUsername
        includeEmail={false}
        onSubmit={handleLogin}
      />
    </main>
  );
}

