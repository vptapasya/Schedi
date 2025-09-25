import Sidebar from "../../components/sidebar";



export const metadata = {
  title: "Schedi - Static Prototype",
  description: "Static pages for the Schedi prototype",
};

export default function Layout({ children }) {
  return (
      <div className="flex max-w-screen">
        <Sidebar />
          {children}
      </div>
  );
}
