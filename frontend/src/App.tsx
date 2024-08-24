import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/(Marketing)/home";
import Layout from "./layouts/layout";
import Login from "./pages/(auth)/(routes)/login";
import Register from "./pages/(auth)/(routes)/register";
import { useEffect } from "react";
import DashboardPage from "./pages/(Platform)/dashboard";
import Cart from "./pages/(Platform)/cart";
import Page404 from "./pages/(errors)/404";
import Page403 from "./pages/(errors)/403";
import Page401 from "./pages/(errors)/401";
import Page419 from "./pages/(errors)/419";
import Page500 from "./pages/(errors)/500";

function App() {
  const loadFont = async (fontName: string, fontURL: string) => {
    const font = new FontFace(fontName, `url(${fontURL})`);
    await font.load();
    document.fonts.add(font);
  };

  useEffect(() => {
    loadFont("Athletics", "/fonts/Athletics-Regular.otf");
    loadFont("Sansita Swashed", "/fonts/SansitaSwashed-VariableFont_wght.ttf");
    loadFont("BioRhyme", "/fonts/BioRhyme-VariableFont_wdth,wght.ttf");
    loadFont("Dancing Script", "/fonts/DancingScript-VariableFont_wght.ttf");
    loadFont("Merienda", "/fonts/Merienda-VariableFont_wght.ttf");
    loadFont(
      "Sixtyfour",
      "/fonts/Sixtyfour-Regular-VariableFont_BLED,SCAN.ttf"
    );
    loadFont("Alkatra", "/fonts/Alkatra-VariableFont_wght.ttf");
    loadFont("Madimi One", "/fonts/MadimiOne-Regular.ttf");
    loadFont("Orbitron", "/fonts/Orbitron-VariableFont_wght.ttf");
    loadFont("Anton", "/fonts/Anton-Regular.ttf");
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/cart" element={<Cart />} />

        <Route path="/generate" element={<DashboardPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/401" element={<Page401 />} />
        <Route path="/403" element={<Page403 />} />
        <Route path="/419" element={<Page419 />} />
        <Route path="/500" element={<Page500 />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
