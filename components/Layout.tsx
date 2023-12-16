import Navbar from "./Navbar";

type prop = {
  children: React.ReactNode;
};
export default function Layout({ children }: prop) {
  return (
    <div className="min-h-screen bg-slate-300">
      <Navbar />
      {children}
    </div>
  );
}
