import React from "react";
import { Typography, Space, Card } from "@Juscash/design-system";
import type { ComponentKey } from "../types/navigation";
import { ButtonsShowcase } from "./components/buttons";

const { Title, Paragraph } = Typography;

export interface ComponentsSectionProps {
  selectedComponent: ComponentKey | null;
  onSelect: (component: ComponentKey | null) => void;
}

export const ComponentsSection: React.FC<ComponentsSectionProps> = ({
  selectedComponent,
  onSelect,
}) => {
  if (selectedComponent === "button") {
    return (
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Card hoverable style={{ width: 140 }} onClick={() => onSelect(null)}>
          ← Voltar
        </Card>
        <ButtonsShowcase />
      </Space>
    );
  }

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <div>
        <Title level={2}>Componentes</Title>
        <Paragraph>
          Explore os componentes disponíveis. Clique para visualizar detalhes,
          tokens e exemplos completos.
        </Paragraph>
      </div>
      <Space size="large" wrap>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("button")}
        >
          <Title level={4}>Button</Title>
          <Paragraph type="secondary">
            Botões baseados em Ant Design com variantes proprietárias.
          </Paragraph>
        </Card>
      </Space>
    </Space>
  );
};
