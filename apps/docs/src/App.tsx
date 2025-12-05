import React, { useMemo, useState } from "react";
import {
  JuscashProvider,
  Button,
  type ThemeConfig,
} from "@Juscash/design-system";

const customTheme: ThemeConfig = {
  token: {
    colorPrimary: "#0f172a",
  },
};

export const App: React.FC = () => {
  const [tab, setTab] = useState<"components" | "tokens">("components");
  const [selectedComponent, setSelectedComponent] = useState<"button" | null>(
    null
  );

  const variants = useMemo<
    Array<NonNullable<React.ComponentProps<typeof Button>["type"]>>
  >(
    () => [
      "primary",
      "secondary",
      "ghost",
      "neutral",
      "outlined",
      "destructive",
    ],
    []
  );

  const sizes = useMemo<
    Array<NonNullable<React.ComponentProps<typeof Button>["dsSize"]>>
  >(() => ["xs", "s", "m"], []);

  const renderButtonGrid = (isIcon = false) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {variants.map((variant) =>
        sizes.map((dsSize) => (
          <Button
            key={`${variant}-${dsSize}-${isIcon ? "icon" : "text"}`}
            type={variant}
            dsSize={dsSize}
            isIcon={isIcon}
          >
            {isIcon ? "★" : `${variant} (${dsSize})`}
          </Button>
        ))
      )}
    </div>
  );

  const renderButtonDetail = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3>Todos os tipos</h3>
        {renderButtonGrid(false)}
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3>Tamanhos</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {sizes.map((dsSize) => (
            <Button key={`size-${dsSize}`} type="primary" dsSize={dsSize}>
              Primary {dsSize}
            </Button>
          ))}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3>Ícone (isIcon)</h3>
        {renderButtonGrid(true)}
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3>Exemplos de uso</h3>
        <pre
          style={{
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
            fontSize: 12,
          }}
        >
          {`import { Button } from '@Juscash/design-system';

// Tipos do design system
<Button type="primary">Primary</Button>
<Button type="secondary">Secondary</Button>
<Button type="ghost">Ghost</Button>
<Button type="neutral">Neutral</Button>
<Button type="outlined">Outlined</Button>
<Button type="destructive">Destructive</Button>

// Tamanhos
<Button type="primary" dsSize="xs">XS</Button>
<Button type="primary" dsSize="s">S</Button>
<Button type="primary" dsSize="m">M</Button>

// Ícone
<Button type="primary" dsSize="s" isIcon>★</Button>`}
        </pre>
      </section>
    </div>
  );

  return (
    <JuscashProvider themeOverride={customTheme}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: "32px 40px",
          background: "#f3f4f6",
        }}
      >
        <h1>Juscash Design System</h1>
        <p>Escolha entre Componentes ou Design Tokens.</p>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => {
              setTab("components");
              setSelectedComponent(null);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #d4d4d4",
              background: tab === "components" ? "#0f172a" : "#ffffff",
              color: tab === "components" ? "#ffffff" : "#0f172a",
              cursor: "pointer",
            }}
          >
            Componentes
          </button>
          <button
            onClick={() => {
              setTab("tokens");
              setSelectedComponent(null);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #d4d4d4",
              background: tab === "tokens" ? "#0f172a" : "#ffffff",
              color: tab === "tokens" ? "#ffffff" : "#0f172a",
              cursor: "pointer",
            }}
          >
            Design Tokens
          </button>
        </div>

        {tab === "components" && !selectedComponent && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div
              onClick={() => setSelectedComponent("button")}
              style={{
                width: 280,
                padding: 16,
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                background: "#ffffff",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <h3>Button</h3>
              <p style={{ margin: 0 }}>
                Botões baseados no Ant Design com variantes do design system.
              </p>
            </div>
          </div>
        )}

        {tab === "components" && selectedComponent === "button" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <button
              onClick={() => setSelectedComponent(null)}
              style={{
                alignSelf: "flex-start",
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid #d4d4d4",
                background: "#ffffff",
                cursor: "pointer",
              }}
            >
              ← Voltar
            </button>
            <h2>Button</h2>
            <p>
              Botões do design system com tipos, tamanhos e estado de ícone.
            </p>
            {renderButtonDetail()}
          </div>
        )}

        {tab === "tokens" && (
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              border: "1px solid #e5e5e5",
              background: "#ffffff",
            }}
          >
            <h3>Design Tokens</h3>
            <p>
              Em breve: tabela de cores, spacing, radius, breakpoints e sombras.
            </p>
          </div>
        )}
      </div>
    </JuscashProvider>
  );
};
