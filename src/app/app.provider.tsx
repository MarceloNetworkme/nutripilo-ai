import { ToastContainer } from "react-toastify";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <>
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />{children}</>;
};
