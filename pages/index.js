import Timeline from '../components/Timeline';
import { timelineData } from '../data/content';

export default function Home() {
  return (
    <div className="home-page">
      <Timeline timelineData={timelineData} />
    </div>
  );
}
