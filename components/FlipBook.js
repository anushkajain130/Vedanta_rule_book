import { useState, useEffect } from 'react';
import styles from '../styles/FlipBook.module.css';

export default function FlipBook({ content = [] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextPage = () => {
    if (currentPage < content.length - 2 && !isFlipping) {
      setIsFlipping(true);
      setCurrentPage(currentPage + 2);
      setTimeout(() => setIsFlipping(false), 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setCurrentPage(currentPage - 2);
      setTimeout(() => setIsFlipping(false), 800);
    }
  };

  if (!content || content.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noContent}>
          <p>Select a topic to view content</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.page} id="first">
        <div className={styles.back}>
          <div className={styles.outer}>
            <div className={styles.content}>
              {content[currentPage] && (
                <img src={content[currentPage].src} alt="Page content" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className={`${styles.page} ${isFlipping ? styles.flipping : ''}`} 
        id="second"
      >
        <div className={styles.front}>
          <div className={styles.outer}>
            <div className={styles.content}>
              {content[currentPage] && (
                <img src={content[currentPage].src} alt="Page content" />
              )}
            </div>
          </div>
        </div>
        <div className={styles.back} id="third">
          <div className={styles.outer}>
            <div className={styles.content}>
              <div className={styles.helperClass}>
                {content[currentPage + 1] && (
                  <img src={content[currentPage + 1].src} alt="Page content" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.page} id="fourth">
        <div className={styles.front}>
          <div className={styles.outer}>
            <div className={styles.content}>
              {content[currentPage + 1] && (
                <img src={content[currentPage + 1].src} alt="Page content" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div 
        className={styles.prev} 
        onClick={prevPage}
        style={{ opacity: currentPage > 0 ? 1 : 0.3 }}
      ></div>
      <div 
        className={styles.next} 
        onClick={nextPage}
        style={{ opacity: currentPage < content.length - 2 ? 1 : 0.3 }}
      ></div>
    </div>
  );
}
