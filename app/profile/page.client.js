"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthForm from '@/components/auth-form';

function ProfilePageClient() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState(null);
  const [originalUsername, setOriginalUsername] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const current = JSON.parse(localStorage.getItem('currentUser'));
      if (!current) {
        router.push('/login');
        return;
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existing = users.find((u) => u.username === current.username);
      if (!existing) {
        router.push('/login');
        return;
      }
      setInitialValues({
        name: existing.name,
        username: existing.username,
        email: existing.email,
        password: existing.password,
      });
      setOriginalUsername(existing.username);
    } catch {
      router.push('/login');
    }
  }, [router]);

  const handleSave = (values) => {
    if (typeof window === 'undefined') return;
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('users') || '[]');
    } catch {
      users = [];
    }
    const index = users.findIndex((u) => u.username === originalUsername);
    if (index === -1) {
      alert('User not found');
      return;
    }
    users[index] = { ...users[index], ...values };
    localStorage.setItem('users', JSON.stringify(users));
    const updated = users[index];
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ username: updated.username, name: updated.name, loginDate: updated.lastLogin || updated.signUpDate })
    );
    window.dispatchEvent(new Event('userChange'));
    router.push('/');
  };

  if (!initialValues) {
    return null;
  }

  return (
    <main>
      <h1>Edit Profile</h1>
      <AuthForm
        submitText="Save"
        includeName
        includeUsername
        initialValues={initialValues}
        onSubmit={handleSave}
        variant="filled"
      />
    </main>
  );
}

export default ProfilePageClient;
