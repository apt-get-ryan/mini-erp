import { ModalsProvider } from "@mantine/modals";
import "./globals.css";
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.css';
import { createTheme, MantineProvider } from "@mantine/core"
import type { Metadata } from "next";

export const metadata : Metadata = {
  title: "Login / Registro",
  description: "Entre para continuar",
  icons: "/icon.svg"
};

const theme = createTheme({

});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`font-sans antialiased min-h-dvh`}
      >
        <MantineProvider   theme={theme}>
          <ModalsProvider>
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
