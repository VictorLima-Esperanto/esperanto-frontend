import { Button, Card, Divider, Typography } from 'antd';
import './LiveAgendaCard.css';
import type { LiveAgendaCardProps } from '@/types/components/LiveAgendaCardTypes';

const { Text } = Typography;

export default function LiveAgendaCard({
  nextLive,
  weekItems,
}: LiveAgendaCardProps) {
  const monthNames = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ];

  const today = new Date();
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <Card className="live-agenda-card" variant="borderless">
      <div className="live-agenda-content">
        <div className="live-agenda-left">
          <div className="live-info-row">
            {nextLive && (
              <div className="calendar-box">
                <div className="cal-day">{nextLive.getDate()}</div>
                <div className="cal-month">
                  {monthNames[nextLive.getMonth()]}
                </div>
              </div>
            )}

            <div className="live-info">
              <Text strong className="live-title">
                Próxima aula ao vivo
              </Text>

              {nextLive ? (
                <Text className="live-datetime">
                  {nextLive.toLocaleDateString('pt-BR', { weekday: 'long' })} —{' '}
                  {nextLive.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              ) : (
                <Text type="secondary">Nenhuma aula agendada</Text>
              )}
            </div>
          </div>

          {nextLive && (
            <Button type="primary" size="middle" className="reagendar-btn">
              Reagendar aula
            </Button>
          )}
        </div>

        <Divider type="vertical" className="full-vertical-divider" />

        {/* DIREITA */}
        <div className="live-agenda-right">
          {weekItems.map((item, idx) => {
            const isToday = isSameDay(item.date, today);

            return (
              <div
                key={idx}
                className={`agenda-item ${item.status || ''} ${
                  isToday ? 'today' : ''
                }`}
              >
                <div className="agenda-weekday-full">
                  {item.date.toLocaleDateString('pt-BR', { weekday: 'long' })}
                </div>

                <div className="agenda-day">{item.date.getDate()}</div>

                <div className={`agenda-status ${item.status || 'none'}`}>
                  {item.status === 'done'
                    ? '✔'
                    : item.status === 'live'
                      ? '🔴'
                      : ''}
                </div>

                {item.label && <div className="agenda-label">{item.label}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
