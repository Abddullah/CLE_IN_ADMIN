import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FontAwesomeConfig from "@/fontawesome";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import { Provider } from "react-redux";
import {store} from '../app/config/Redux/store/store'

const latoBlack = localFont({
  src: "./fonts/Lato-Black.ttf",
  variable: "--font-lato-black",
  weight: "100 900",
});
const latoRegular = localFont({
  src: "./fonts/Lato-Regular.ttf",
  variable: "--font-lato-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CLE IN",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Provider store={store}>

    <html lang="en">
      <head>
        <FontAwesomeConfig />
      </head>
      <body
        className={`${latoBlack.variable} ${latoRegular.variable} antialiased`}
        >
        {
          <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
              <Navbar title="Dashboard" />
              <div className="flex-1 overflow-auto">{children}</div>
            </div>
          </div>
        }
      </body>
    </html>
        </Provider>
  );
}
