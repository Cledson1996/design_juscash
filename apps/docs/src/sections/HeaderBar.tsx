import React from "react";
import { Layout, Typography } from "@Juscash/design-system";
import { logoSrc } from "../utils/logo";

const { Header } = Layout;
const { Title, Text } = Typography;

export const HeaderBar: React.FC = () => (
  <Header
    style={{
      background: "#fff",
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 32px",
      borderBottom: "1px solid #f0f0f0"
    }}
  >
    <img src={logoSrc} alt="Juscash" style={{ width: 40 }} />
    <div>
      <Title level={4} style={{ margin: 0 }}>
        Juscash Design System
      </Title>
      <Text>
        Biblioteca oficial baseada em Ant Design 6 — componentes, tokens e boas
        práticas.
      </Text>
    </div>
  </Header>
);


