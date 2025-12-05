import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Space,
  Typography,
  LucideIcons
} from "@Juscash/design-system";

const { Title, Paragraph, Text } = Typography;

type ButtonVariant = NonNullable<
  React.ComponentProps<typeof Button>["type"]
>;
const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "neutral",
  "outlined",
  "ghost",
  "destructive",
  "default",
  "dashed",
  "link",
  "text"
];

const buttonSizes: NonNullable<
  React.ComponentProps<typeof Button>["dsSize"]
>[] = ["xs", "s", "m"];

interface DemoCardProps {
  title: string;
  description: string;
  renderButtons: () => React.ReactNode;
  usageText: string;
}

const DemoCard: React.FC<DemoCardProps> = ({
  title,
  description,
  renderButtons,
  usageText
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <Card
      title={title}
      extra={
        <Button type="link" onClick={() => setShowCode((prev) => !prev)}>
          {showCode ? "Ocultar exemplo" : "Exemplo de uso"}
        </Button>
      }
      style={{ width: "100%" }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Paragraph>{description}</Paragraph>
        {renderButtons()}
        <Divider plain>
          <Text strong>Utilização</Text>
        </Divider>
        <Paragraph>{usageText}</Paragraph>
        {showCode && (
          <pre
            style={{
              background: "#f5f5f5",
              padding: 16,
              borderRadius: 8,
              overflowX: "auto",
              fontSize: 12,
              width: "100%"
            }}
          >{`import { Button } from '@Juscash/design-system';\n\nfunction Example() {\n  return (\n${renderButtonsCode(renderButtons)}\n  );\n}`}</pre>
        )}
      </Space>
    </Card>
  );
};

const renderButtonsCode = (renderer: () => React.ReactNode) => {
  const match = renderer.toString().match(/return\s*\(([\s\S]*)\)/);
  if (!match) return "    <>...</>";
  return match[1]
    .split("\n")
    .map((line) => `    ${line.trimEnd()}`)
    .join("\n")
    .trim();
};

const TypesDemo = () => (
  <DemoCard
    title="Todos os tipos"
    description="Variedade de tipos suportados pelo Button."
    usageText="Passe a prop type com os valores: primary, secondary, neutral, outlined, ghost, destructive, default, dashed, link ou text."
    renderButtons={() => (
      <Space size="small" wrap>
        {buttonVariants.map((variant) => (
          <Button key={variant} type={variant}>
            {variant}
          </Button>
        ))}
      </Space>
    )}
  />
);

const SizesDemo = () => (
  <DemoCard
    title="Tamanhos"
    description="Exemplo com o tipo primary nos tamanhos XS, S e M."
    usageText="Use a prop dsSize com os valores xs, s ou m."
    renderButtons={() => (
      <Space size="small" wrap>
        {buttonSizes.map((size) => (
          <Button key={size} type="primary" dsSize={size}>
            Primary {size}
          </Button>
        ))}
      </Space>
    )}
  />
);

const IconsDemo = () => (
  <DemoCard
    title="Com ícones"
    description="Botões com ícones do pacote Lucide (reexportado pelo design system)."
    usageText="Use o slot children para renderizar ícones, ex.: <LucideIcons.Star />."
    renderButtons={() => (
      <Space size="small" wrap>
        {["Star", "Bell", "Settings"].map((icon) => {
          const Icon = (LucideIcons as any)[icon];
          return (
            <Button key={icon} type="secondary" dsSize="s">
              <Space size={4}>
                <Icon size={16} />
                {icon}
              </Space>
            </Button>
          );
        })}
      </Space>
    )}
  />
);

const StatesDemo = () => (
  <DemoCard
    title="Estados"
    description="Demonstração de estados comuns (loading, disabled, etc.)."
    usageText="Use as props loading, disabled ou outras props nativas do Ant Design."
    renderButtons={() => (
      <Space size="small" wrap>
        <Button type="primary" loading>
          Carregando
        </Button>
        <Button type="primary" disabled>
          Disabled
        </Button>
        <Button type="secondary">Normal</Button>
      </Space>
    )}
  />
);

export const ButtonsShowcase: React.FC = () => (
  <Space direction="vertical" size={24} style={{ width: "100%" }}>
    <Title level={2}>Button</Title>
    <Paragraph>
      Botões do design system com tipos, tamanhos, ícones e estados personalizados.
    </Paragraph>
    <TypesDemo />
    <SizesDemo />
    <IconsDemo />
    <StatesDemo />
  </Space>
);

