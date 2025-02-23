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
          className={`flex h-screen justify-center bg-[url("/background.png")] bg-center bg-cover bg-no-repeat`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
