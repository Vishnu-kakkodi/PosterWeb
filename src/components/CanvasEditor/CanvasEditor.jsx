import { useEffect, useRef } from "react";
import * as fabric from "fabric";

const WIDTH = 600;
const HEIGHT = 350;

export default function CanvasEditor({ onReady }) {
  const canvasEl = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    if (!canvasEl.current || fabricRef.current) return;

    const canvas = new fabric.Canvas(canvasEl.current, {
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    canvas.setDimensions({ width: WIDTH, height: HEIGHT });

    fabricRef.current = canvas;
    onReady(canvas);

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []);

  return (
    <div className="flex justify-center bg-gray-100 p-4 rounded-lg">
      <canvas ref={canvasEl} />
    </div>
  );
}
