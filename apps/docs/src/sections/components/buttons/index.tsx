import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Space,
  Typography,
  LucideIcons,
} from "@Juscash/design-system";

const { Title, Paragraph, Text } = Typography;

type ButtonVariant = NonNullable<React.ComponentProps<typeof Button>["type"]>;
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
  "text",
];

const buttonSizes: NonNullable<
  React.ComponentProps<typeof Button>["dsSize"]
>[] = ["xs", "s", "m"];

interface DemoCardProps {
  title: string;
  description: string;
  renderButtons: () => React.ReactNode;
  usageText: string;
  codeExample: string;
}

const DemoCard: React.FC<DemoCardProps> = ({
  title,
  description,
  renderButtons,
  usageText,
  codeExample,
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
              width: "100%",
            }}
          >
            {codeExample}
          </pre>
        )}
      </Space>
    </Card>
  );
};

const typesCode = `import { Button, Space } from '@Juscash/design-system';

export function ButtonTypes() {
  return (
    <Space wrap>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="neutral">Neutral</Button>
      <Button type="outlined">Outlined</Button>
      <Button type="ghost">Ghost</Button>
      <Button type="destructive">Destructive</Button>
      <Button type="default">Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
      <Button type="text">Text</Button>
    </Space>
  );
}`;

const TypesDemo = () => (
  <DemoCard
    title="Todos os tipos"
    description="Variedade de tipos suportados pelo Button."
    usageText="Passe a prop type com os valores: primary, secondary, neutral, outlined, ghost, destructive, default, dashed, link ou text."
    codeExample={typesCode}
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

const sizesCode = `import { Button, Space } from '@Juscash/design-system';

export function ButtonSizes() {
  return (
    <Space wrap>
      <Button type="primary" dsSize="xs">Primary xs</Button>
      <Button type="primary" dsSize="s">Primary s</Button>
      <Button type="primary" dsSize="m">Primary m</Button>
    </Space>
  );
}`;

const SizesDemo = () => (
  <DemoCard
    title="Tamanhos"
    description="Exemplo com o tipo primary nos tamanhos XS, S e M."
    usageText="Use a prop dsSize com os valores xs, s ou m."
    codeExample={sizesCode}
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

const iconsCode = `import { Button, Space, LucideIcons } from '@Juscash/design-system';

export function ButtonIcons() {
  const icons = [{icon: LucideIcons.Star, label: "Star"}, {icon: LucideIcons.Bell, label: "Bell"}, {icon: LucideIcons.Settings, label: "Settings"}];

  return (
    <Space wrap>
      {icons.map((Icon, index) => (
        <Button key={index} type="secondary" dsSize="s" icon={<Icon.icon size={16} />}>
          {Icon.label}
        </Button>
      ))}
    </Space>
  );
}`;

const IconsDemo = () => (
  <DemoCard
    title="Com ícones"
    description="Botões com ícones do pacote Lucide (reexportado pelo design system)."
    usageText="Use o slot children para renderizar ícones, ex.: <LucideIcons.Star />."
    codeExample={iconsCode}
    renderButtons={() => (
      <Space size="small" wrap>
        {["Star", "Bell", "Settings"].map((icon) => {
          const Icon = (LucideIcons as any)[icon];
          return (
            <Button
              key={icon}
              type="secondary"
              dsSize="s"
              icon={<Icon size={16} />}
            />
          );
        })}
      </Space>
    )}
  />
);

const statesCode = `import { Button, Space } from '@Juscash/design-system';

export function ButtonStates() {
  return (
    <Space wrap>
      <Button type="primary" loading>Carregando</Button>
      <Button type="primary" disabled>Disabled</Button>
      <Button type="secondary">Normal</Button>
    </Space>
  );
}`;

const StatesDemo = () => (
  <DemoCard
    title="Estados"
    description="Demonstração de estados comuns (loading, disabled, etc.)."
    usageText="Use as props loading, disabled ou outras props nativas do Ant Design."
    codeExample={statesCode}
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
      Botões do design system com tipos, tamanhos, ícones e estados
      personalizados.
    </Paragraph>
    <TypesDemo />
    <SizesDemo />
    <IconsDemo />
    <StatesDemo />
  </Space>
);
