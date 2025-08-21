import "./globals.css";
import Login from "./login/page";

export const metadata = {
  title: "Solicitação de Pagamento",
  description: "Solicitação de Pagamento",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
