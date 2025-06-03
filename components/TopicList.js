import styles from '../styles/TopicList.module.css';

export default function TopicList({ subtopics, onTopicSelect, selectedTopic }) {
  return (
    <div className={styles.topicList}>
      <h3>Topics</h3>
      <ul>
        {subtopics.map((subtopic) => (
          <li 
            key={subtopic.id}
            className={selectedTopic === subtopic.id ? styles.active : ''}
            onClick={() => onTopicSelect(subtopic)}
          >
            {subtopic.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
