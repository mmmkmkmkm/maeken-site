import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Works } from "./components/Works";
import { BonusStage } from "./components/BonusStage";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollHpBar } from "./components/ScrollHpBar";
import { CorgiCrossing } from "./components/CorgiCrossing";
import { HiddenCommand } from "./components/HiddenCommand";
import { BgmToggle } from "./components/BgmToggle";
import { useReveal } from "./hooks/useReveal";
import { useTimeTint } from "./hooks/useTimeTint";

function App() {
  useReveal();
  const timeBand = useTimeTint();

  return (
    <>
      <Nav />
      <ScrollHpBar sunset={timeBand === "sunset"} />
      <main>
        <Hero />
        <Works />
        <BonusStage />
        <About />
        <Gallery />
        <Services />
        <Contact />
        <HiddenCommand />
      </main>
      <Footer />
      <CorgiCrossing />
      <BgmToggle />
    </>
  );
}

export default App;
