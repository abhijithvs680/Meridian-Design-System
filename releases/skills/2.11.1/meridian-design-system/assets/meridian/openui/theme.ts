// Map Meridian semantic tokens onto @openuidev/react-ui's chat shell (AgentInterface, etc.).
// Token keys in createTheme depend on the installed @openuidev/react-ui version: unknown keys warn in development.
// Check the package's theme type and extend this mapping; values come from Meridian tokens.json.
import { createTheme, type ThemeProps } from "@openuidev/react-ui";

export const meridianTheme: ThemeProps = {
  lightTheme: createTheme({
    interactiveAccentDefault: "#2e6ae1", // primary (blue-600)
    radiusM: "6px",                     // radius-md
  }),
  darkTheme: createTheme({
    interactiveAccentDefault: "#71a3ff", // primary (blue-400)
    radiusM: "6px",
  }),
};
