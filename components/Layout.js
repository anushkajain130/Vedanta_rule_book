// import styles from '../styles/globals.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>Vedanta Mining Rulebook</h1>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2025 Vedanta Limited. All rights reserved.</p>
      </footer>
    </div>
  );
}
