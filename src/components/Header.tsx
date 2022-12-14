import useNav from "../examples/hooks/custom-nav/useNav";
import './Header.module.css'

export interface AppNavProps {
  title: string
}

const AppNav: React.FC<AppNavProps> = ({ title }): JSX.Element => {
  const { Nav } = useNav();
  document.title = title;
  return (
    <>
      <h1>{title}</h1>
      <Nav />
    </>
  )
};

export default AppNav;