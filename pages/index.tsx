import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Dashboard from "./Admin/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
}
