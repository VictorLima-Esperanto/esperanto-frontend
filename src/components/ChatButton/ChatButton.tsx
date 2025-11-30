import { Badge } from "antd";
import { MessageOutlined } from '@ant-design/icons';
import "./ChatButton.css";

interface Props { onOpen: () => void; unread?: number }

export default function ChatButton({ onOpen, unread = 0 }: Props) {
  return (
    <div className="chat-button" onClick={onOpen} role="button" aria-label="Abrir chat">
      <Badge count={unread} size="small">
        <MessageOutlined style={{ fontSize: 20 }} />
      </Badge>
    </div>
  );
}
