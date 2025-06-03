import { useRouter } from 'next/router';
import styles from '../styles/Timeline.module.css';

export default function Timeline({ timelineData }) {
  const router = useRouter();

  const handleTimelineClick = (topicId) => {
    router.push(`/topic/${topicId}`);
  };

  return (
    <section className={styles.sectionTimeline}>
      <div className={styles.container}>
        <ul className={styles.timeline}>
          {timelineData.map((item, index) => (
            <li 
              key={item.id} 
              className={styles.timelineItem}
              onClick={() => handleTimelineClick(item.id)}
            >
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
