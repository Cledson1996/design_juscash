import React from "react";
import {
  Layout,
  Menu,
  Typography,
  type MenuProps
} from "@Juscash/design-system";
import { logoSrc } from "../utils/logo";
import type { SectionKey } from "../types/navigation";

const { Sider } = Layout;
const { Text } = Typography;

const menuItems: MenuProps["items"] = [
  { key: "components", label: "Componentes" },
  { key: "tokens", label: "Design Tokens" },
  { key: "about", label: "Sobre" }
];

export interface SidebarProps {
  activeSection: SectionKey;
  onChange: (key: SectionKey) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onChange
}) => (
  <Sider breakpoint="lg" collapsedWidth={0} style={{ background: "#0f172a" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 24px"
      }}
    >
      <img src={logoSrc} alt="Juscash" style={{ width: 36 }} />
      <Text style={{ color: "#fff", fontWeight: 600 }}>Juscash DS</Text>
    </div>
    <Menu
      items={menuItems}
      selectedKeys={[activeSection]}
      onClick={({ key }) => onChange(key as SectionKey)}
      theme="dark"
      mode="inline"
    />
  </Sider>
);


