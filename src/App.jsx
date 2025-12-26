import { Analytics } from "@vercel/analytics/react";
import Directions from "./Directions";

const App = () => {
  return (
    <div>
      <Directions />
      <Analytics />
    </div>
  );
};

export default App;
