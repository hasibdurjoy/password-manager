import type { Metadata } from "next";
import "sweetalert2/src/sweetalert2.scss";
import "./globals.css";

export const metadata: Metadata = {
  title: "Password Manager",
  description: "This is a web based software to manage your passwords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="h-[60px] bg-orange-500 px-4 flex items-center">
          <span className="text-xl font-bold">Welcome To Password Manager</span>
        </div>
        {children}
      </body>
    </html>
  );
}
