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
    // usa tokens de primary do AntD para aplicar quando type='primary'
    colorPrimary: designSystemColors.brand.primary[600],
    colorPrimaryHover: designSystemColors.brand.primary[800],
    colorPrimaryActive: designSystemColors.brand.primary[800],
    colorTextLightSolid: designSystemColors.neutral[50],
  };
}

function getSecondaryTokens(): Partial<ButtonToken> {
  return {
    colorPrimary: designSystemColors.brand.secondary[700],
    colorPrimaryHover: designSystemColors.brand.secondary[800],
    colorPrimaryActive: designSystemColors.brand.secondary[800],
    colorTextLightSolid: designSystemColors.neutral[50],
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
    colorPrimary: designSystemColors.feedback.red[500],
    colorPrimaryHover: designSystemColors.feedback.red[900],
    colorPrimaryActive: designSystemColors.feedback.red[900],
    colorTextLightSolid: designSystemColors.neutral[50],
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
      paddingInline: spacing[2],
      borderRadius: radius.md,
    };
  }
  if (dsSize === "s") {
    return {
      fontSize: 13,
      controlHeight: 32,
      paddingInline: spacing[3],
      borderRadius: radius.xl,
    };
  }
  return {
    fontSize: 13,
    controlHeight: 36,
    paddingInline: spacing[4],
    borderRadius: radius.xl,
  };
}

function mapToDsSize(size?: AntdButtonProps["size"]): DsSize {
  if (size === "small") return "xs";
  if (size === "middle") return "s";
  return "m";
}

export function Button(props: ButtonProps): React.ReactElement {
  const { type, dsSize, size, style, ...rest } = props;

  const resolvedSize = size ? mapToDsSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);

  // Calcula paddingBlock baseado no tamanho para aplicar via style inline
  // Sobrescreve o `padding: 0px var(--ant-button-padding-inline)` que o AntD gera
  const paddingBlockValue =
    resolvedSize === "xs"
      ? spacing[1]
      : resolvedSize === "s"
      ? spacing[1]
      : resolvedSize === "m"
      ? spacing[2]
      : undefined;

  const applyTheme = (
    tokens: Partial<ButtonToken>,
    antdType: AntdButtonType
  ) => (
    <ConfigProvider
      theme={{
        components: { Button: { algorithm: true, ...tokens, ...sizeTokens } },
      }}
    >
      <AntdButton
        type={antdType}
        style={
          paddingBlockValue !== undefined
            ? {
                paddingTop: `${paddingBlockValue}px`,
                paddingBottom: `${paddingBlockValue}px`,
                ...style,
              }
            : style
        }
        {...rest}
      />
    </ConfigProvider>
  );

  if (type === "primary") {
    return applyTheme(getPrimaryTokens(), "primary");
  }

  if (type === "secondary") {
    return applyTheme(getSecondaryTokens(), "primary");
  }

  if (type === "ghost") {
    return applyTheme(getGhostTokens(), "default");
  }

  if (type === "destructive") {
    return applyTheme(getDestructiveTokens(), "primary");
  }

  if (type === "neutral") {
    return applyTheme(getNeutralTokens(), "default");
  }

  if (type === "outlined") {
    return applyTheme(getOutlinedTokens(), "default");
  }

  // fallback: usa os tipos nativos do AntD, mantendo tokens de tamanho para consistência mínima
  if (resolvedSize) {
    return (
      <ConfigProvider theme={{ components: { Button: { ...sizeTokens } } }}>
        <AntdButton
          type="default"
          style={
            paddingBlockValue !== undefined
              ? {
                  paddingTop: `${paddingBlockValue}px`,
                  paddingBottom: `${paddingBlockValue}px`,
                  ...style,
                }
              : style
          }
          {...rest}
        />
      </ConfigProvider>
    );
  }

  return <AntdButton type="default" style={style} {...rest} />;
}
