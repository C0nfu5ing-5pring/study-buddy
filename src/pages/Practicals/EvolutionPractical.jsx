import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";

const EvolutionPractical = () => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const creaturesRef = useRef([]);
  const animationRef = useRef(null);
  const generationTimerRef = useRef(null);
  const creatureIdRef = useRef(0);

  const environmentRef = useRef("forest");
  const mutationRateRef = useRef(0.1);
  const infectionRateRef = useRef(0.05);
  const recoveryRateRef = useRef(0.1);

  const [environment, setEnvironment] = useState("forest");
  const [mutationRate, setMutationRate] = useState(0.1);
  const [generation, setGeneration] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [populationSize, setPopulationSize] = useState(40);
  const [avgFitness, setAvgFitness] = useState(0);
  const [infectionRate, setInfectionRate] = useState(0.05);
  const [recoveryRate, setRecoveryRate] = useState(0.1);

  // NEW: Track if screen is small (less than 768px)
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const generateAmoebaPoints = (numPoints = 12) => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const radiusOffset = 0.8 + Math.random() * 0.4;
      points.push({ angle, radiusOffset });
    }
    return points;
  };

  const createCreature = (canvasWidth, canvasHeight) => ({
    id: creatureIdRef.current++,
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: 10 + Math.random() * 6,
    colorValue: Math.random(),
    height: 0.5 + Math.random(),
    weight: 0.5 + Math.random(),
    bodyScale: 0.8 + Math.random() * 0.4,
    fitness: 0,
    diseaseStatus: Math.random() < 0.05,
    amoebaPoints: generateAmoebaPoints(),
    infectedDuration: 0,
  });

  const createCreatures = (count, canvasWidth, canvasHeight) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(createCreature(canvasWidth, canvasHeight));
    }
    return arr;
  };

  const calculateFitness = (creature) => {
    let colorPref, heightPref, weightPref;

    switch (environmentRef.current) {
      case "desert":
        colorPref = 0.7;
        heightPref = 1.2;
        weightPref = 0.4;
        break;
      case "snow":
        colorPref = 0.9;
        heightPref = 0.7;
        weightPref = 0.6;
        break;
      default:
        colorPref = 0.5;
        heightPref = 1.0;
        weightPref = 0.5;
    }

    const colorFit = 1 - Math.abs(creature.colorValue - colorPref);
    const heightFit = 1 - Math.abs(creature.height - heightPref);
    const weightFit = 1 - Math.abs(creature.weight - weightPref);

    const diseasePenalty = creature.diseaseStatus ? 0.3 : 1;

    return Math.max(
      0,
      (colorFit * 0.5 + heightFit * 0.3 + weightFit * 0.2) * diseasePenalty
    );
  };

  const updateFitness = () => {
    creaturesRef.current.forEach((c) => {
      c.fitness = calculateFitness(c);
    });

    const totalFitness = creaturesRef.current.reduce(
      (acc, c) => acc + c.fitness,
      0
    );
    setAvgFitness(totalFitness / creaturesRef.current.length);
  };

  const spreadDisease = () => {
    const spreadRadius = 30;
    const infectionRate = infectionRateRef.current;

    for (const c of creaturesRef.current) {
      if (!c.diseaseStatus) {
        for (const other of creaturesRef.current) {
          if (other !== c && other.diseaseStatus) {
            const dist = Math.hypot(c.x - other.x, c.y - other.y);
            if (dist < spreadRadius && Math.random() < infectionRate) {
              c.diseaseStatus = true;
              c.infectedDuration = 0;
              break;
            }
          }
        }
      }
    }
  };

  const recoverDisease = () => {
    const recoveryRate = recoveryRateRef.current;
    for (const c of creaturesRef.current) {
      if (c.diseaseStatus && Math.random() < recoveryRate) {
        c.diseaseStatus = false;
        c.infectedDuration = 0;
      }
    }
  };

  const removeDeadCreatures = () => {
    const recoveryRate = recoveryRateRef.current;
    if (recoveryRate === 0) {
      const maxInfectedDuration = 5;
      creaturesRef.current = creaturesRef.current.filter((c) => {
        if (c.diseaseStatus) {
          c.infectedDuration = (c.infectedDuration || 0) + 1;
          return c.infectedDuration <= maxInfectedDuration;
        }
        return true;
      });
    }
  };

  const evolveGeneration = (canvas) => {
    spreadDisease();
    recoverDisease();
    removeDeadCreatures();
    updateFitness();

    creaturesRef.current.sort((a, b) => b.fitness - a.fitness);

    const survivors = creaturesRef.current.slice(
      0,
      Math.floor(creaturesRef.current.length / 2)
    );
    const offspringCount = creaturesRef.current.length - survivors.length;
    const offspring = [];

    for (let i = 0; i < offspringCount; i++) {
      const parentA = survivors[Math.floor(Math.random() * survivors.length)];
      const parentB = survivors[Math.floor(Math.random() * survivors.length)];

      let childColor = (parentA.colorValue + parentB.colorValue) / 2;
      let childHeight = (parentA.height + parentB.height) / 2;
      let childWeight = (parentA.weight + parentB.weight) / 2;
      let childDisease = parentA.diseaseStatus || parentB.diseaseStatus;

      if (Math.random() < mutationRateRef.current) {
        childColor += (Math.random() - 0.5) * 0.2;
        childColor = Math.min(1, Math.max(0, childColor));
      }
      if (Math.random() < mutationRateRef.current) {
        childHeight += (Math.random() - 0.5) * 0.4;
        childHeight = Math.min(1.5, Math.max(0.5, childHeight));
      }
      if (Math.random() < mutationRateRef.current) {
        childWeight += (Math.random() - 0.5) * 0.4;
        childWeight = Math.min(1.5, Math.max(0.5, childWeight));
      }

      if (Math.random() < mutationRateRef.current * 0.5) {
        childDisease = !childDisease;
      }

      offspring.push({
        id: creatureIdRef.current++,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 10 + Math.random() * 6,
        colorValue: childColor,
        height: childHeight,
        weight: childWeight,
        bodyScale: 0.8 + Math.random() * 0.4,
        fitness: 0,
        diseaseStatus: childDisease,
        amoebaPoints: generateAmoebaPoints(),
        infectedDuration: 0,
      });
    }

    creaturesRef.current = [...survivors, ...offspring];
    setGeneration((g) => g + 1);
  };

  const drawAmoeba = (ctx, c) => {
    const angle = Math.atan2(c.vy, c.vx);
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(angle * 0.1);

    const baseRadius = c.radius * c.bodyScale;

    ctx.beginPath();

    const points = c.amoebaPoints.map(({ angle: ptAngle, radiusOffset }) => {
      const r = baseRadius * radiusOffset;
      const x = r * Math.cos(ptAngle);
      const y = r * Math.sin(ptAngle) * c.height;
      return { x, y };
    });

    const len = points.length;
    for (let i = 0; i < len; i++) {
      const p0 = points[i];
      const p1 = points[(i + 1) % len];
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      if (i === 0) {
        ctx.moveTo(midX, midY);
      }
      ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
    }
    ctx.closePath();

    ctx.shadowColor = c.diseaseStatus ? "red" : "limegreen";
    ctx.shadowBlur = c.fitness * 15;

    const dark = c.diseaseStatus
      ? { r: 150, g: 30, b: 30 }
      : { r: 34, g: 139, b: 34 };
    const light = c.diseaseStatus
      ? { r: 255, g: 100, b: 100 }
      : { r: 180, g: 255, b: 180 };
    const r = dark.r + (light.r - dark.r) * c.colorValue;
    const g = dark.g + (light.g - dark.g) * c.colorValue;
    const b = dark.b + (light.b - dark.b) * c.colorValue;
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fill();

    ctx.shadowBlur = 0;

    const eyeY = -c.radius * 0.2;
    const eyeX = c.radius * 0.4;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(-eyeX, eyeY, c.radius * 0.25, 0, Math.PI * 2);
    ctx.arc(eyeX, eyeY, c.radius * 0.25, 0, Math.PI * 2);
    ctx.fill();

    const pupilOffsetX = Math.cos(angle) * 2;
    const pupilOffsetY = Math.sin(angle) * 2;
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(
      -eyeX + pupilOffsetX,
      eyeY + pupilOffsetY,
      c.radius * 0.1,
      0,
      Math.PI * 2
    );
    ctx.arc(
      eyeX + pupilOffsetX,
      eyeY + pupilOffsetY,
      c.radius * 0.1,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.restore();
  };

  useEffect(() => {
    if (isSmallScreen) return;

    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    creatureIdRef.current = 0;
    creaturesRef.current = createCreatures(
      populationSize,
      canvas.width,
      canvas.height
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      creaturesRef.current.forEach((c) => {
        c.x += c.vx * (1 - (c.weight - 0.5));
        c.y += c.vy * (1 - (c.weight - 0.5));

        if (c.x <= c.radius || c.x >= canvas.width - c.radius) c.vx *= -1;
        if (c.y <= c.radius || c.y >= canvas.height - c.radius) c.vy *= -1;

        drawAmoeba(ctx, c);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    clearInterval(generationTimerRef.current);
    if (isRunning) {
      generationTimerRef.current = setInterval(() => {
        evolveGeneration(canvas);
      }, 8000);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(generationTimerRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [
    isRunning,
    populationSize,
    environment,
    mutationRate,
    infectionRate,
    recoveryRate,
    isSmallScreen,
  ]);

  useEffect(() => {
    if (isSmallScreen) return;

    const canvas = canvasRef.current;
    if (canvas) {
      creatureIdRef.current = 0;
      creaturesRef.current = createCreatures(
        populationSize,
        canvas.width,
        canvas.height
      );
      setGeneration(1);
      setAvgFitness(0);
    }
  }, [populationSize, isSmallScreen]);

  useEffect(() => {
    environmentRef.current = environment;
    creaturesRef.current.forEach((c) => {
      c.fitness = calculateFitness(c);
    });
  }, [environment]);

  useEffect(() => {
    mutationRateRef.current = mutationRate;
  }, [mutationRate]);

  useEffect(() => {
    infectionRateRef.current = infectionRate;
  }, [infectionRate]);

  useEffect(() => {
    recoveryRateRef.current = recoveryRate;
  }, [recoveryRate]);

  if (isSmallScreen) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center w-screen h-screen bg-white text-center p-6">
        <p className="text-lg font-semibold text-red-600 max-w-md">
          This experiment is not available on smaller devices. Please use a
          larger screen for the full experience.
        </p>
        <BackButton />
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen bg-white font-sans text-gray-900">
      <div
        ref={canvasContainerRef}
        className="flex-grow p-8 bg-gray-50 border-r border-gray-200"
        style={{ minWidth: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-md shadow-sm border border-gray-200"
        />
      </div>

      <aside className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col overflow-y-auto shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold select-none">Controls</h2>
          <BackButton />
        </div>

        <div className="space-y-5 flex-grow">
          <div>
            <label
              htmlFor="environment"
              className="block font-semibold mb-1 text-gray-700"
            >
              Environment
            </label>
            <select
              id="environment"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              disabled={!isRunning}
            >
              <option value="forest">Forest</option>
              <option value="desert">Desert</option>
              <option value="snow">Snow</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="mutationRate"
              className="block font-semibold mb-1 text-gray-700"
            >
              Mutation Rate: {(mutationRate * 100).toFixed(1)}%
            </label>
            <input
              type="range"
              id="mutationRate"
              min="0"
              max="0.3"
              step="0.01"
              value={mutationRate}
              onChange={(e) => setMutationRate(parseFloat(e.target.value))}
              className="w-full h-1 rounded-full bg-gray-300 cursor-pointer appearance-none"
              disabled={!isRunning}
              style={{
                accentColor: "black",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="infectionRate"
              className="block font-semibold mb-1 text-gray-700"
            >
              Infection Rate: {(infectionRate * 100).toFixed(1)}%
            </label>
            <input
              type="range"
              id="infectionRate"
              min="0"
              max="1"
              step="0.01"
              value={infectionRate}
              onChange={(e) => setInfectionRate(parseFloat(e.target.value))}
              className="w-full h-1 rounded-full bg-gray-300 cursor-pointer appearance-none"
              disabled={!isRunning}
              style={{
                accentColor: "black",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="recoveryRate"
              className="block font-semibold mb-1 text-gray-700"
            >
              Recovery Rate: {(recoveryRate * 100).toFixed(1)}%
            </label>
            <input
              type="range"
              id="recoveryRate"
              min="0"
              max="1"
              step="0.01"
              value={recoveryRate}
              onChange={(e) => setRecoveryRate(parseFloat(e.target.value))}
              className="w-full h-1 rounded-full bg-gray-300 cursor-pointer appearance-none"
              disabled={!isRunning}
              style={{
                accentColor: "black",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="populationSize"
              className="block font-semibold mb-1 text-gray-700"
            >
              Population Size: {populationSize}
            </label>
            <input
              type="range"
              id="populationSize"
              min="10"
              max="100"
              step="1"
              value={populationSize}
              onChange={(e) => setPopulationSize(parseInt(e.target.value))}
              className="w-full h-1 rounded-full bg-gray-300 cursor-pointer appearance-none"
              disabled={!isRunning}
              style={{
                accentColor: "black",
              }}
            />
          </div>
        </div>

        <button
          onClick={() => setIsRunning((r) => !r)}
          className={`mt-6 cursor-pointer active:scale-95 transition-all py-2 rounded-md font-semibold bg-black text-white border border-black`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <div className="mt-6 text-center text-gray-600 space-y-1">
          <p>
            <span className="font-semibold text-gray-800">Generation:</span>{" "}
            {generation}
          </p>
          <p>
            <span className="font-semibold text-gray-800">
              Average Fitness:
            </span>{" "}
            {(avgFitness * 100).toFixed(1)}%
          </p>
        </div>
      </aside>
    </div>
  );
};

export default EvolutionPractical;
