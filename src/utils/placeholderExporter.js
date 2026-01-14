export function exportPlaceholders(canvas) {
  return canvas.getObjects().map((obj) => ({
    key: obj.placeholderKey,
    x: Math.round(obj.left),
    y: Math.round(obj.top),
    width: Math.round(obj.width * obj.scaleX),
    height: Math.round(obj.height * obj.scaleY),
    fontSize: obj.fontSize,
    fontFamily: obj.fontFamily,
    color: obj.fill,
    align: obj.textAlign || "left",
  }));
}
