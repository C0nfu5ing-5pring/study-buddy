import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BackButton from "../../components/BackButton";

const OhmPractical = () => {
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(1000);
  const [graphData, setGraphData] = useState([]);

  const current = voltage / resistance;

  const Imax = 0.05;
  const normalized = Math.min(current / Imax, 1);
  const needleAngle = -60 + normalized * 120;

  const recordReading = () => {
    setGraphData((prev) => [
      ...prev,
      { voltage, current: voltage / resistance },
    ]);
  };

  const clearReadings = () => {
    setGraphData([]);
  };

  let slope = null;
  let experimentalR = null;

  if (graphData.length >= 2) {
    const first = graphData[0];
    const last = graphData[graphData.length - 1];
    const deltaV = last.voltage - first.voltage;
    const deltaI = last.current - first.current;

    if (deltaV !== 0) {
      slope = deltaI / deltaV;
      experimentalR = 1 / slope;
    }
  }

  return (
    <div className="min-h-screen bg-white p-6 lg:p-10 font-sans text-gray-900">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-semibold">
          Ohm's Law Experiment
        </h1>
        <BackButton />
      </header>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <section className="flex-1 border border-gray-300 rounded-xl p-5 shadow-sm bg-white flex flex-col items-center">
          <p className="text-lg font-medium mb-4">
            Current: <span className="font-bold">{current.toFixed(4)} A</span>
          </p>

          <div className="w-full max-w-md">
            <svg
              viewBox="0 0 320 200"
              className="w-full h-auto rounded-lg border border-gray-200 bg-white"
            >
              <rect x="20" y="70" width="30" height="60" fill="#000" rx="5" />
              <text x="35" y="65" fontSize="12" textAnchor="middle">
                {voltage} V
              </text>

              <line x1="50" y1="100" x2="90" y2="100" stroke="#444" />

              <rect x="90" y="85" width="70" height="30" fill="#333" rx="6" />
              <text
                x="125"
                y="105"
                fontSize="12"
                textAnchor="middle"
                fill="#ccc"
              >
                {resistance} Ω
              </text>

              <line x1="160" y1="100" x2="200" y2="100" stroke="#444" />

              <circle cx="240" cy="100" r="22" stroke="#444" fill="#f9f9f9" />
              <text x="240" y="105" textAnchor="middle" fontSize="14">
                A
              </text>

              <g transform={`rotate(${needleAngle}, 240, 100)`}>
                <line
                  x1="240"
                  y1="100"
                  x2="240"
                  y2="80"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              </g>

              <line x1="262" y1="100" x2="290" y2="100" stroke="#444" />
              <line x1="290" y1="100" x2="290" y2="150" stroke="#444" />
              <line x1="290" y1="150" x2="20" y2="150" stroke="#444" />
              <line x1="20" y1="150" x2="20" y2="130" stroke="#444" />
            </svg>
          </div>
        </section>

        <aside className="w-full lg:w-[420px] border border-gray-300 rounded-xl p-5 shadow-sm bg-white flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium">Voltage (V)</label>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full accent-black"
            />
            <p className="text-xs text-gray-500">{voltage} V</p>
          </div>

          <div>
            <label className="text-sm font-medium">Resistance (Ω)</label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
              className="w-full accent-black"
            />
            <p className="text-xs text-gray-500">{resistance} Ω</p>
          </div>

          <button
            onClick={recordReading}
            className="border cursor-pointer active:scale-95 border-black py-2 rounded-md hover:bg-black hover:text-white transition"
          >
            Record Reading
          </button>

          <button
            onClick={clearReadings}
            className="border cursor-pointer active:scale-95 border-gray-400 py-2 rounded-md hover:bg-gray-900 hover:text-white transition"
          >
            Clear Readings
          </button>

          <div className="border-t pt-3 text-sm space-y-1">
            <p>
              <strong>Ohm’s Law:</strong> I = V / R
            </p>
            <p>Current = {current.toFixed(4)} A</p>

            {slope !== null && (
              <>
                <p>Slope: {slope.toFixed(6)} A/V</p>
                <p>Experimental R: {experimentalR.toFixed(2)} Ω</p>
              </>
            )}
          </div>
        </aside>
      </div>

      <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <XAxis dataKey="voltage" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#111"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OhmPractical;
