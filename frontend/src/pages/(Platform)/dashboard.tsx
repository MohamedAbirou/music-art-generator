import { MusicForm } from "./_components/music-form";
import { Navbar } from "./_components/navbar";

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center py-10">
        <div className="w-full mx-3">
          <MusicForm />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
