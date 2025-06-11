"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import classes from './main-header.module.css';

export default function MainHeader() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const updateUser = () => {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
          setUsername(JSON.parse(stored).username || '');
        } else {
          setUsername('');
        }
      } catch {
        setUsername('');
      }
    };

    updateUser();
    window.addEventListener('userChange', updateUser);
    return () => window.removeEventListener('userChange', updateUser);
  }, []);

  const handleSignOut = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('userChange'));
    router.push('/login');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <img src="/logo.png" alt="NextJS Logo" />
        </Link>
        {username && <span className={classes.username}>{username}</span>}
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/comments">Comments</Link>
          </li>
          <li>
            <Link href="/todos">Todos</Link>
          </li>
          <li>
            <Link href="/albums">Albums</Link>
          </li>
          {username ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className={classes.signOut}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
