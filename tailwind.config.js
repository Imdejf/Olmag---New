/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
    colors: {
      white: {
        DEFAULT: "#FFF",
      },
      green: {
        DEFAULT: "#3BA676",
        50: "#B4E4CF",
        100: "#A5DFC5",
        200: "#87D4B2",
        300: "#69CA9E",
        400: "#4BBF8B",
        500: "#3BA676",
        600: "#2C7D59",
        700: "#1E533B",
        800: "#0F2A1E",
        900: "#000000",
      },
      gray: {
        DEFAULT: "#0096FF",
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      slate: {
        DEFAULT: "#0096FF",
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#e2e8f0",
        500: "#cbd5e1",
        600: "#cbd5e1",
        700: "#334155",
        800: "#334155",
        900: "#0F172A",
      },
      blue: {
        DEFAULT: "#0096FF",
        50: "#B8E2FF",
        100: "#A3D9FF",
        200: "#7AC8FF",
        300: "#52B8FF",
        400: "#29A7FF",
        500: "#0096FF",
        600: "#0073E6",
        700: "#00548F",
        800: "#003357",
        900: "#00263a",
      },
      emerald: {
        DEFAULT: "#0096FF",
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#047857",
        900: "#064e3b",
      },
      yellow: {
        DEFAULT: "#0096FF",
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
      },
      orange: {
        DEFAULT: "#0096FF",
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
      },
      light: {
        DEFAULT: "#0096FF",
        50: "#fdfdfd",
        100: "#fcfcfc",
        200: "#fafafa",
        300: "#f8f9fa",
        400: "#f6f6f6",
        500: "#f2f2f2",
        600: "#f1f3f5",
        700: "#e9ecef",
        800: "#dee2e6",
        900: "#dde1e3",
      },
    },
  },
  plugins: [],
};
