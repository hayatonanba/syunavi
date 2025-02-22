import Header from "@/src/app/components/header/no-signin-button";
import "@/src/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main
          className={`bg-[url("/background.png")] bg-cover bg-no-repeat bg-center h-screen flex justify-center`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
