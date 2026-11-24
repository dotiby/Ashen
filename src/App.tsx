import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Narrative } from "./components/Narrative";
import { ThroneGame } from "./components/ThroneGame";
import { TokenInfo } from "./components/TokenInfo";

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ThroneGame />
        <Narrative />
        <TokenInfo />
      </main>
      <Footer />
    </>
  );
}

export default App;
