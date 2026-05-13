import { ModalsProvider } from "@mantine/modals";
import "./globals.css";
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.css';
import { createTheme, MantineProvider } from "@mantine/core"

export const metadata = {
  title: "Login",
  description: "Entre para continuar",
};
const theme = createTheme({
  /** Put your mantine theme override here */
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
