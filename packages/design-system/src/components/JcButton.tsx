"use client";

import React from "react";
import { Button, type ButtonProps } from "antd";

export interface JcButtonProps extends Omit<ButtonProps, "variant"> {
  /**
   * Variante visual padrão do design system Juscash.
   * No início pode apenas mapear para tipos do AntD, mas já deixamos preparado.
   */
  variant?: "primary" | "secondary";
}

export const JcButton: React.FC<JcButtonProps> = ({
  variant = "primary",
  ...props
}) => {
  // Neste primeiro momento apenas repassamos para o Button padrão.
  // Mais tarde podemos aplicar classes / tokens diferentes por variante.
  return <Button {...props} />;
};
