import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styles from '../styles/FlipBook.module.css';

const preloadImages = (content, setImagesLoaded) => {
  let loaded = 0;
  if (content.length === 0) {
    setImagesLoaded(0);
    return;
  }
  
  content.forEach((item, index) => {
    const img = new Image();
    img.src = item.src;
    img.onload = () => {
      console.log(`✅ Image ${index + 1} loaded: ${item.src}`);
      loaded++;
      if (loaded === content.length) setImagesLoaded(content.length);
    };
    img.onerror = () => {
      console.error(`❌ Failed to load image ${index + 1}: ${item.src}`);
      loaded++;
      if (loaded === content.length) setImagesLoaded(content.length);
    };
  });
};

const Page = React.forwardRef(({ src, pageNumber }, ref) => (
  <div className={styles.page} ref={ref}>
    <div className={styles.pageContent}>
      <img
        src={src}
        alt={`Page ${pageNumber}`}
        className={styles.pageImage}
        onError={() => console.error(`❌ Page image failed to load: ${src}`)}
        onLoad={() => console.log(`✅ Page image loaded: ${src}`)}
      />
    </div>
  </div>
));

export default function FlipBook({ content = [] }) {
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [contentKey, setContentKey] = useState(0);

  useEffect(() => {
    console.log('🔄 Content changed, length:', content.length);
    console.log('🖼️ Content to display:', content);
    
    if (content.length > 0) {
      setCurrentPage(0);
      setTotalPages(content.length);
      setImagesLoaded(0);
      preloadImages(content, setImagesLoaded);
      setContentKey(prev => prev + 1); // Force re-render
    } else {
      setCurrentPage(0);
      setTotalPages(0);
      setImagesLoaded(0);
    }
  }, [content]);

  const handleFlip = (e) => setCurrentPage(e.data);
  const nextPage = () => flipBookRef.current?.pageFlip().flipNext();
  const prevPage = () => flipBookRef.current?.pageFlip().flipPrev();

  if (!content.length) {
    return (
      <div className={styles.container}>
        <div className={styles.noContent}>
          <p>Select a subtopic to view content</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '70vh' 
    // , width: '50vw'
    , display: 'flex', flexDirection: 'column', alignItems: "centre" , justifyContent: "centre" , gap:".5rem" , padding:".5rem 0"}} >
      
      <HTMLFlipBook
        key={contentKey}
        ref={flipBookRef}
        width={Math.floor(window.innerWidth * 0.6)} 
        height={Math.floor(window.innerHeight * 0.7)} 
        onFlip={handleFlip}
        onInit={(e) => setTotalPages(e.object.getPageCount())}
        className={styles.flipBook}
        // style={{ height: '60vh'  }} 
        showCover
        maxShadowOpacity={0.5}
        mobileScrollSupport={true}
        usePortrait={true}
        swipeDistance={50}
      >
        {content.map((item, index) => (
          <Page 
            key={`${contentKey}-${index}`} 
            src={item.src} 
            pageNumber={index + 1}
          />
        ))}
      </HTMLFlipBook>

      <div className={styles.controls}>
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0 || imagesLoaded < content.length}
          className={styles.navButton}
        >
          Previous
        </button>
        <span className={styles.pageCounter}>
          {currentPage + 1} / {totalPages}
          {imagesLoaded < content.length && ' (Loading...)'}
        </span>
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages - 1 || imagesLoaded < content.length}
          className={styles.navButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}
