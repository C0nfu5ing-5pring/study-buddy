import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Physics from "./pages/Physics";
import Chemistry from "./pages/Chemistry";
import Biology from "./pages/Biology";
import NotFound from "./pages/NotFound";
import ReactionRateAndCollisionTheory from "./pages/Theories/ReactionRateAndCollisionTheory.jsx";
import ReactionRateAndCollisionTheoryPractical from "./pages/Practicals/ReactionRateAndCollisionTheoryPractical.jsx";
import ElectrolysisTheory from "./pages/Theories/ElectrolysisTheory.jsx";
import ElectrolysisPractical from "./pages/Practicals/ElectrolysisPractical.jsx";
import TitrationTheory from "./pages/Theories/TitrationTheory.jsx";
import TitrationPractical from "./pages/Practicals/TitrationPractical.jsx";
import PendulumTheory from "./pages/Theories/PendulumTheory.jsx";
import PendulumPractical from "./pages/Practicals/PendulumPractical.jsx";
import OhmTheory from "./pages/Theories/OhmTheory.jsx";
import OhmPractical from "./pages/Practicals/OhmPractical.jsx";
import RefractionTheory from "./pages/Theories/RefractionTheory.jsx";
import RefractionPractical from "./pages/Practicals/RefractionPractical.jsx";
import EvolutionTheory from "./pages/Theories/EvolutionTheory.jsx";
import EvolutionPractical from "./pages/Practicals/EvolutionPractical.jsx";

const Directions = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/physics" element={<Physics />} />
        <Route path="/chemistry" element={<Chemistry />} />
        <Route path="/biology" element={<Biology />} />
        <Route
          path="/chemistry/reaction-rate-and-collision-theory"
          element={<ReactionRateAndCollisionTheory />}
        />
        <Route
          path="/chemistry/reaction-rate-and-collision-theory-practical"
          element={<ReactionRateAndCollisionTheoryPractical />}
        />
        <Route
          path="/chemistry/electrolysis-of-water-theory"
          element={<ElectrolysisTheory />}
        />
        <Route
          path="/chemistry/electrolysis-of-water-practical"
          element={<ElectrolysisPractical />}
        />
        <Route
          path="/chemistry/acid-base-titration-theory"
          element={<TitrationTheory />}
        />
        <Route
          path="/chemistry/acid-base-titration-practical"
          element={<TitrationPractical />}
        />
        <Route path="/physics/pendulum-theory" element={<PendulumTheory />} />
        <Route
          path="/physics/pendulum-practical"
          element={<PendulumPractical />}
        />
        <Route path="/physics/ohms-law-theory" element={<OhmTheory />} />
        <Route path="/physics/ohms-law-practical" element={<OhmPractical />} />
        <Route
          path="/physics/refraction-theory"
          element={<RefractionTheory />}
        />
        <Route
          path="/physics/refraction-practical"
          element={<RefractionPractical />}
        />
        <Route path="/biology/evolution-theory" element={<EvolutionTheory />} />
        <Route
          path="/biology/evolution-practical"
          element={<EvolutionPractical />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Directions;
