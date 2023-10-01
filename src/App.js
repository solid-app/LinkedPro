import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";


/*________________________________________________________________________________*/

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={ <Home />} />
      </Routes>
    </div>
  );
}
export default App;

/*________________________________________________________________________________*/
