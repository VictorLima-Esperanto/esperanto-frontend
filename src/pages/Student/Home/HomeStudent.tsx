import { useEffect, useState } from 'react';
import ChatButton from '@/components/ChatButton/ChatButton';
import Topbar from '@/components/Navigation/Topbar/Topbar';
import LiveAgendaCard from '@/components/LiveAgendaCard/LiveAgendaCard';
import Carousel from '@/components/Carousel/Carousel';
import { Card, Progress } from 'antd';
import './HomeStudent.css';

interface Lesson {
  id: string;
  title: string;
  summary: string;
  activities: string[];
  status: 'done' | 'current' | 'upcoming';
}

const lessons: Lesson[] = [
  {
    id: 'v1',
    title: 'Aula 1 - Saudações',
    summary: 'Aprenda a se apresentar e cumprimentar.',
    activities: ['Leitura', 'Áudio'],
    status: 'done',
  },
  {
    id: 'v2',
    title: 'Aula 2 - Pronomes',
    summary: 'Aprenda os pronomes e como usá-los.',
    activities: ['Leitura', 'Quiz'],
    status: 'current',
  },
  {
    id: 'v3',
    title: 'Aula 3 - Frases',
    summary: 'Pratique frases comuns do dia a dia.',
    activities: ['Áudio', 'Exercícios'],
    status: 'upcoming',
  },
];

export default function HomeStudent() {
  const [nextLive, setNextLive] = useState<Date | null>(null);
  const [weekItems, setWeekItems] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState(
    lessons.findIndex((l) => l.status === 'current') || 0,
  );

  useEffect(() => {
    setNextLive(new Date(Date.now() + 1000 * 60 * 60 * 24));

    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());

    const items = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);

      return {
        date: d,
        label: i === 1 ? 'Aula 1 completa' : i === 2 ? 'Aula ao vivo' : '',
        status: i === 2 ? 'live' : i === 1 ? 'done' : 'none',
      };
    });

    setWeekItems(items);
  }, []);

  const progressPercent = Math.round(
    ((lessons.filter((l) => l.status === 'done').length + 1) / lessons.length) *
      100,
  );

  return (
    <div className="home-student-container">
      <Topbar />
      <LiveAgendaCard nextLive={nextLive} weekItems={weekItems} />

      <Card
        className="module-card"
        title={lessons[currentIndex].title}
        bordered
      >
        <Carousel
          items={lessons}
          initialIndex={currentIndex}
          renderItem={(lesson: Lesson, isCenter) => (
            <div className="lesson-card-content">
              <h3>{lesson.title}</h3>
              {isCenter && (
                <>
                  <p>{lesson.summary}</p>
                  <p>Atividades: {lesson.activities.join(', ')}</p>
                  <button className="btn-continue">Continuar Aula</button>
                </>
              )}
            </div>
          )}
        />

        <Progress
          percent={progressPercent}
          showInfo={true}
          strokeColor="#1890ff"
          style={{ marginTop: '50px' }}
        />
      </Card>

      <ChatButton onOpen={() => console.log('abrir chat')} unread={0} />
    </div>
  );
}
