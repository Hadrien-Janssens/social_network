import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Setting from "./pages/Setting.jsx";
import Connexion from "./pages/Connexion.jsx";
import Profil from "./pages/Profil.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/connexion" element={<Connexion />}></Route>
          <Route path="/profil" element={<Profil />}></Route>
          <Route path="/createaccount" element={<CreateAccount />}></Route>
          {/* pour renvoyer quoi qu'il arrive sur la page d'accueil */}
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
