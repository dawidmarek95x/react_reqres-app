import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "../../atoms/Spinner/Spinner";

export const RootLayout = () => {
  return (
    <Suspense
      fallback={
        <Spinner
          containerClassName="flex justify-center items-center w-screen h-screen"
          size={100}
        />
      }
    >
      <Outlet />
    </Suspense>
  );
};
