// src/components/LanguageBadge/LanguageBadge.tsx
import { Select, Avatar, Typography } from 'antd';

const { Text } = Typography;

export default function LanguageBadge() {
  const languages = [
    {
      id: 'spanish',
      name: 'Espanhol',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
      }}
    >
      <Text type="secondary" style={{ fontSize: 12, marginRight: 2 }}>
        Idioma do site
      </Text>

      <Select
        size="small"
        defaultValue={languages[0].id}
        style={{ width: 130 }}
        options={languages.map((lng) => ({
          value: lng.id,
          label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={lng.flag} size={16} style={{ marginRight: 6 }} />
              {lng.name}
            </div>
          ),
        }))}
      />
    </div>
  );
}
