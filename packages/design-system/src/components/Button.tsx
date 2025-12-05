"use client";

import React from "react";
import {
  Button as AntdButton,
  type ButtonProps as AntdButtonProps,
  ConfigProvider,
} from "antd";
import type { ButtonToken } from "antd/es/button/style/token";
import { designSystemColors } from "../theme";
import { radius, spacing } from "../theme";

type AntdButtonType = NonNullable<AntdButtonProps["type"]>;

type ExtendedButtonType =
  | AntdButtonType
  | "secondary"
  | "destructive"
  | "ghost"
  | "neutral"
  | "outlined";

type DsSize = "xs" | "s" | "m";

export interface ButtonProps
  extends Omit<AntdButtonProps, "type" | "size" | "danger"> {
  type?: ExtendedButtonType;
  dsSize?: DsSize;
  size?: AntdButtonProps["size"];
}

function getPrimaryTokens(): Partial<ButtonToken> {
  return {
    defaultBg: designSystemColors.brand.primary[600],
    defaultColor: designSystemColors.neutral[50],
    defaultHoverColor: designSystemColors.neutral[50],
    defaultHoverBg: designSystemColors.brand.primary[800],
    defaultActiveBg: designSystemColors.brand.primary[800],
    defaultActiveColor: designSystemColors.neutral[50],
    defaultBorderColor: "transparent",
    defaultHoverBorderColor: "transparent",
    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[300],
  };
}

function getSecondaryTokens(): Partial<ButtonToken> {
  return {
    defaultBg: designSystemColors.brand.secondary[700],
    defaultColor: designSystemColors.neutral[50],
    defaultActiveColor: designSystemColors.neutral[50],
    defaultHoverColor: designSystemColors.neutral[50],
    defaultHoverBg: designSystemColors.brand.secondary[800],
    defaultActiveBg: designSystemColors.brand.secondary[800],
    defaultBorderColor: "transparent",
    defaultHoverBorderColor: "transparent",
    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[300],
  };
}

function getGhostTokens(): Partial<ButtonToken> {
  return {
    defaultColor: designSystemColors.neutral[800],
    defaultBorderColor: "transparent",
    defaultBg: "transparent",
    defaultHoverBorderColor: "transparent",
    defaultActiveBorderColor: "transparent",
    defaultActiveColor: designSystemColors.neutral[800],
    defaultHoverColor: designSystemColors.neutral[800],
    defaultHoverBg: designSystemColors.neutral[100],
    defaultActiveBg: designSystemColors.neutral[100],
    colorTextDisabled: designSystemColors.neutral[400],
    colorText: designSystemColors.neutral[800],
    colorTextBase: designSystemColors.neutral[800],
  };
}

function getDestructiveTokens(): Partial<ButtonToken> {
  return {
    colorError: designSystemColors.feedback.red[500],
    colorErrorHover: designSystemColors.feedback.red[900],
    colorErrorActive: designSystemColors.feedback.red[900],
    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[300],
  };
}

function getNeutralTokens(): Partial<ButtonToken> {
  return {
    defaultBg: designSystemColors.neutral[200],
    defaultColor: designSystemColors.neutral[800],
    defaultBorderColor: designSystemColors.neutral[300],
    defaultHoverBorderColor: designSystemColors.neutral[300],
    defaultHoverBg: designSystemColors.neutral[400],
    defaultActiveBg: designSystemColors.neutral[400],
    defaultHoverColor: designSystemColors.neutral[800],
    defaultActiveColor: designSystemColors.neutral[800],
    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[300],
  };
}

function getOutlinedTokens(): Partial<ButtonToken> {
  return {
    defaultBg: "transparent",
    defaultColor: designSystemColors.neutral[800],
    defaultBorderColor: designSystemColors.neutral[300],
    defaultHoverBorderColor: designSystemColors.neutral[400],
    defaultHoverColor: designSystemColors.neutral[800],
    defaultHoverBg: designSystemColors.neutral[100],
    defaultActiveBg: designSystemColors.neutral[100],
    colorTextDisabled: designSystemColors.neutral[400],
    colorBgContainerDisabled: designSystemColors.neutral[300],
  };
}

function getSizeTokens(dsSize?: DsSize): Partial<ButtonToken> {
  if (dsSize === "xs") {
    return {
      fontSize: 10,
      controlHeight: 24,
      paddingInline: `${spacing[2]}px ${spacing[1]}px`,
      borderRadius: radius.md,
    };
  }
  if (dsSize === "s") {
    return {
      fontSize: 13,
      controlHeight: 32,
      paddingInline: `${spacing[3]}px ${spacing[1]}px`,
      borderRadius: radius.xl,
    };
  }
  return {
    fontSize: 13,
    controlHeight: 36,
    paddingInline: `${spacing[4]}px ${spacing[2]}px`,
    borderRadius: radius.xl,
  };
}

function mapToDsSize(size?: AntdButtonProps["size"]): DsSize {
  if (size === "small") return "xs";
  if (size === "middle") return "s";
  return "m";
}

export function Button(props: ButtonProps): React.ReactElement {
  const { type, dsSize, size, ...rest } = props;

  const resolvedSize = size ? mapToDsSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);

  const applyTheme = (tokens: Partial<ButtonToken>) => (
    <ConfigProvider
      theme={{ components: { Button: { ...tokens, ...sizeTokens } } }}
    >
      <AntdButton type="default" {...rest} />
    </ConfigProvider>
  );

  if (type === "primary") {
    return applyTheme(getPrimaryTokens());
  }

  if (type === "secondary") {
    return applyTheme(getSecondaryTokens());
  }

  if (type === "ghost") {
    return applyTheme(getGhostTokens());
  }

  if (type === "destructive") {
    return applyTheme(getDestructiveTokens());
  }

  if (type === "neutral") {
    return applyTheme(getNeutralTokens());
  }

  if (type === "outlined") {
    return applyTheme(getOutlinedTokens());
  }

  // fallback: usa os tipos nativos do AntD, mantendo tokens de tamanho para consistência mínima
  if (resolvedSize) {
    return (
      <ConfigProvider theme={{ components: { Button: { ...sizeTokens } } }}>
        <AntdButton type={type as AntdButtonType} {...rest} />
      </ConfigProvider>
    );
  }

  return <AntdButton type={type as AntdButtonType} {...rest} />;
}
