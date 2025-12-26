import { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BackButton from "../../components/BackButton";

const PendulumPractical = () => {
  const [length, setLength] = useState(1);
  const [angle, setAngle] = useState(10);
  const [currentAngle, setCurrentAngle] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [damping, setDamping] = useState(false);
  const [dampingCoefficient, setDampingCoefficient] = useState(0.1);
  const [readings, setReadings] = useState([]);

  const g = 9.8;
  const lengthPx = length * 100;

  const timeRef = useRef(0);
  const requestRef = useRef(null);

  const animate = () => {
    timeRef.current += 0.02;
    let theta;

    if (damping) {
      theta =
        angle *
        Math.exp(-dampingCoefficient * timeRef.current) *
        Math.cos(Math.sqrt(g / length) * timeRef.current);
    } else {
      theta = angle * Math.cos(Math.sqrt(g / length) * timeRef.current);
    }

    setCurrentAngle(theta);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, angle, length, damping, dampingCoefficient]);

  const reset = () => {
    cancelAnimationFrame(requestRef.current);
    timeRef.current = 0;
    setIsRunning(false);
    setCurrentAngle(angle);
  };

  const recordReading = () => {
    const T = damping
      ? (2 * Math.PI) /
        Math.sqrt(g / length - Math.pow(dampingCoefficient / 2, 2))
      : 2 * Math.PI * Math.sqrt(length / g);

    setReadings((prev) => [...prev, { length, T, T2: T * T }]);
  };

  const clearReadings = () => setReadings([]);

  return (
    <div className="min-h-screen bg-white p-6 font-sans text-gray-900">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Simple Pendulum Experiment</h1>
        <BackButton />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="border border-gray-200 rounded-xl p-4 flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-full max-w-md">
            <circle cx="150" cy="40" r="5" fill="black" />
            <g transform={`rotate(${currentAngle}, 150, 40)`}>
              <line
                x1="150"
                y1="40"
                x2="150"
                y2={40 + lengthPx}
                stroke="black"
                strokeWidth="2"
              />
              <circle cx="150" cy={40 + lengthPx + 15} r="15" fill="black" />
            </g>
          </svg>
        </section>

        <aside className="border border-gray-200 rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Length (m)</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-1 rounded bg-gray-200 cursor-pointer"
              style={{ accentColor: "#000" }}
            />
            <p className="text-xs text-gray-500 mt-1">{length} m</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Initial Angle (°)
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={angle}
              onChange={(e) => {
                setAngle(Number(e.target.value));
                setCurrentAngle(Number(e.target.value));
              }}
              className="w-full h-1 rounded bg-gray-200 cursor-pointer"
              style={{ accentColor: "#000" }}
            />
            <p className="text-xs text-gray-500 mt-1">{angle}°</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Damping Coefficient
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={dampingCoefficient}
              onChange={(e) => setDampingCoefficient(Number(e.target.value))}
              disabled={!damping}
              className="w-full h-1 rounded bg-gray-200 cursor-pointer"
              style={{ accentColor: "#000" }}
            />
            <p className="text-xs text-gray-500 mt-1">
              {dampingCoefficient.toFixed(2)}
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={damping}
              onChange={() => setDamping(!damping)}
              className="cursor-pointer"
            />
            Enable Damping
          </label>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setIsRunning(true)}
              disabled={isRunning}
              className="border bg-neutral-900 cursor-pointer text-white active:scale-95  py-2 rounded-md text-sm font-medium hover:bg-black hover:text-white transition disabled:opacity-50"
            >
              Start
            </button>

            <button
              onClick={reset}
              className="border bg-neutral-900 cursor-pointer text-white active:scale-95  py-2 rounded-md text-sm hover:bg-gray-900 hover:text-white transition"
            >
              Reset
            </button>

            <button
              onClick={recordReading}
              disabled={isRunning}
              className="border bg-neutral-900 cursor-pointer text-white active:scale-95  py-2 rounded-md text-sm hover:bg-black hover:text-white transition disabled:opacity-50"
            >
              Record
            </button>

            <button
              onClick={clearReadings}
              className="border bg-neutral-900 cursor-pointer text-white active:scale-95  py-2 rounded-md text-sm hover:bg-gray-900 hover:text-white transition"
            >
              Clear
            </button>
          </div>

          <div className="pt-3 border-t text-sm">
            Time Period: {(2 * Math.PI * Math.sqrt(length / g)).toFixed(2)} s
          </div>
        </aside>
      </div>

      {/* TABLE */}
      <div className="mt-8 border border-gray-200 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Observations</h2>

        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-2">Length (m)</th>
              <th className="border p-2">T (s)</th>
              <th className="border p-2">T² (s²)</th>
            </tr>
          </thead>
          <tbody>
            {readings.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="border p-2 text-center text-gray-500"
                >
                  No readings yet
                </td>
              </tr>
            ) : (
              readings.map((r, i) => (
                <tr key={i}>
                  <td className="border p-2 text-center">{r.length}</td>
                  <td className="border p-2 text-center">{r.T.toFixed(2)}</td>
                  <td className="border p-2 text-center">{r.T2.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* GRAPH */}
      <div className="mt-8 border border-gray-200 rounded-xl p-4 h-72">
        <h2 className="text-lg font-semibold mb-3">Length vs T²</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={readings}>
            <XAxis dataKey="length" />
            <YAxis />
            <Tooltip />
            <Line dataKey="T2" stroke="#000" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PendulumPractical;
