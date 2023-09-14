import { GlobalStyles } from "./styles/GlobalStyles";
import { Header } from "./components/Header/index";
import { Orders } from "./components/Order/index";


export function App(){
  return(
    <>
    <GlobalStyles />
    <Header />
    <Orders />
    </>
  );
}
