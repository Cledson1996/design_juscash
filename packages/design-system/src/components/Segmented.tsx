"use client";

import React from "react";
import { ConfigProvider, Segmented as AntdSegmented } from "antd";
import type { SegmentedProps as AntdSegmentedProps } from "antd";
import { designSystemColors } from "../theme";
import type { ComponentToken } from "antd/es/segmented/style/index";

type SegmentedSize = "small" | "regular" | "large" | "middle";

export type SegmentedProps<T extends string | number = string> = Omit<
  AntdSegmentedProps<T>,
  "size"
> & {
  size?: SegmentedSize;
};

function resolveSize(
  size?: SegmentedSize
): AntdSegmentedProps["size"] | undefined {
  if (!size) return undefined;
  if (size === "regular" || size === "middle") return "middle";
  if (size === "large") return "large";
  return "small";
}

const segmentedTokens: Partial<ComponentToken> = {
  trackBg: designSystemColors.neutral[200],
  itemColor: designSystemColors.neutral[800],
  itemHoverColor: designSystemColors.neutral[800],
  itemHoverBg: designSystemColors.neutral[100],
  itemActiveBg: designSystemColors.neutral[200],
  itemSelectedBg: designSystemColors.neutral[50],
  itemSelectedColor: designSystemColors.neutral[800],
};

export function Segmented<T extends string | number = string>(
  props: SegmentedProps<T>
): React.ReactElement {
  const { size, ...rest } = props;
  const resolvedSize = resolveSize(size);

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: segmentedTokens,
        },
      }}
    >
      <AntdSegmented size={resolvedSize} {...rest} />
    </ConfigProvider>
  );
}
