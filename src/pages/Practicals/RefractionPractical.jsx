import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import BackButton from "../../components/BackButton";

const RefractionPractical = () => {
  const [incidentAngle, setIncidentAngle] = useState(30); // degrees
  const [refractiveIndex, setRefractiveIndex] = useState(1.5);

  const containerRef = useRef(null);

  // Helpers
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const refractionAngle = toDeg(
    Math.asin(Math.sin(toRad(incidentAngle)) / refractiveIndex)
  );

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-50 flex justify-center p-6 sm:p-12 font-sans"
    >
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-10 relative">
        {/* BackButton: hidden on small, absolute on md+ */}
        <div className="hidden md:block absolute top-4 right-4">
          <BackButton />
        </div>

        {/* BackButton: visible above card on small screens */}
        <div className="block md:hidden mb-4">
          <BackButton />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Refraction Through a Glass Slab
        </h1>

        {/* Diagram */}
        <div className="flex justify-center">
          <svg
            width="700"
            height="300"
            viewBox="0 0 700 300"
            className="border border-gray-200 rounded-md bg-white shadow-sm"
          >
            {/* Normal */}
            <line
              x1="350"
              y1="20"
              x2="350"
              y2="280"
              stroke="#9CA3AF" // Tailwind gray-400
              strokeDasharray="5 5"
            />

            {/* Glass Slab */}
            <rect
              x="350"
              y="50"
              width="180"
              height="200"
              fill="#bfdbfe"
              opacity="0.6"
              stroke="#3B82F6" // Tailwind blue-500
            />

            {/* Incident Ray */}
            <g transform={`rotate(${-incidentAngle}, 350, 150)`}>
              <line
                x1="100"
                y1="150"
                x2="350"
                y2="150"
                stroke="#EF4444" // Tailwind red-500
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* Refracted Ray */}
            <g transform={`rotate(${-refractionAngle}, 350, 150)`}>
              <line
                x1="350"
                y1="150"
                x2="530"
                y2="150"
                stroke="#10B981" // Tailwind green-500
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* Emergent Ray */}
            <g transform={`rotate(${-incidentAngle}, 530, 150)`}>
              <line
                x1="530"
                y1="150"
                x2="680"
                y2="150"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* Labels */}
            <text x="120" y="130" fontSize="14" fill="#EF4444" fontWeight="600">
              Incident Ray
            </text>
            <text x="380" y="130" fontSize="14" fill="#10B981" fontWeight="600">
              Refracted Ray
            </text>
            <text x="560" y="130" fontSize="14" fill="#EF4444" fontWeight="600">
              Emergent Ray
            </text>
            <text x="380" y="40" fontSize="14" fill="#374151" fontWeight="600">
              Glass Slab
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              label: "Angle of Incidence (i)",
              value: incidentAngle,
              setValue: setIncidentAngle,
              min: 0,
              max: 60,
              step: 1,
            },
            {
              label: "Refractive Index (μ)",
              value: refractiveIndex,
              setValue: setRefractiveIndex,
              min: 1.3,
              max: 1.8,
              step: 0.01,
            },
          ].map(({ label, value, setValue, min, max, step }) => (
            <div key={label} className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {label}
              </label>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded accent-black"
              />
              <p className="text-xs text-gray-500">{value.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Readings */}
        <div className="border-t border-gray-200 pt-6 space-y-2 text-gray-700 text-sm leading-relaxed">
          <p>
            <strong>Angle of Incidence (i):</strong> {incidentAngle.toFixed(2)}°
          </p>
          <p>
            <strong>Angle of Refraction (r):</strong>{" "}
            {refractionAngle.toFixed(2)}°
          </p>
          <p>
            <strong>Refractive Index (μ):</strong> {refractiveIndex.toFixed(2)}
          </p>
          <p className="italic text-gray-500">
            The emergent ray is parallel to the incident ray.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefractionPractical;
