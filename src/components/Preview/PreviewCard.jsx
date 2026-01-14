export default function PreviewCard({ canvasRef }) {
  const preview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => {
      if (obj.placeholderKey === "name") {
        obj.text = "Vishnu";
      }
    });

    canvas.renderAll();
  };

  return <button onClick={preview}>Preview Sample</button>;
}
