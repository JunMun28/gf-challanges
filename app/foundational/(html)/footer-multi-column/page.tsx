"use client";
import Footer from "@/components/Footer";
import Toast from "@/components/ui/Toast";
import ToastContextProvider, { useToastContext } from "@/context/ToastContext";
import clsx from "clsx";

function FooterContent() {
  const { toast } = useToastContext();

  return (
    <main className="min-h-screen p-4">
      {toast.show && <Toast type={toast.type} message={toast.message} />}
      <div
        className={clsx(
          "min-h-[calc(100vh_-_32px)] rounded-md bg-white",
          "shadow-sm md:shadow-md lg:shadow-lg",
          "flex items-center"
        )}
      >
        <section className={clsx("w-full", "md:py-[116px] lg:py-[65px]")}>
          <Footer />
        </section>
      </div>
    </main>
  );
}

export default function FooterMultiColumn() {
  return (
    <ToastContextProvider>
      <FooterContent />
    </ToastContextProvider>
  );
}
