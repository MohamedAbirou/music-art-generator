import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/(Marketing)/home";
import Layout from "./layouts/layout";
import Login from "./pages/(auth)/(routes)/login";
import Register from "./pages/(auth)/(routes)/register";
import { useEffect } from "react";

function App() {
  const loadFont = async (fontName: string, fontURL: string) => {
    const font = new FontFace(fontName, `url(${fontURL})`);
    await font.load();
    document.fonts.add(font);
  };

  useEffect(() => {
    loadFont("Athletics", "/fonts/Athletics-Regular.otf");
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<>Navigate to</>} />
      </Routes>
    </Router>
  );
}

export default App;
