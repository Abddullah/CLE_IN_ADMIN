"use client";
import ScrollReset from "./scroll-reset";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ScrollReset />
      {children}
    </>
  );
};

export default ClientLayout;
