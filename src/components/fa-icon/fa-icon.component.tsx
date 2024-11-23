import { Box, type BoxProps, type SxProps } from "@mui/material";
import { forwardRef, useEffect } from "react";

const TooltipFixContainer = forwardRef(({ children, ...props }: BoxProps, ref) => {
  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        display: "flex",
        flexShrink: 0,
        flexGrow: 0,
        p: "2px",
        alignItems: "center",
        // take only space necessary for children
        width: "fit-content",
      }}
    >
      {children}
    </Box>
  );
});

export interface FAIconProps {
  variant?: "solid" | "regular" | "duotone" | "light";
  icon?: string;
  color?: BoxProps["color"];
  /**
   * xl: 28px
   * large: 24px
   * medium: 20px
   * small: 16px
   * xs: 14px
   * micro: 12px
   */
  fontSize?: "inherit" | "micro" | "xs" | "small" | "medium" | "large" | "xl" | number;
  migration?: boolean;
  sx?: SxProps;
  className?: string;
}


/**
 * The total size of the icon is the font size plus 4px from the padding
 * (2px on each side).
 */
export const IconSize = {
  XLarge: "28px",
  Large: "24px",
  Medium: "20px",
  Small: "16px",
  XSmall: "14px",
  Micro: "12px",
}

const getFontSize = (fontSize: FAIconProps["fontSize"]) => {
  if(typeof fontSize === "number") {
    return `${fontSize}px !important`;
  }
  switch (fontSize) {
    case "inherit":
      return "inherit";
    case "xl":
      return `${IconSize.XLarge} !important`;
    case "large":
      return `${IconSize.Large} !important`;
    case "medium":
      return `${IconSize.Medium} !important`;
    case "small":
      return `${IconSize.Small} !important`;
    case "xs":
      return `${IconSize.XSmall} !important`;
    case "micro":
      return `${IconSize.Micro} !important`;
    default:
      return IconSize.XSmall
  }
};

declare global {
  interface Window {
    faReady?: boolean;
  }
}

const loadScript = () => {
  try {
    if (window.faReady) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/c30b169412.js";
    (script as HTMLScriptElement).setAttribute("data-auto-replace-svg", "nest");
    script.crossOrigin = "anonymous";

    // Handle script load success and error
    script.onload = () => {
      console.log("FontAwesome script loaded successfully");
    };

    script.onerror = (error) => {
      console.error("Failed to load FontAwesome script", error);
    };

    window.faReady = true;
    document.body.appendChild(script);
  } catch (e) {
    console.error("Error loading fontawesome script", e);
  }
};

export const FAIcon = forwardRef((props: FAIconProps, ref) => {
  const { variant = "solid", icon = "circle-exclamation", color = "inherit", sx = {}, fontSize, className, ...rest } = props;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (props.migration) {
      console.warn("This icon needs a replacement in fontawesome.");
    }
  }, []);

  useEffect(() => {
    loadScript();
  }, []);

  return (
      <TooltipFixContainer ref={ref} {...rest}>
        <Box
          component="i"
          className={`fa-${variant} fa-${icon} ${className}`}
          // data-fa-transform="shrink-4"
          color={color}
          sx={{
            boxSizing: "inherit",
            // The padding present in the mui icons are added through the
            // data-fa-transform attribute
            // padding: "0.25em",
            fontSize: getFontSize(fontSize),
            width: "1em",
            maxWidth: "100%",
            height: "1em",
            maxHeight: "100%",
            ...sx,
          }}
        />
      </TooltipFixContainer>
  );
});
