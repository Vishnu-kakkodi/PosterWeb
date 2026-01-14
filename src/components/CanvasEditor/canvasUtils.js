export function loadBackgroundImage(canvas, imageUrl) {
  return new Promise((resolve) => {
    canvas.setBackgroundImage(
      imageUrl,
      canvas.renderAll.bind(canvas),
      {
        scaleX: canvas.width / 600,
        scaleY: canvas.height / 350,
      }
    );
    resolve();
  });
}
