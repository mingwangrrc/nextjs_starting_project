import Link from 'next/link';
import classes from './main-header.module.css';

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <img src="/logo.png" alt="NextJS Logo" />
        </Link>
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
          <li>
            <Link href="/photos">Photos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
