import Blog from "@/components/blog";
import Facts from "@/components/facts";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Program from "@/components/program";
import Visit from "@/components/visit";

export default function Home() {
  return (
    <>
      <header className="col-start-1 col-end-6">
        <Navigation />
        <Header />
      </header>
      <Facts />
      <Blog id={1}/>
      <Blog id={2}/>
      <Program />
      <Visit />
      <Footer />
    </>
  );
}
