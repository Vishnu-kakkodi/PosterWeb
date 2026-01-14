import * as fabric from "fabric";

export default function Toolbar({ canvasRef }) {
  const uploadBackground = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      fabric.Image.fromURL(
        reader.result,
        (img) => {
          // CLEAR OLD BACKGROUND
          canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));

          // SCALE IMAGE TO CANVAS
          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.min(scaleX, scaleY);

          img.set({
            scaleX: scale,
            scaleY: scale,
            left: 0,
            top: 0,
            originX: "left",
            originY: "top",
            selectable: false,
            evented: false,
          });

          canvas.setBackgroundImage(img, () => {
            canvas.renderAll();
          });
        },
        { crossOrigin: "anonymous" }
      );
    };

    reader.readAsDataURL(file);
  };

  const addName = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const text = new fabric.Textbox("NAME", {
      left: 100,
      top: 100,
      fontSize: 22,
      fill: "#000",
      placeholderKey: "name",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <input type="file" accept="image/*" onChange={uploadBackground} />
      <button onClick={addName}>Add Name</button>
    </div>
  );
}
