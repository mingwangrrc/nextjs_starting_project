"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import classes from './main-header.module.css';
import LanguageDropdown from './language-dropdown';

export default function MainHeader() {
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('en');
  const router = useRouter();

  const labels = {
    en: {
      home: 'Home',
      users: 'Users',
      posts: 'Posts',
      comments: 'Comments',
      todos: 'Todos',
      albums: 'Albums',
      supabase: 'Supabase',
      login: 'Login',
      signup: 'Sign Up',
      profile: 'Profile',
      signOut: 'Sign Out',
    },
    fr: {
      home: 'Accueil',
      users: 'Utilisateurs',
      posts: 'Articles',
      comments: 'Commentaires',
      todos: 'Tâches',
      albums: 'Albums',
      supabase: 'Supabase',
      login: 'Connexion',
      signup: "S'inscrire",
      profile: 'Profil',
      signOut: 'Déconnexion',
    },
  };
  const t = labels[language] || labels.en;

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

  useEffect(() => {
    const updateLanguage = () => {
      if (typeof window === 'undefined') return;
      const stored = localStorage.getItem('language');
      setLanguage(stored || 'en');
    };

    updateLanguage();
    window.addEventListener('languageChange', updateLanguage);
    return () => window.removeEventListener('languageChange', updateLanguage);
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
            <Link href="/">{t.home}</Link>
          </li>
          <li>
            <Link href="/users">{t.users}</Link>
          </li>
          <li>
            <Link href="/posts">{t.posts}</Link>
          </li>
          <li>
            <Link href="/comments">{t.comments}</Link>
          </li>
          <li>
            <Link href="/todos">{t.todos}</Link>
          </li>
          <li>
            <Link href="/albums">{t.albums}</Link>
          </li>
          <li>
            <Link href="/supabase">{t.supabase}</Link>
          </li>
          {username ? (
            <>
              <li>
                <Link href="/profile">{t.profile}</Link>
              </li>
              <li>
                <button onClick={handleSignOut} className={classes.signOut}>
                  {t.signOut}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">{t.login}</Link>
              </li>
              <li>
                <Link href="/signup">{t.signup}</Link>
              </li>
            </>
          )}
          <li>
            <LanguageDropdown />
          </li>
        </ul>
      </nav>
    </header>
  );
}
