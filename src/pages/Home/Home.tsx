// src/pages/Home/HomeStudent.tsx
import { Card, Typography, Row, Col, Button, Progress, Divider } from "antd";
import { useAuth } from "@/contexts/Auth/AuthContext";
import { useEffect, useState } from "react";
import "./Home.css";

const { Title, Text } = Typography;

interface Video {
  id: string;
  title: string;
  url: string;
}

interface Module {
  id: string;
  title: string;
  videos: Video[];
}

export default function HomeStudent() {
  const { user } = useAuth();
  const [nextLiveClass, setNextLiveClass] = useState<Date | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [weekSchedule, setWeekSchedule] = useState<Date[]>([]);

  // Simulando fetch de dados
  useEffect(() => {
    // Próxima aula ao vivo
    setNextLiveClass(new Date(Date.now() + 1000 * 60 * 60 * 24)); // 1 dia depois

    // Módulo atual
    setCurrentModule({
      id: "mod1",
      title: "Módulo 1 - Introdução ao Esperanto",
      videos: [
        { id: "vid1", title: "Aula 1 - Saudações", url: "#" },
        { id: "vid2", title: "Aula 2 - Pronomes e Verbos", url: "#" },
        { id: "vid3", title: "Aula 3 - Frases Básicas", url: "#" },
        { id: "vid4", title: "Aula 4 - Perguntas Comuns", url: "#" },
      ],
    });

    // Simulando progresso do estudante
    setCurrentVideoIndex(1);

    // Simulando calendário da semana
    const today = new Date();
    const schedule: Date[] = [];
    for (let i = 0; i < 7; i++) {
      schedule.push(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
      );
    }
    setWeekSchedule(schedule);
  }, []);

  const handleVideoClick = (index: number) => {
    setCurrentVideoIndex(index);
    // Atualizar API / storage com progresso
  };

  const moduleProgress =
    currentModule && currentModule.videos.length > 0
      ? Math.round(
          ((currentVideoIndex + 1) / currentModule.videos.length) * 100
        )
      : 0;

  return (
    <div className="home-student-container">
      {/* Boas-vindas */}
      <Card className="home-welcome-card">
        <Title level={3}>Olá, {user?.name}!</Title>
        <Text type="secondary">Bem-vindo ao seu painel de estudos</Text>
      </Card>

      {/* Próxima aula ao vivo */}
      <Card className="home-next-class-card">
        <Title level={4}>Próxima Aula ao Vivo</Title>
        {nextLiveClass ? (
          <Text strong>
            {nextLiveClass.toLocaleDateString()} às{" "}
            {nextLiveClass.toLocaleTimeString()}
          </Text>
        ) : (
          <Text>Nenhuma aula agendada</Text>
        )}
      </Card>

      {/* Calendário da semana */}
      <Card className="home-calendar-card">
        <Title level={5}>Agenda da Semana</Title>
        <Row gutter={16} className="calendar-row">
          {weekSchedule.map((day, index) => (
            <Col key={index} className="calendar-day">
              <Text strong>
                {day.toLocaleDateString("pt-BR", { weekday: "short" })}
              </Text>
              <Text>
                {day.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })}
              </Text>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Progresso do módulo */}
      {currentModule && (
        <Card className="home-module-card">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={4}>{currentModule.title}</Title>
            </Col>
            <Col>
              <Text strong>Progresso do módulo:</Text>
              <Progress percent={moduleProgress} size="small" />
            </Col>
          </Row>

          <Divider />

          {/* Linha de vídeos */}
          <Row className="videos-row">
            {currentModule.videos.map((video, index) => {
              let cardClass = "video-card";
              if (index === currentVideoIndex) cardClass += " current-video";
              else if (index === currentVideoIndex - 1)
                cardClass += " last-video";
              else if (index === currentVideoIndex + 1)
                cardClass += " next-video";

              return (
                <Col key={video.id}>
                  <Card
                    hoverable
                    className={cardClass}
                    onClick={() => handleVideoClick(index)}
                  >
                    <Text strong>{video.title}</Text>
                    {index === currentVideoIndex && (
                      <Text type="secondary">Assistindo agora</Text>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card>
      )}

      {/* Próximo módulo */}
      <Card className="home-next-module-card">
        <Title level={5}>Continue seu aprendizado</Title>
        <Text>
          Recomendamos que você avance para o próximo módulo após concluir este.
        </Text>
        <Button type="primary">Próximo Módulo</Button>
      </Card>
    </div>
  );
}
