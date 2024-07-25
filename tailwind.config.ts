import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./entities/**/*.{js,ts,jsx,tsx,mdx}",
    './components/**/*.{ts,tsx}',
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-button-accent": "linear-gradient(135deg, #6857FD -39.75%, #3E3497 139.75%)",
        "gradient-accent-center": "radial-gradient(110.82% 55.66% at 50% 58.46%, rgba(21, 0, 148, 0.7) 0%, #1C1C1C 46.5%)",
        "gradient-button-sec": "linear-gradient(127.89deg, #4100CC -22.47%, #210066 138.25%)",
        "gradient-loading": "linear-gradient(116.22deg, #9C91FF 16.5%, #4731FF 83.59%)",
        "gradient-background": "linear-gradient(180deg, #1C1C1C 50%, #2E2E2E 103.67%)",
        "gradient-logo": "radial-gradient(28.64% 28.64% at 50% 50%, #F5DFE1 0%, rgba(41, 39, 44, 0) 100%)",
      },
      boxShadow: {
        buttonAccent: "4px 4px 12px 0px rgba(122, 107, 255, 0.24) inset, -4px -4px 12px 0px rgba(23, 13, 108, 0.24) inset",
        boneButton: "0px 4px 12px 0px rgba(97, 62, 234, 0.5)",
        switch: "0px 3px 1px 0px rgba(0, 0, 0, 0.06), 0px 3px 8px 0px rgba(0, 0, 0, 0.15), 0px 0px 0px 1px rgba(0, 0, 0, 0.04)",
        buttonNoAccent: "2px 2px 4px 0px rgba(120, 120, 128, 0.25) inset",
        buttonSec: "19px 19px 24.8px 0px rgba(140, 121, 255, 0.25) inset, 19px 19px 24.8px 0px rgba(22, 0, 159, 0.25) inset",
        loadingModal: "0px 0px 36.5px 9px rgba(104, 87, 253, 0.24), inset 2px 2px 4px rgba(120, 120, 128, 0.25)",
        nftModal: "2px 2px 4px 0px rgba(120, 120, 128, 0.25) inset, 0px 0px 36.5px 9px rgba(104, 87, 253, 0.24)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      inter: ["Inter"],
      luckiestGuy: ["LuckiestGuy"],
      sFProText: ["SFProText"],
      epilogue: ["Epilogue"],
      portico: ["Portico"],
    },
    colors: {
      white: {
        DEFAULT: "var(--white-default)",
        900: "var(--white-900)",
        800: "var(--white-800)",
      },
      black: {
        DEFAULT: "var(--black-default)",
        900: "var(--black-900)",
        800: "var(--black-800)",
        790: "var(--black-790)",
        750: "var(--black-750)",
        700: "var(--black-700)",
        650: "var(--black-650)",
        600: "var(--black-600)",
        500: "var(--black-500)",
        400: "var(--black-400)",
        300: "var(--black-300)"
      },
      blue: {
        DEFAULT: "var(--blue-default)",
        900: "var(--blue-900)",
        800: "var(--blue-800)",
      },
      green: {
        DEFAULT: "var( --green-default)",
      },
      red: {
        DEFAULT: "var( --red-default)",
      }
    }
  },
  plugins: [],
};
export default config;
