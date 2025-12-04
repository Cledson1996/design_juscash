import React, { useState } from 'react';
import {
  JuscashProvider,
  JcButton,
  AntButton,
  Modal,
  ConfigProvider,
  type ThemeConfig
} from '@Juscash/design-system';

const customTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0f172a'
  }
};

export const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <JuscashProvider themeOverride={customTheme}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          background: '#f3f4f6'
        }}
      >
        <h1>Juscash Design System</h1>
        <p>Docs de exemplo usando @Juscash/design-system (baseado em Ant Design 6).</p>

        <div style={{ display: 'flex', gap: 12 }}>
          <JcButton type="primary" onClick={() => setOpen(true)}>
            Abrir modal (JcButton)
          </JcButton>
          <AntButton>Botão original do AntD (reexportado)</AntButton>
        </div>

        <ConfigProvider>
          <Modal
            title="Modal via @Juscash/design-system"
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          >
            <p>
              Este modal e os botões estão sendo importados de <code>@Juscash/design-system</code>.
            </p>
          </Modal>
        </ConfigProvider>
      </div>
    </JuscashProvider>
  );
};


