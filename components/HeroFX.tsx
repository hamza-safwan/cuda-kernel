"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function HeroFX() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatedGradientBlobs />
      <ParticlesGraph />
    </div>
  );
}

function AnimatedGradientBlobs() {
  // Three soft, animated gradient circles
  return (
    <div className="absolute inset-0 -z-10 blur-3xl opacity-70">
      <motion.div
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.35), transparent 60%)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], rotate: [0, 20, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 -top-10 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle at center, rgba(236,72,153,0.30), transparent 60%)" }}
        animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 bottom-0 h-[28rem] w-[28rem] rounded-full"
        style={{ background: "radial-gradient(circle at center, rgba(34,197,94,0.25), transparent 60%)" }}
        animate={{ x: [0, 25, -25, 0], y: [0, -20, 10, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ParticlesGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let animationId = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const nodes = createNodes(48);

    function resize() {
      const { clientWidth, clientHeight } = canvas.parentElement!;
      canvas.width = Math.floor(clientWidth * DPR);
      canvas.height = Math.floor(clientHeight * DPR);
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
    }
    resize();
    window.addEventListener("resize", resize);

    function step() {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // color based on theme
      const dark = document.documentElement.classList.contains("dark");
      const color = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)";
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      // ease towards pointer for subtle parallax
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }

      // Draw connections
      const maxDist = 0.15;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const ax = (a.x + current.current.x) * width;
            const ay = (a.y + current.current.y) * height;
            const bx = (b.x + current.current.x) * width;
            const by = (b.y + current.current.y) * height;
            ctx.globalAlpha = 1 - Math.sqrt(d2) / maxDist;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.globalAlpha = 1;
      for (const n of nodes) {
        const x = (n.x + current.current.x) * width;
        const y = (n.y + current.current.y) * height;
        ctx.beginPath();
        ctx.arc(x, y, 2.5 * DPR, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(step);
    }
    step();

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.current.x = ((e.clientX - cx) / rect.width) * 0.05;
      target.current.y = ((e.clientY - cy) / rect.height) * 0.05;
    }
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
}

function createNodes(count: number) {
  const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.002,
    });
  }
  return nodes;
}
