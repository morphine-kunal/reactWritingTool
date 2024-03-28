import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Text from "./components/pages/text";
import BlockProvider from "./Store/block-provider";

function App() {
  return (
    <BlockProvider>
      <div>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/text" Component={Text} />
        </Routes>
      </div>
    </BlockProvider>
  );
}

export default App;
