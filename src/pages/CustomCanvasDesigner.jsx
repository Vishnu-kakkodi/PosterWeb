import { useRef, useState, useEffect } from "react";
import { 
  Save, Download, Share2, Undo, Redo, Trash2, 
  Square, Circle, Minus, Type, Pencil, Eraser, 
  PaintBucket, Move, ZoomIn, ZoomOut, Sparkles 
} from "lucide-react";

const CANVAS_PRESETS = {
  "Visiting Card": { width: 1050, height: 600, label: "3.5\" × 2\" (Visiting Card)" },
  "Wedding Card": { width: 1500, height: 2100, label: "5\" × 7\" (Wedding Card)" },
  "Birthday Card": { width: 1800, height: 1200, label: "6\" × 4\" (Birthday Card)" },
  "Bottom Bar": { width: 2000, height: 400, label: "Bottom Bar Design" },
  "Social Media Post": { width: 1080, height: 1080, label: "1080 × 1080 (Instagram)" },
  "Custom": { width: 1200, height: 800, label: "Custom Size" },
};

const TOOLS = {
  MOVE: 'move',
  PENCIL: 'pencil',
  LINE: 'line',
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  TEXT: 'text',
  ERASER: 'eraser',
  FILL: 'fill',
};

export default function CustomCanvasDesigner() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  
  // Canvas settings
  const [selectedPreset, setSelectedPreset] = useState("Visiting Card");
  const [canvasSize, setCanvasSize] = useState(CANVAS_PRESETS["Visiting Card"]);
  const [customWidth, setCustomWidth] = useState(1200);
  const [customHeight, setCustomHeight] = useState(800);
  
  // Drawing state
  const [tool, setTool] = useState(TOOLS.PENCIL);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  // History for undo/redo
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  
  // Background
  const [bgColor, setBgColor] = useState("#ffffff");
  
  // Text tool
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [textPos, setTextPos] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(24);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const context = canvas.getContext('2d');
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    setCtx(context);
    
    saveToHistory();
  }, [canvasSize]);

  // Update background color
  useEffect(() => {
    if (!ctx) return;
    const canvas = canvasRef.current;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  }, [bgColor]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const imageData = canvas.toDataURL();
    setHistory(prev => {
      const newHistory = prev.slice(0, historyStep + 1);
      return [...newHistory, imageData];
    });
    setHistoryStep(prev => prev + 1);
  };

  const undo = () => {
    if (historyStep <= 0) return;
    
    const canvas = canvasRef.current;
    const newStep = historyStep - 1;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[newStep];
    setHistoryStep(newStep);
  };

  const redo = () => {
    if (historyStep >= history.length - 1) return;
    
    const canvas = canvasRef.current;
    const newStep = historyStep + 1;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[newStep];
    setHistoryStep(newStep);
  };

  const clearCanvas = () => {
    if (!ctx) return;
    const canvas = canvasRef.current;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    if (!ctx) return;
    
    const pos = getMousePos(e);
    setIsDrawing(true);
    setStartPos(pos);

    if (tool === TOOLS.PENCIL || tool === TOOLS.ERASER) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.strokeStyle = tool === TOOLS.ERASER ? bgColor : color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else if (tool === TOOLS.TEXT) {
      setTextPos(pos);
      setShowTextInput(true);
    } else if (tool === TOOLS.FILL) {
      floodFill(pos.x, pos.y);
      saveToHistory();
    }
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    
    const pos = getMousePos(e);

    if (tool === TOOLS.PENCIL || tool === TOOLS.ERASER) {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e) => {
    if (!isDrawing || !ctx) return;
    
    const pos = getMousePos(e);
    setIsDrawing(false);

    if (tool === TOOLS.LINE) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      saveToHistory();
    } else if (tool === TOOLS.RECTANGLE) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(
        startPos.x,
        startPos.y,
        pos.x - startPos.x,
        pos.y - startPos.y
      );
      saveToHistory();
    } else if (tool === TOOLS.CIRCLE) {
      const radius = Math.sqrt(
        Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2)
      );
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      saveToHistory();
    } else if (tool === TOOLS.PENCIL || tool === TOOLS.ERASER) {
      saveToHistory();
    }
  };

  const addText = () => {
    if (!textInput || !ctx) return;
    
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(textInput, textPos.x, textPos.y);
    
    setShowTextInput(false);
    setTextInput("");
    saveToHistory();
  };

  const floodFill = (x, y) => {
    const canvas = canvasRef.current;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    const targetColor = getPixelColor(pixels, x, y, canvas.width);
    const fillColor = hexToRgb(color);
    
    if (colorsMatch(targetColor, fillColor)) return;
    
    const stack = [[Math.floor(x), Math.floor(y)]];
    
    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      
      if (cx < 0 || cx >= canvas.width || cy < 0 || cy >= canvas.height) continue;
      
      const currentColor = getPixelColor(pixels, cx, cy, canvas.width);
      
      if (!colorsMatch(currentColor, targetColor)) continue;
      
      setPixelColor(pixels, cx, cy, canvas.width, fillColor);
      
      stack.push([cx + 1, cy]);
      stack.push([cx - 1, cy]);
      stack.push([cx, cy + 1]);
      stack.push([cx, cy - 1]);
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const getPixelColor = (pixels, x, y, width) => {
    const index = (Math.floor(y) * width + Math.floor(x)) * 4;
    return [pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]];
  };

  const setPixelColor = (pixels, x, y, width, color) => {
    const index = (Math.floor(y) * width + Math.floor(x)) * 4;
    pixels[index] = color[0];
    pixels[index + 1] = color[1];
    pixels[index + 2] = color[2];
    pixels[index + 3] = 255;
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
      255
    ] : [0, 0, 0, 255];
  };

  const colorsMatch = (a, b) => {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  };

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
    if (preset === "Custom") {
      setCanvasSize({ width: customWidth, height: customHeight });
    } else {
      setCanvasSize(CANVAS_PRESETS[preset]);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedPreset.replace(/\s+/g, '-')}-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const shareCanvas = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      const file = new File([blob], `design-${Date.now()}.png`, { type: 'image/png' });
      
      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: 'My Design',
            text: 'Check out my custom design!'
          });
        } catch (err) {
          console.log('Share failed:', err);
          alert('Sharing is not supported. Downloading instead.');
          downloadCanvas();
        }
      } else {
        alert('Sharing is not supported. Downloading instead.');
        downloadCanvas();
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Custom Canvas Designer</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={shareCanvas}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={downloadCanvas}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
        {/* LEFT PANEL - Tools */}
        <div className="w-full lg:w-80 bg-white rounded-xl shadow-lg p-6 space-y-6 h-fit lg:sticky lg:top-24">
          {/* Canvas Size Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">Canvas Size</h3>
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              {Object.entries(CANVAS_PRESETS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>

            {selectedPreset === "Custom" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(parseInt(e.target.value) || 800)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(parseInt(e.target.value) || 600)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <button
                  onClick={() => setCanvasSize({ width: customWidth, height: customHeight })}
                  className="col-span-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Apply Size
                </button>
              </div>
            )}
          </div>

          {/* Drawing Tools */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">Drawing Tools</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTool(TOOLS.PENCIL)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  tool === TOOLS.PENCIL
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title="Pencil"
              >
                <Pencil className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setTool(TOOLS.ERASER)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  tool === TOOLS.ERASER
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title="Eraser"
              >
                <Eraser className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setTool(TOOLS.LINE)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  tool === TOOLS.LINE
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title="Line"
              >
                <Minus className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setTool(TOOLS.RECTANGLE)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  tool === TOOLS.RECTANGLE
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title="Rectangle"
              >
                <Square className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setTool(TOOLS.CIRCLE)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  tool === TOOLS.CIRCLE
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title="Circle"
              >
                <Circle className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setTool(TOOLS.TEXT)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  tool === TOOLS.TEXT
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title="Text"
              >
                <Type className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setTool(TOOLS.FILL)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  tool === TOOLS.FILL
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title="Fill"
              >
                <PaintBucket className="w-5 h-5 mx-auto" />
              </button>
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">Colors</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Drawing Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Background Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Brush Settings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900">Brush Settings</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Line Width: {lineWidth}px
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {tool === TOOLS.TEXT && (
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={undo}
                disabled={historyStep <= 0}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Undo className="w-4 h-4" />
                <span>Undo</span>
              </button>
              <button
                onClick={redo}
                disabled={historyStep >= history.length - 1}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Redo className="w-4 h-4" />
                <span>Redo</span>
              </button>
            </div>
            <button
              onClick={clearCanvas}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Canvas</span>
            </button>
          </div>
        </div>

        {/* CANVAS AREA */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-900">Canvas</h3>
            <p className="text-sm text-gray-600 mt-1">
              {canvasSize.width} × {canvasSize.height} pixels
            </p>
          </div>

          <div className="relative bg-gray-100 rounded-lg overflow-auto p-4">
            <div className="inline-block">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="border border-gray-300 shadow-lg bg-white cursor-crosshair"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text Input Modal */}
      {showTextInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add Text</h3>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowTextInput(false);
                  setTextInput("");
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addText}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}