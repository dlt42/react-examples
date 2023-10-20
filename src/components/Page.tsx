import { FC } from "react";
import { useRoutes } from "../examples/hooks/custom-nav/useRoutes";

const Page: FC = (): JSX.Element => {
  const { NavRoutes } = useRoutes();
  return (
    <>
      <NavRoutes />
    </>
  );
}

export default Page;
