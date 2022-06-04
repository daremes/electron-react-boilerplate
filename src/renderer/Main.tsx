import { useEffect, useRef, useState } from 'react';

const canvasRenderer = (
  canvas: HTMLCanvasElement,
  container: HTMLDivElement
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No canvas');
  }
  console.log('boom');
  let sizeX = 0;
  let sizeY = 0;

  const scale = window.devicePixelRatio;

  const draw = (ts?: number) => {
    const time = ts as number;
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctx.font = `${canvas.height / 4}px Courier`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const x = sizeX / 2;
    const y = sizeY / 2;

    const textString = Number(time / 1000).toFixed(0);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.strokeText(textString, x, y);
    ctx.fillText(textString, x, y);
    window.requestAnimationFrame(draw);
  };

  const onResize = () => {
    sizeX = container.clientWidth;
    sizeY = sizeX * (9 / 16);

    canvas.style.width = `${sizeX}px`;
    canvas.style.height = `${sizeY}px`;

    canvas.width = Math.floor(sizeX * scale);
    canvas.height = Math.floor(sizeY * scale);

    ctx.scale(scale, scale);
    draw();
  };

  window.addEventListener('resize', onResize);

  onResize();
};

const Main = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || initialized) {
      return;
    }
    canvasRenderer(canvasRef.current, containerRef.current);
    setInitialized(true);
  }, [initialized]);

  return (
    <div className="container" ref={containerRef}>
      <canvas className="mainCanvas" ref={canvasRef} />
    </div>
  );
};

export default Main;
