"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

type ToastType = "error" | "success" | "";

interface ToastState {
  show: boolean;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: ToastState;
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: {
    show: false,
    type: "",
    message: "",
  },
  showToast: () => {},
});

export const useToast = () => {
  const { showToast } = useContext(ToastContext);

  const error = (message: string) => showToast("error", message);
  const success = (message: string) => showToast("success", message);

  return { error, success };
};

export const useToastContext = () => useContext(ToastContext);

interface ToastContextProviderProps {
  children: ReactNode;
}

const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "",
    message: "",
  });

  const showToast = useCallback((type: ToastType, message: string) => {
    console.log("Showing toast:", type, message);
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 10000);
  }, []);

  const value = useMemo(() => ({ toast, showToast }), [toast, showToast]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
export default ToastContextProvider;
