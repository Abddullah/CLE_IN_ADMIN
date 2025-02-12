// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import FontAwesomeConfig from "@/fontawesome";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/SideBar";
// import { NextIntlClientProvider } from "next-intl";
// import { getMessages } from "next-intl/server";
// import { notFound } from "next/navigation";
// import { routing } from "@/i18n/routing";
// import ReduxProvider from "./ReduxProvider";
// import ScrollReset from "./components/scroll-reset";

// const latoBlack = localFont({
//   src: "./fonts/Lato-Black.ttf",
//   variable: "--font-lato-black",
//   weight: "100 900",
// });
// const latoRegular = localFont({
//   src: "./fonts/Lato-Regular.ttf",
//   variable: "--font-lato-regular",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Pulizie De Casa | Admin",
//   description: "Developed by Genesis Home",
// };

// export default async function RootLayout({
//   children,
//   params: { locale },
// }: Readonly<{
//   children: React.ReactNode;
//   params: { locale: string };
// }>) {
//   if (!routing.locales.includes(locale as any)) {
//     notFound();
//   }

//   const messages = await getMessages();
//   return (
//     <html lang={locale}>
//       <head>
//         <FontAwesomeConfig />
//       </head>

//       <body
//         className={`${latoBlack.variable} ${latoRegular.variable} antialiased`}
//       >
//         {
//           <NextIntlClientProvider messages={messages}>
//             <ReduxProvider>
//               <div className="flex h-screen">
//                 <ScrollReset />
//                 <Sidebar />

//                 <div className="flex-1 flex flex-col">
//                   <Navbar />
//                   <div className="flex-1 overflow-auto">{children}</div>
//                 </div>
//               </div>
//             </ReduxProvider>
//           </NextIntlClientProvider>
//         }
//       </body>
//     </html>
//   );
// }









import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FontAwesomeConfig from "@/fontawesome";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ReduxProvider from "./ReduxProvider";
import ClientLayout from "./components/client-layout"; // Import ClientLayout

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
  title: "Pulizie De Casa | Admin",
  description: "Developed by Genesis Home",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <FontAwesomeConfig />
      </head>
      <body className={`${latoBlack.variable} ${latoRegular.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <ClientLayout> {/* Wrap everything inside ClientLayout */}
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <div className="flex-1 overflow-auto" id="main-content">{children}</div>
                </div>
              </div>
            </ClientLayout>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
