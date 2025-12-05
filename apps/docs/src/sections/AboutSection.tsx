import React from "react";
import { Typography, Space } from "@Juscash/design-system";

const { Title, Paragraph } = Typography;

export const AboutSection: React.FC = () => (
  <Space direction="vertical" size={16} style={{ width: "100%" }}>
    <Title level={2}>Sobre o Juscash Design System</Title>
    <Paragraph>
      Biblioteca proprietária construída sobre o Ant Design 6 e icons Lucide
      para garantir consistência em aplicações Next.js e React.
    </Paragraph>
    <Paragraph>
      Centralize tokens, componentes e documentação em um único pacote e evite
      dependências duplicadas do Ant Design nos projetos.
    </Paragraph>
  </Space>
);


