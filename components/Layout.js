// import styles from '../styles/globals.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>Timeline Learning Platform</h1>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2025 Timeline Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
