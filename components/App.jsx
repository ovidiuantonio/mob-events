import Pages from "./Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Components/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className='site'>
        <Nav className='navSpace' />
        <Pages className='pagesSpace' />
      </div>
    </BrowserRouter>
  );
}

export default App;
