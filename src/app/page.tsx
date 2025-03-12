import Cateories from "../components/hero/Cateories";
import Heroslid from "../components/hero/Heroslid";
import NewProduct from "../components/hero/NewProduct";
import Slide from "../components/hero/Slide";
import Navbars from "../components/navbar/Navbars";

export default function Home() {
  return (
    <>
    <Navbars />
    <Heroslid />
    <Slide />
    <NewProduct />
    <Cateories />
    </>
  );
}
