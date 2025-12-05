import React from "react";
import { Typography, Space, Card } from "@Juscash/design-system";

const { Title, Paragraph } = Typography;

export const TokensSection: React.FC = () => (
  <Space direction="vertical" size={16} style={{ width: "100%" }}>
    <Title level={2}>Design Tokens</Title>
    <Paragraph>
      Em breve: documentação com cores, espaçamentos, radius, sombras e
      breakpoints. Enquanto isso, utilize os exports do pacote:
      <code>designSystemColors</code>, <code>spacing</code>,{" "}
      <code>radius</code>, <code>breakpoints</code> e <code>shadow</code>.
    </Paragraph>
    <Card>
      <Paragraph>
        Exemplo de import:
        <pre
          style={{
            background: "#f5f5f5",
            padding: 12,
            borderRadius: 6,
            overflowX: "auto",
            fontSize: 12
          }}
        >{`import {
  designSystemColors,
  spacing,
  radius,
  breakpoints
} from '@Juscash/design-system';`}</pre>
      </Paragraph>
    </Card>
  </Space>
);


