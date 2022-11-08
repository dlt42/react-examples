import React from "react";
import { useRoutes } from "../examples/hooks/custom-nav/useRoutes";

const Page: React.FC = (): JSX.Element => {
  const { NavRoutes } = useRoutes();
  return (
    <>
      <NavRoutes />
    </>
  );
}

export default Page;
