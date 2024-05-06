import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/(Marketing)/home";
import Layout from "./layouts/layout";
import Login from "./pages/(auth)/(routes)/login";
import Register from "./pages/(auth)/(routes)/register";

function App() {
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
