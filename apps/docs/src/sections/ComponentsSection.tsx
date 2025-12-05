import React from "react";
import {
  Heading2,
  Heading4,
  Body1,
  Body2,
  Space,
  Card,
  Button,
} from "@Juscash/design-system";
import type { ComponentKey } from "../types/navigation";
import { ButtonsShowcase } from "./components/buttons";

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
        <Button type="secondary" onClick={() => onSelect(null)}>
          ← Voltar
        </Button>
        <ButtonsShowcase />
      </Space>
    );
  }

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <div>
        <Heading2>Componentes</Heading2>
        <Body1>
          Explore os componentes disponíveis. Clique para visualizar detalhes,
          tokens e exemplos completos.
        </Body1>
      </div>
      <Space size="large" wrap>
        <Card
          hoverable
          style={{ width: 280 }}
          onClick={() => onSelect("button")}
        >
          <Heading4>Button</Heading4>
          <Body2 style={{ color: "rgba(0,0,0,0.6)" }}>
            Botões baseados em Ant Design com variantes proprietárias.
          </Body2>
        </Card>
      </Space>
    </Space>
  );
};
