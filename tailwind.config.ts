import { type Config } from "tailwindcss";
import TWA from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        scroll: "scroll 60s linear infinite",
        "scroll-reverse": "scroll-reverse 60s linear infinite",
        "free-fall":
          "gravity 10s cubic-bezier(0.33333, 0, 0.66667, 0.33333) infinite",
        shake: "shake 0.3s linear infinite",
        shakelogo: "shakelogo 3.32s ease infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        vibrate: "vibrate 5s ease-in-out",
        splatter1: "splatter1 1s ease-out forwards",
        splatter2: "splatter2 1s ease-out forwards",
        splatter3: "splatter3 1s ease-out forwards",
        splatter4: "splatter4 1s ease-out forwards",
        splatter5: "splatter5 1s ease-out forwards",
        splatter6: "splatter6 1s ease-out forwards",
        rotateClockwise: "rotateClockwise 1s linear infinite",
      },
      keyframes: {
        vibrate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(10deg)",
          },
          "75%": {
            transform: "rotate(-10deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        splatter1: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-180px, -170px) scale(0.5)",
            opacity: "0",
          },
        },
        splatter2: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(200px, -80px) scale(0.6)",
            opacity: "0",
          },
        },
        splatter3: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-220px, 30px) scale(0.5)",
            opacity: "0",
          },
        },
        splatter4: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(300px, -40px) scale(0.6)",
            opacity: "0",
          },
        },
        splatter5: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-120px, 150px) scale(0.5)",
            opacity: "0",
          },
        },
        splatter6: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(200px, 120px) scale(0.4)",
            opacity: "0",
          },
        },
        shake: {
          "0%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "25%": {
            transform: "translate(5px, 5px) rotate(5deg)",
          },
          "50%": {
            transform: "translate(0, 0) rotate(0eg)",
          },
          "75%": {
            transform: " translate(-5px, 5px) rotate(-5deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
        },

        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(calc(-250px * 10))",
          },
        },
        "scroll-reverse": {
          "0%": {
            transform: "translateX(calc(-250px * 10))",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        gravity: {
          "0%": {
            transform: "translateY(-10vh) rotate(0deg)",
          },
          "100% ": {
            transform: "translateY(110vh) rotate(120deg)",
          },
        },
        "sun-gravity": {
          "0%": {
            transform: "translateY(-100vh) rotate(0deg)",
          },
          "100%": {
            transform: "translateY(200vh) rotate(360deg)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        rotateClockwise: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },

        shakelogo: {
          "0%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "1.25%": {
            transform: "translate(2px, 0) rotate(2deg)",
          },
          "2.5%": {
            transform: "translate(4px, 0) rotate(4deg)",
          },
          "3.75%": {
            transform: "translate(2px, 0) rotate(2deg)",
          },
          "5%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "6.25%": {
            transform: "translate(-2px, 0) rotate(-2deg)",
          },
          "7.5%": {
            transform: "translate(-4px, 0) rotate(-4deg)",
          },
          "8.75%": {
            transform: "translate(-2px, 0) rotate(-2deg)",
          },
          "10%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "11.25%": {
            transform: "translate(2px, 0) rotate(2deg)",
          },
          "12.5%": {
            transform: "translate(4px, 0) rotate(4deg)",
          },
          "13.75%": {
            transform: "translate(2px, 0) rotate(2deg)",
          },
          "15%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "16.25%": {
            transform: "translate(-2px, 0) rotate(-2deg)",
          },
          "17.5%": {
            transform: "translate(-4px, 0) rotate(-4deg)",
          },
          "18.75%": {
            transform: "translate(-2px, 0) rotate(-2deg)",
          },
          "20%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
        },
      },
      transitionTimingFunction: {
        "suck-in": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      fontFamily: {
        trap: "var(--font-trap)",
        "life-craft": "var(--font-life-craft)",
        "black-chancery": "var(--font-black-chancery)",
      },
      colors: {
        primary: {
          50: "#e6fff5",
          100: "#ccffeb",
          200: "#99ffd8",
          300: "#66ffc4",
          400: "#33ffb1",
          500: "#00ff9d",
          600: "#00cc7e",
          700: "#00995e",
          800: "#00663f",
          900: "#00331f",
          950: "#001a10",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          50: "#fbf4e9",
          100: "#f7e9d4",
          200: "#efd3a9",
          300: "#e7bd7e",
          400: "#dfa753",
          500: "#d79128",
          600: "#ac7420",
          700: "#815718",
          800: "#563a10",
          900: "#2b1d08",
          950: "#160f04",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          50: "#e7fdf7",
          100: "#d0fbef",
          200: "#a0f8df",
          300: "#71f4cf",
          400: "#41f1bf",
          500: "#12edaf",
          600: "#0ebe8c",
          700: "#0b8e69",
          800: "#075f46",
          900: "#042f23",
          950: "#021812",
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        glassy: "rgba(var(--background-rgb), 0.8)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      scrollbar: ["rounded"],
    },
    plugins: [TWA],
  },
};

export default config;
