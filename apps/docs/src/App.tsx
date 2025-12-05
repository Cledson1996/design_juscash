import React, { useState } from "react";
import { JuscashProvider, type ThemeConfig } from "@Juscash/design-system";
import { MainLayout } from "./layouts/MainLayout";
import { ComponentsSection } from "./sections/ComponentsSection";
import { TokensSection } from "./sections/TokensSection";
import { AboutSection } from "./sections/AboutSection";
import type { SectionKey, ComponentKey } from "./types/navigation";

const customTheme: ThemeConfig = {
  token: {
    colorPrimary: "#0f172a",
  },
};

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("components");
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentKey | null>(null);

  const renderSection = () => {
    switch (activeSection) {
      case "components":
        return (
          <ComponentsSection
            selectedComponent={selectedComponent}
            onSelect={setSelectedComponent}
          />
        );
      case "tokens":
        return <TokensSection />;
      case "about":
        return <AboutSection />;
      default:
        return null;
    }
  };

  const handleSectionChange = (key: string) => {
    setActiveSection(key as SectionKey);
    setSelectedComponent(null);
  };

  return (
    <JuscashProvider themeOverride={customTheme}>
      <MainLayout
        activeSection={activeSection}
        onChangeSection={handleSectionChange}
      >
        {renderSection()}
      </MainLayout>
    </JuscashProvider>
  );
};
