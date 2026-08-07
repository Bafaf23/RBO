import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
  title: "RBO - Inicio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col">
        <main className="w-full min-h-screen">{children}</main>
      </body>
    </html>
  );
}
