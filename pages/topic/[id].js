import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TopicList from '../../components/TopicList';
import FlipBook from '../../components/FlipBook';
import { timelineData } from '../../data/content';
import styles from '../../styles/TopicPage.module.css';

export default function TopicPage() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [topicData, setTopicData] = useState(null);

  useEffect(() => {
    if (id) {
      const topic = timelineData.find(t => t.id === parseInt(id));
      if (topic) {
        setTopicData(topic);
        setSelectedSubtopic(topic.subtopics[0]);
      }
    }
  }, [id]);

  const handleTopicSelect = (subtopic) => {
    setSelectedSubtopic(subtopic);
  };

  if (!topicData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.topicPage}>
      <div className={styles.sidebar}>
        <TopicList 
          subtopics={topicData.subtopics}
          onTopicSelect={handleTopicSelect}
          selectedTopic={selectedSubtopic?.id}
        />
      </div>
      <div className={styles.content}>
        <FlipBook content={selectedSubtopic?.content || []} />
      </div>
    </div>
  );
}
