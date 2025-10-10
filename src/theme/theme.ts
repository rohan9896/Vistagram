import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    vistagram: {
      50: "#fffafa",
      100: "#fff0f0",
      200: "#ffdede",
      300: "#ffc4c4",
      400: "#ffa8a8",
      500: "#ff6b3d",
      600: "#ff5722",
      700: "#e64e1f",
      800: "#cc451b",
      900: "#b33c17",
    },
    vistagramBlue: {
      50: "#e6f2ff",
      100: "#cce5ff",
      200: "#99cbff",
      300: "#66b2ff",
      400: "#3399ff",
      500: "#0079d3",
      600: "#006bb3",
      700: "#005c99",
      800: "#004d80",
      900: "#003d66",
    },
    background: {
      primary: "#ffffff",
      secondary: "#f6f7f8",
      tertiary: "#edeff1",
      hover: "#f6f7f8",
    },
    border: {
      light: "#ccc",
      medium: "#898989",
      dark: "#343536",
    },
    text: {
      primary: "#1c1c1c",
      secondary: "#7c7c7c",
      tertiary: "#787c7e",
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  styles: {
    global: {
      body: {
        bg: "background.secondary",
        color: "text.primary",
      },
      a: {
        color: "vistagramBlue.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 700,
        borderRadius: "full",
        fontSize: "sm",
        _focus: {
          boxShadow: "none",
        },
      },
      variants: {
        solid: (props: any) => ({
          bg:
            props.colorScheme === "vistagram"
              ? "vistagram.500"
              : props.colorScheme === "vistagramBlue"
              ? "vistagramBlue.500"
              : undefined,
          color: "white",
          _hover: {
            bg:
              props.colorScheme === "vistagram"
                ? "vistagram.600"
                : props.colorScheme === "vistagramBlue"
                ? "vistagramBlue.600"
                : undefined,
            _disabled: {
              bg:
                props.colorScheme === "vistagram"
                  ? "vistagram.500"
                  : props.colorScheme === "vistagramBlue"
                  ? "vistagramBlue.500"
                  : undefined,
            },
          },
          _active: {
            bg:
              props.colorScheme === "vistagram"
                ? "vistagram.700"
                : props.colorScheme === "vistagramBlue"
                ? "vistagramBlue.700"
                : undefined,
          },
        }),
        outline: (props: any) => ({
          border: "1px solid",
          borderColor:
            props.colorScheme === "vistagram"
              ? "vistagram.500"
              : props.colorScheme === "vistagramBlue"
              ? "vistagramBlue.500"
              : "border.light",
          color:
            props.colorScheme === "vistagram"
              ? "vistagram.500"
              : props.colorScheme === "vistagramBlue"
              ? "vistagramBlue.500"
              : "text.primary",
          _hover: {
            bg: "background.hover",
          },
        }),
        ghost: {
          color: "text.primary",
          _hover: {
            bg: "background.hover",
          },
        },
        link: {
          color: "vistagramBlue.500",
          _hover: {
            textDecoration: "underline",
          },
        },
      },
      defaultProps: {
        colorScheme: "vistagramBlue",
      },
    },
    Input: {
      baseStyle: {
        field: {
          _focus: {
            borderColor: "vistagramBlue.500",
            boxShadow: "0 0 0 1px #0079d3",
          },
        },
      },
      variants: {
        outline: {
          field: {
            bg: "background.primary",
            border: "1px solid",
            borderColor: "border.light",
            borderRadius: "md",
            _hover: {
              borderColor: "border.medium",
            },
            _focus: {
              borderColor: "vistagramBlue.500",
              boxShadow: "0 0 0 1px #0079d3",
            },
            _invalid: {
              borderColor: "red.500",
              boxShadow: "0 0 0 1px #f56565",
            },
          },
        },
        filled: {
          field: {
            bg: "background.secondary",
            border: "1px solid",
            borderColor: "transparent",
            _hover: {
              bg: "background.tertiary",
            },
            _focus: {
              bg: "background.primary",
              borderColor: "vistagramBlue.500",
              boxShadow: "0 0 0 1px #0079d3",
            },
          },
        },
      },
      defaultProps: {
        variant: "outline",
      },
    },
    Textarea: {
      baseStyle: {
        _focus: {
          borderColor: "vistagramBlue.500",
          boxShadow: "0 0 0 1px #0079d3",
        },
      },
      variants: {
        outline: {
          bg: "background.primary",
          border: "1px solid",
          borderColor: "border.light",
          borderRadius: "md",
          _hover: {
            borderColor: "border.medium",
          },
          _focus: {
            borderColor: "vistagramBlue.500",
            boxShadow: "0 0 0 1px #0079d3",
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: "text.primary",
        fontWeight: 600,
        fontSize: "sm",
        mb: 1,
      },
    },
    FormError: {
      baseStyle: {
        text: {
          color: "red.500",
          fontSize: "xs",
          mt: 1,
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "background.primary",
          borderRadius: "md",
          border: "1px solid",
          borderColor: "border.light",
          overflow: "hidden",
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "text.primary",
        fontWeight: 700,
      },
    },
    Text: {
      baseStyle: {
        color: "text.primary",
      },
      variants: {
        secondary: {
          color: "text.secondary",
          fontSize: "sm",
        },
        tertiary: {
          color: "text.tertiary",
          fontSize: "xs",
        },
      },
    },
    Link: {
      baseStyle: {
        color: "vistagramBlue.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: "full",
        fontSize: "xs",
        fontWeight: 600,
        px: 2,
        py: 0.5,
      },
      variants: {
        solid: (props: any) => ({
          bg:
            props.colorScheme === "vistagram"
              ? "vistagram.500"
              : props.colorScheme === "vistagramBlue"
              ? "vistagramBlue.500"
              : undefined,
          color: "white",
        }),
        subtle: (props: any) => ({
          bg:
            props.colorScheme === "vistagram"
              ? "vistagram.100"
              : props.colorScheme === "vistagramBlue"
              ? "vistagramBlue.100"
              : undefined,
          color:
            props.colorScheme === "vistagram"
              ? "vistagram.700"
              : props.colorScheme === "vistagramBlue"
              ? "vistagramBlue.700"
              : undefined,
        }),
      },
    },
    Tabs: {
      variants: {
        line: {
          tab: {
            color: "text.secondary",
            fontWeight: 600,
            fontSize: "sm",
            borderBottom: "2px solid transparent",
            _selected: {
              color: "vistagramBlue.500",
              borderBottomColor: "vistagramBlue.500",
            },
            _hover: {
              color: "text.primary",
            },
          },
          tablist: {
            borderBottom: "1px solid",
            borderColor: "border.light",
          },
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "border.light",
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "background.primary",
          border: "1px solid",
          borderColor: "border.light",
          borderRadius: "md",
          boxShadow: "lg",
        },
        item: {
          bg: "background.primary",
          _hover: {
            bg: "background.hover",
          },
          _focus: {
            bg: "background.hover",
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: "background.primary",
          borderRadius: "md",
        },
        header: {
          color: "text.primary",
          fontWeight: 700,
          fontSize: "lg",
        },
        body: {
          color: "text.primary",
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: "border.medium",
          _checked: {
            bg: "vistagramBlue.500",
            borderColor: "vistagramBlue.500",
            _hover: {
              bg: "vistagramBlue.600",
              borderColor: "vistagramBlue.600",
            },
          },
        },
      },
    },
    Radio: {
      baseStyle: {
        control: {
          borderColor: "border.medium",
          _checked: {
            bg: "vistagramBlue.500",
            borderColor: "vistagramBlue.500",
            _hover: {
              bg: "vistagramBlue.600",
              borderColor: "vistagramBlue.600",
            },
          },
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: "gray.300",
          _checked: {
            bg: "vistagramBlue.500",
          },
        },
      },
    },
  },
});

export default theme;
