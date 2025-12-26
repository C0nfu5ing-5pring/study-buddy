import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BackButton from "../../components/BackButton";

const BOX_SIZE = 280;
const PARTICLE_SIZE = 10;
const COLLISION_DISTANCE = 16;
const GLOW_TIME = 120;
const MASS = 1;
const MAX_PARTICLES = 15;

const ReactionRateAndCollisionTheoryPractical = () => {
  const [particles, setParticles] = useState([]);
  const [particleCount, setParticleCount] = useState(10);
  const [temperature, setTemperature] = useState(30);
  const [activationEnergy, setActivationEnergy] = useState(15);
  const [catalyst, setCatalyst] = useState(false);

  const [reactionRate, setReactionRate] = useState(0);
  const [lineData, setLineData] = useState([]);

  const animationRef = useRef();
  const timeRef = useRef(0);
  const rateAccumulator = useRef(0);
  const lastSecondRef = useRef(Date.now());

  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const speed = temperature / 18 + 0.6;

    const fresh = Array.from(
      { length: Math.min(particleCount, MAX_PARTICLES) },
      () => {
        const a = Math.random() * Math.PI * 2;
        return {
          id: nanoid(),
          x: Math.random() * (BOX_SIZE - PARTICLE_SIZE),
          y: Math.random() * (BOX_SIZE - PARTICLE_SIZE),
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          lastCollision: 0,
        };
      }
    );

    setParticles(fresh);
    setReactionRate(0);
    setLineData([]);
    rateAccumulator.current = 0;
    timeRef.current = 0;
  }, [particleCount, temperature]);

  useEffect(() => {
    const update = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let x = p.x + p.vx;
          let y = p.y + p.vy;
          let vx = p.vx;
          let vy = p.vy;

          if (x <= 0 || x >= BOX_SIZE - PARTICLE_SIZE) vx *= -1;
          if (y <= 0 || y >= BOX_SIZE - PARTICLE_SIZE) vy *= -1;

          return {
            ...p,
            x: Math.min(Math.max(x, 0), BOX_SIZE - PARTICLE_SIZE),
            y: Math.min(Math.max(y, 0), BOX_SIZE - PARTICLE_SIZE),
            vx,
            vy,
          };
        })
      );

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const Ea = catalyst ? activationEnergy * 0.5 : activationEnergy;

      setParticles((prev) => {
        const arr = [...prev];

        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            const a = arr[i];
            const b = arr[j];

            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < COLLISION_DISTANCE) {
              const KE =
                0.5 *
                MASS *
                ((Math.hypot(a.vx, a.vy) + Math.hypot(b.vx, b.vy)) / 2) ** 2;

              if (KE >= Ea) {
                a.lastCollision = now;
                b.lastCollision = now;
                rateAccumulator.current += 1;
              }
            }
          }
        }

        return arr;
      });

      if (now - lastSecondRef.current >= 1000) {
        setReactionRate(rateAccumulator.current);

        setLineData((prev) => [
          ...prev.slice(-20),
          { time: timeRef.current++, rate: rateAccumulator.current },
        ]);

        rateAccumulator.current = 0;
        lastSecondRef.current = now;
      }
    }, 200);

    return () => clearInterval(interval);
  }, [activationEnergy, catalyst]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Reaction Rate & Collision Theory
          </h1>
          <BackButton />
        </div>

        <div className="flex justify-center">
          <div
            className="relative border border-gray-300 rounded-lg overflow-hidden"
            style={{ width: BOX_SIZE, height: BOX_SIZE }}
          >
            {particles.map((p) => {
              const glow = Date.now() - p.lastCollision < GLOW_TIME;
              return (
                <div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: PARTICLE_SIZE,
                    height: PARTICLE_SIZE,
                    left: p.x,
                    top: p.y,
                    background: "#111",
                    transform: glow ? "scale(1.3)" : "scale(1)",
                    boxShadow: glow ? "0 0 8px rgba(0,0,0,0.4)" : "none",
                    transition: "transform 0.12s ease",
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-xl p-6 space-y-5">
            {[
              ["Particles", particleCount, setParticleCount, 5, MAX_PARTICLES],
              ["Temperature", temperature, setTemperature, 0, 100],
              [
                "Activation Energy",
                activationEnergy,
                setActivationEnergy,
                5,
                40,
              ],
            ].map(([label, val, setter, min, max]) => (
              <label key={label} className="block">
                <span className="text-sm font-medium">
                  {label}: {val}
                </span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={val}
                  onChange={(e) => setter(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded accent-black"
                />
              </label>
            ))}

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={catalyst}
                onChange={() => setCatalyst(!catalyst)}
              />
              Catalyst (Lowers Ea)
            </label>

            <div className="pt-3 border-t text-sm">
              Reaction Rate: <strong>{reactionRate}</strong> / sec
            </div>
          </div>

          <div className="border border-gray-300 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={lineData}>
                <XAxis dataKey="time" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#000"
                  fill="#000"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionRateAndCollisionTheoryPractical;
