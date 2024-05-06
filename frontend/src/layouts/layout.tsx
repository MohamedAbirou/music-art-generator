import { Footer } from "../components/footer";
import { Header } from "../components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
