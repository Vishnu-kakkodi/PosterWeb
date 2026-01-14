
// import { useRef, useState, useEffect } from "react";
// import "./CreateTemplate.css";

// export default function CreateTemplate() {
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const containerRef = useRef(null);

//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const [placeholders, setPlaceholders] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImageFile(file);
//     const url = URL.createObjectURL(file);
//     setImageUrl(url);
    
//     // Create temp image to get dimensions
//     const img = new Image();
//     img.onload = () => {
//       setImageDimensions({
//         width: img.width,
//         height: img.height
//       });
//     };
//     img.src = url;
//   };

//   /* ================= ADD TEXT ================= */
//   const addPlaceholder = () => {
//     const id = crypto.randomUUID();

//     setPlaceholders((prev) => [
//       ...prev,
//       {
//         id,
//         key: "",
//         x: 100, // Start at reasonable position
//         y: 100,
//         fontSize: 20,
//         color: "#000000",
//         bold: true,
//       },
//     ]);

//     setSelectedId(id);
//   };

//   /* ================= DRAG ================= */
//   const startDrag = (e, id) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setSelectedId(id);

//     const startX = e.clientX;
//     const startY = e.clientY;

//     const target = placeholders.find((p) => p.id === id);
//     if (!target) return;

//     const onMove = (moveEvent) => {
//       const dx = moveEvent.clientX - startX;
//       const dy = moveEvent.clientY - startY;

//       setPlaceholders((prev) =>
//         prev.map((p) =>
//           p.id === id
//             ? { ...p, x: Math.max(0, target.x + dx), y: Math.max(0, target.y + dy) }
//             : p
//         )
//       );
//     };

//     const onUp = () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   };

//   /* ================= UPDATE ================= */
//   const updateSelected = (changes) => {
//     setPlaceholders((prev) =>
//       prev.map((p) =>
//         p.id === selectedId ? { ...p, ...changes } : p
//       )
//     );
//   };

//   const selected = placeholders.find((p) => p.id === selectedId);

//   /* ================= SAVE ================= */
//   const saveTemplate = async () => {
//     if (!name || !imageFile) {
//       alert("Template name and image are required");
//       return;
//     }

//     // Get the actual displayed image dimensions
//     const imgElement = imageRef.current;
//     if (!imgElement) {
//       alert("Image not loaded");
//       return;
//     }

//     const imgRect = imgElement.getBoundingClientRect();
//     const naturalWidth = imgElement.naturalWidth;
//     const naturalHeight = imgElement.naturalHeight;

//     // Calculate scale factor if image is scaled in display
//     const scaleX = naturalWidth / imgRect.width;
//     const scaleY = naturalHeight / imgRect.height;

//     const payloadPlaceholders = placeholders
//       .filter((p) => p.key.trim() !== "")
//       .map((p) => ({
//         key: p.key,
//         // Convert display coordinates to original image coordinates
//         x: Math.round(p.x * scaleX),
//         y: Math.round(p.y * scaleY),
//         // Save absolute dimensions for reference
//         displayX: p.x,
//         displayY: p.y,
//         displayWidth: imgRect.width,
//         displayHeight: imgRect.height,
//         naturalWidth: naturalWidth,
//         naturalHeight: naturalHeight,
//         fontSize: p.fontSize,
//         color: p.color,
//         bold: p.bold,
//       }));

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("image", imageFile);
//     formData.append("placeholders", JSON.stringify(payloadPlaceholders));

//     try {
//       const res = await fetch(
//         "https://visitingcard-backend.onrender.com/templates/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to save template");
//       }

//       alert("Template saved successfully");
      
//       // Reset form
//       setName("");
//       setDescription("");
//       setImageFile(null);
//       setImageUrl(null);
//       setPlaceholders([]);
//       setSelectedId(null);
      
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="editor-root" ref={containerRef}>
//       {/* LEFT PANEL */}
//       <div className="editor-panel">
//         <h3>Template Info</h3>

//         <input
//           placeholder="Template name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input type="file" accept="image/*" onChange={handleImageUpload} />

//         <button className="primary" onClick={addPlaceholder}>
//           ➕ Add Text
//         </button>

//         {selected && (
//           <>
//             <h4>Edit Text</h4>

//             <input
//               placeholder="Type text"
//               value={selected.key}
//               onChange={(e) =>
//                 updateSelected({ key: e.target.value })
//               }
//             />

//             <label>Font Size</label>
//             <input
//               type="range"
//               min={10}
//               max={80}
//               value={selected.fontSize}
//               onChange={(e) =>
//                 updateSelected({ fontSize: +e.target.value })
//               }
//             />

//             <label>Color</label>
//             <input
//               type="color"
//               value={selected.color}
//               onChange={(e) =>
//                 updateSelected({ color: e.target.value })
//               }
//             />

//             <label className="checkbox">
//               <input
//                 type="checkbox"
//                 checked={selected.bold}
//                 onChange={(e) =>
//                   updateSelected({ bold: e.target.checked })
//                 }
//               />
//               Bold
//             </label>
//           </>
//         )}

//         <button className="save" onClick={saveTemplate}>
//           💾 Save Template
//         </button>
//       </div>

//       {/* CANVAS */}
//       <div className="canvas-container">
//         <div className="canvas" ref={canvasRef}>
//           {imageUrl && (
//             <img
//               ref={imageRef}
//               src={imageUrl}
//               alt=""
//               className="canvas-image"
//               onLoad={(e) => {
//                 const img = e.target;
//                 setImageDimensions({
//                   width: img.naturalWidth,
//                   height: img.naturalHeight
//                 });
//               }}
//             />
//           )}

//           {placeholders.map((p) => (
//             <div
//               key={p.id}
//               onMouseDown={(e) => startDrag(e, p.id)}
//               onClick={() => setSelectedId(p.id)}
//               className={`text ${selectedId === p.id ? "active" : ""}`}
//               style={{
//                 position: 'absolute',
//                 left: `${p.x}px`,
//                 top: `${p.y}px`,
//                 fontSize: `${p.fontSize}px`,
//                 color: p.color,
//                 fontWeight: p.bold ? "700" : "400",
//                 cursor: 'move',
//                 userSelect: 'none',
//                 transform: 'translate(-50%, -50%)', // Center the text
//                 whiteSpace: 'nowrap',
//                 backgroundColor: selectedId === p.id ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
//                 padding: '2px 4px',
//                 borderRadius: '2px',
//               }}
//             >
//               {p.key.trim() === "" ? "Type here" : p.key}
//             </div>
//           ))}
//         </div>
        
//         {imageDimensions.width > 0 && (
//           <div className="image-info">
//             Image: {imageDimensions.width} × {imageDimensions.height}px
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }























// import { useRef, useState, useEffect } from "react";

// export default function CreateTemplate() {
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const previewCanvasRef = useRef(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
//   const [displayDimensions, setDisplayDimensions] = useState({ width: 0, height: 0 });
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [placeholders, setPlaceholders] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewData, setPreviewData] = useState(null);

//   // Track image display size changes
//   useEffect(() => {
//     const updateDisplaySize = () => {
//       if (imageRef.current) {
//         const rect = imageRef.current.getBoundingClientRect();
//         setDisplayDimensions({ width: rect.width, height: rect.height });
//       }
//     };

//     updateDisplaySize();
//     window.addEventListener('resize', updateDisplaySize);
//     return () => window.removeEventListener('resize', updateDisplaySize);
//   }, [imageUrl]);

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//     const url = URL.createObjectURL(file);
//     setImageUrl(url);
//     const img = new Image();
//     img.onload = () => {
//       setImageDimensions({ width: img.width, height: img.height });
//     };
//     img.src = url;
//   };

//   /* ================= ADD TEXT ================= */
//   const addPlaceholder = () => {
//     const id = crypto.randomUUID();
//     // Store positions as percentages
//     setPlaceholders((prev) => [
//       ...prev,
//       {
//         id,
//         key: "",
//         xPercent: 50, // Center horizontally (50%)
//         yPercent: 50, // Center vertically (50%)
//         fontSizePercent: 3, // 3% of image width
//         color: "#000000",
//         bold: true,
//       },
//     ]);
//     setSelectedId(id);
//   };

//   /* ================= DRAG ================= */
//   const startDrag = (e, id) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setSelectedId(id);
    
//     const imgElement = imageRef.current;
//     if (!imgElement) return;
    
//     const imgRect = imgElement.getBoundingClientRect();
//     const startX = e.clientX;
//     const startY = e.clientY;
//     const target = placeholders.find((p) => p.id === id);
//     if (!target) return;

//     const onMove = (moveEvent) => {
//       const dx = moveEvent.clientX - startX;
//       const dy = moveEvent.clientY - startY;
      
//       // Calculate current pixel position
//       const currentX = (target.xPercent / 100) * imgRect.width;
//       const currentY = (target.yPercent / 100) * imgRect.height;
      
//       // Calculate new pixel position
//       const newX = Math.max(0, Math.min(imgRect.width, currentX + dx));
//       const newY = Math.max(0, Math.min(imgRect.height, currentY + dy));
      
//       // Convert back to percentage
//       const newXPercent = (newX / imgRect.width) * 100;
//       const newYPercent = (newY / imgRect.height) * 100;
      
//       setPlaceholders((prev) =>
//         prev.map((p) =>
//           p.id === id
//             ? {
//                 ...p,
//                 xPercent: newXPercent,
//                 yPercent: newYPercent,
//               }
//             : p
//         )
//       );
//     };

//     const onUp = () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   };

//   /* ================= UPDATE ================= */
//   const updateSelected = (changes) => {
//     setPlaceholders((prev) =>
//       prev.map((p) => (p.id === selectedId ? { ...p, ...changes } : p))
//     );
//   };

//   const selected = placeholders.find((p) => p.id === selectedId);

//   /* ================= DELETE PLACEHOLDER ================= */
//   const deletePlaceholder = () => {
//     if (!selectedId) return;
//     setPlaceholders((prev) => prev.filter((p) => p.id !== selectedId));
//     setSelectedId(null);
//   };

//   /* ================= PREVIEW ================= */
//   const showPreviewModal = () => {
//     if (!name || !imageFile) {
//       alert("Template name and image are required");
//       return;
//     }

//     const imgElement = imageRef.current;
//     if (!imgElement) {
//       alert("Image not loaded");
//       return;
//     }

//     const naturalWidth = imgElement.naturalWidth;
//     const naturalHeight = imgElement.naturalHeight;

//     const payloadPlaceholders = placeholders
//       .filter((p) => p.key.trim() !== "")
//       .map((p) => ({
//         key: p.key,
//         // Convert percentage to absolute pixels for the original image
//         x: Math.round((p.xPercent / 100) * naturalWidth),
//         y: Math.round((p.yPercent / 100) * naturalHeight),
//         // Store percentages for responsive rendering
//         xPercent: p.xPercent,
//         yPercent: p.yPercent,
//         fontSizePercent: p.fontSizePercent,
//         fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
//         color: p.color,
//         bold: p.bold,
//         naturalWidth: naturalWidth,
//         naturalHeight: naturalHeight,
//       }));

//     setPreviewData({
//       name,
//       description,
//       imageUrl,
//       placeholders: payloadPlaceholders,
//       naturalWidth,
//       naturalHeight,
//     });
//     setShowPreview(true);
//   };

//   /* ================= SAVE ================= */
//   const saveTemplate = async () => {
//     const imgElement = imageRef.current;
//     const naturalWidth = imgElement.naturalWidth;
//     const naturalHeight = imgElement.naturalHeight;

//     const payloadPlaceholders = placeholders
//       .filter((p) => p.key.trim() !== "")
//       .map((p) => ({
//         key: p.key,
//         x: Math.round((p.xPercent / 100) * naturalWidth),
//         y: Math.round((p.yPercent / 100) * naturalHeight),
//         xPercent: p.xPercent,
//         yPercent: p.yPercent,
//         fontSizePercent: p.fontSizePercent,
//         fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
//         color: p.color,
//         bold: p.bold,
//       }));

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("image", imageFile);
//     formData.append("placeholders", JSON.stringify(payloadPlaceholders));

//     try {
//       const res = await fetch(
//         "https://visitingcard-backend.onrender.com/templates/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Failed to save template");
//       }
//       alert("Template saved successfully");
//       setShowPreview(false);
//       setName("");
//       setDescription("");
//       setImageFile(null);
//       setImageUrl(null);
//       setPlaceholders([]);
//       setSelectedId(null);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div style={{ display: 'flex', gap: '24px', padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
//       {/* LEFT PANEL */}
//       <div style={{ width: '280px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: 'fit-content' }}>
//         <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Template Info</h3>
//         <input
//           placeholder="Template Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ width: '100%', marginBottom: '16px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{ width: '100%', marginBottom: '16px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           style={{ width: '100%', marginBottom: '16px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
//         />
//         <button
//           onClick={addPlaceholder}
//           style={{ width: '100%', padding: '12px', margin: '8px 0', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', background: '#007bff', color: 'white' }}
//         >
//           ➕ Add Text
//         </button>

//         {selected && (
//           <>
//             <h4 style={{ marginTop: '20px', marginBottom: '12px', color: '#333' }}>Edit Text</h4>
//             <input
//               placeholder="Type text"
//               value={selected.key}
//               onChange={(e) => updateSelected({ key: e.target.value })}
//               style={{ width: '100%', marginBottom: '16px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
//             />
//             <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '14px', color: '#555' }}>
//               Font Size: {selected.fontSizePercent.toFixed(1)}%
//             </label>
//             <input
//               type="range"
//               min={1}
//               max={10}
//               step={0.1}
//               value={selected.fontSizePercent}
//               onChange={(e) => updateSelected({ fontSizePercent: +e.target.value })}
//               style={{ width: '100%', marginBottom: '16px' }}
//             />
//             <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '14px', color: '#555' }}>Color</label>
//             <input
//               type="color"
//               value={selected.color}
//               onChange={(e) => updateSelected({ color: e.target.value })}
//               style={{ width: '100%', marginBottom: '16px', padding: '4px', border: '1px solid #ddd', borderRadius: '6px', height: '40px' }}
//             />
//             <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0' }}>
//               <input
//                 type="checkbox"
//                 checked={selected.bold}
//                 onChange={(e) => updateSelected({ bold: e.target.checked })}
//                 style={{ width: 'auto', margin: 0 }}
//               />
//               Bold
//             </label>
//             <button
//               onClick={deletePlaceholder}
//               style={{ width: '100%', padding: '12px', margin: '8px 0', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', background: '#dc3545', color: 'white' }}
//             >
//               🗑️ Delete Text
//             </button>
//           </>
//         )}

//         <button
//           onClick={showPreviewModal}
//           style={{ width: '100%', padding: '12px', marginTop: '20px', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', background: '#28a745', color: 'white' }}
//         >
//           👁️ Preview Template
//         </button>
//       </div>

//       {/* CANVAS */}
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
//         <div ref={canvasRef} style={{ position: 'relative', display: 'inline-block', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minHeight: '300px', minWidth: '300px' }}>
//           {imageUrl && (
//             <img
//               ref={imageRef}
//               src={imageUrl}
//               alt=""
//               onLoad={(e) => {
//                 const img = e.target;
//                 setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
//                 const rect = img.getBoundingClientRect();
//                 setDisplayDimensions({ width: rect.width, height: rect.height });
//               }}
//               style={{ display: 'block', maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
//             />
//           )}
//           {placeholders.map((p) => {
//             const xPos = (p.xPercent / 100) * displayDimensions.width;
//             const yPos = (p.yPercent / 100) * displayDimensions.height;
//             const calculatedFontSize = (p.fontSizePercent / 100) * displayDimensions.width;
            
//             return (
//               <div
//                 key={p.id}
//                 onMouseDown={(e) => startDrag(e, p.id)}
//                 onClick={() => setSelectedId(p.id)}
//                 style={{
//                   position: 'absolute',
//                   left: `${xPos}px`,
//                   top: `${yPos}px`,
//                   fontSize: `${calculatedFontSize}px`,
//                   color: p.color,
//                   fontWeight: p.bold ? "700" : "400",
//                   cursor: 'move',
//                   userSelect: 'none',
//                   transform: 'translate(-50%, -50%)',
//                   whiteSpace: 'nowrap',
//                   backgroundColor: selectedId === p.id ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
//                   padding: '2px 4px',
//                   borderRadius: '2px',
//                   border: selectedId === p.id ? '2px solid #007bff' : '2px solid transparent',
//                 }}
//               >
//                 {p.key.trim() === "" ? "Type here" : p.key}
//               </div>
//             );
//           })}
//         </div>
//         {imageDimensions.width > 0 && (
//           <div style={{ padding: '8px 12px', background: 'white', borderRadius: '6px', fontSize: '14px', color: '#666', border: '1px solid #ddd' }}>
//             Original: {imageDimensions.width} × {imageDimensions.height}px | 
//             Display: {Math.round(displayDimensions.width)} × {Math.round(displayDimensions.height)}px
//           </div>
//         )}
//       </div>

//       {/* PREVIEW MODAL */}
//       {showPreview && previewData && (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
//           <div style={{ background: 'white', borderRadius: '12px', padding: '30px', maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto', position: 'relative' }}>
//             <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Preview Template</h2>
            
//             <div style={{ marginBottom: '20px' }}>
//               <p><strong>Name:</strong> {previewData.name}</p>
//               {previewData.description && <p><strong>Description:</strong> {previewData.description}</p>}
//               <p><strong>Placeholders:</strong> {previewData.placeholders.length}</p>
//             </div>

//             <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
//               <img
//                 ref={previewCanvasRef}
//                 src={previewData.imageUrl}
//                 alt="Template Preview"
//                 onLoad={(e) => {
//                   const rect = e.target.getBoundingClientRect();
//                   // Force re-render to update placeholder positions
//                   setPreviewData({...previewData});
//                 }}
//                 style={{ display: 'block', maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', border: '1px solid #ddd' }}
//               />
//               {previewCanvasRef.current && previewData.placeholders.map((p, idx) => {
//                 const rect = previewCanvasRef.current.getBoundingClientRect();
//                 const xPos = (p.xPercent / 100) * rect.width;
//                 const yPos = (p.yPercent / 100) * rect.height;
//                 const calculatedFontSize = (p.fontSizePercent / 100) * rect.width;
                
//                 return (
//                   <div
//                     key={idx}
//                     style={{
//                       position: 'absolute',
//                       left: `${xPos}px`,
//                       top: `${yPos}px`,
//                       fontSize: `${calculatedFontSize}px`,
//                       color: p.color,
//                       fontWeight: p.bold ? "700" : "400",
//                       transform: 'translate(-50%, -50%)',
//                       whiteSpace: 'nowrap',
//                       padding: '2px 4px',
//                       background: 'rgba(255, 255, 0, 0.2)',
//                       border: '1px dashed #ff0000',
//                     }}
//                   >
//                     {p.key}
//                   </div>
//                 );
//               })}
//             </div>

//             <div style={{ marginTop: '20px' }}>
//               <h4>Placeholder Details:</h4>
//               {previewData.placeholders.map((p, idx) => (
//                 <div key={idx} style={{ padding: '8px', background: '#f5f5f5', marginBottom: '8px', borderRadius: '4px', fontSize: '13px' }}>
//                   <strong>Key:</strong> {p.key} | <strong>Position:</strong> ({p.x}, {p.y})px | <strong>Size:</strong> {p.fontSize}px | <strong>Color:</strong> {p.color}
//                 </div>
//               ))}
//             </div>

//             <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
//               <button
//                 onClick={saveTemplate}
//                 style={{ flex: 1, padding: '12px 24px', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', background: '#28a745', color: 'white' }}
//               >
//                 ✅ Confirm & Submit
//               </button>
//               <button
//                 onClick={() => setShowPreview(false)}
//                 style={{ flex: 1, padding: '12px 24px', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', background: '#6c757d', color: 'white' }}
//               >
//                 ✏️ Edit More
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



















// import { useRef, useState, useEffect } from "react";

// export default function CreateTemplate() {
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const previewCanvasRef = useRef(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
//   const [displayDimensions, setDisplayDimensions] = useState({ width: 0, height: 0 });
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [placeholders, setPlaceholders] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewData, setPreviewData] = useState(null);

//   // Track image display size changes
//   useEffect(() => {
//     const updateDisplaySize = () => {
//       if (imageRef.current) {
//         const rect = imageRef.current.getBoundingClientRect();
//         setDisplayDimensions({ width: rect.width, height: rect.height });
//       }
//     };

//     updateDisplaySize();
//     window.addEventListener('resize', updateDisplaySize);
//     return () => window.removeEventListener('resize', updateDisplaySize);
//   }, [imageUrl]);

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//     const url = URL.createObjectURL(file);
//     setImageUrl(url);
//     const img = new Image();
//     img.onload = () => {
//       setImageDimensions({ width: img.width, height: img.height });
//     };
//     img.src = url;
//   };

//   /* ================= ADD TEXT ================= */
//   const addPlaceholder = () => {
//     const id = crypto.randomUUID();
//     // Store positions as percentages
//     setPlaceholders((prev) => [
//       ...prev,
//       {
//         id,
//         key: "",
//         xPercent: 50, // Center horizontally (50%)
//         yPercent: 50, // Center vertically (50%)
//         fontSizePercent: 3, // 3% of image width
//         color: "#000000",
//         bold: true,
//       },
//     ]);
//     setSelectedId(id);
//   };

//   /* ================= DRAG ================= */
//   const startDrag = (e, id) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setSelectedId(id);
    
//     const imgElement = imageRef.current;
//     if (!imgElement) return;
    
//     const imgRect = imgElement.getBoundingClientRect();
//     const startX = e.clientX;
//     const startY = e.clientY;
//     const target = placeholders.find((p) => p.id === id);
//     if (!target) return;

//     const onMove = (moveEvent) => {
//       const dx = moveEvent.clientX - startX;
//       const dy = moveEvent.clientY - startY;
      
//       // Calculate current pixel position
//       const currentX = (target.xPercent / 100) * imgRect.width;
//       const currentY = (target.yPercent / 100) * imgRect.height;
      
//       // Calculate new pixel position
//       const newX = Math.max(0, Math.min(imgRect.width, currentX + dx));
//       const newY = Math.max(0, Math.min(imgRect.height, currentY + dy));
      
//       // Convert back to percentage
//       const newXPercent = (newX / imgRect.width) * 100;
//       const newYPercent = (newY / imgRect.height) * 100;
      
//       setPlaceholders((prev) =>
//         prev.map((p) =>
//           p.id === id
//             ? {
//                 ...p,
//                 xPercent: newXPercent,
//                 yPercent: newYPercent,
//               }
//             : p
//         )
//       );
//     };

//     const onUp = () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   };

//   /* ================= UPDATE ================= */
//   const updateSelected = (changes) => {
//     setPlaceholders((prev) =>
//       prev.map((p) => (p.id === selectedId ? { ...p, ...changes } : p))
//     );
//   };

//   const selected = placeholders.find((p) => p.id === selectedId);

//   /* ================= DELETE PLACEHOLDER ================= */
//   const deletePlaceholder = () => {
//     if (!selectedId) return;
//     setPlaceholders((prev) => prev.filter((p) => p.id !== selectedId));
//     setSelectedId(null);
//   };

//   /* ================= PREVIEW ================= */
//   const showPreviewModal = () => {
//     if (!name || !imageFile) {
//       alert("Template name and image are required");
//       return;
//     }

//     const imgElement = imageRef.current;
//     if (!imgElement) {
//       alert("Image not loaded");
//       return;
//     }

//     const naturalWidth = imgElement.naturalWidth;
//     const naturalHeight = imgElement.naturalHeight;

//     const payloadPlaceholders = placeholders
//       .filter((p) => p.key.trim() !== "")
//       .map((p) => ({
//         key: p.key,
//         // Absolute positions
//         x: Math.round((p.xPercent / 100) * naturalWidth),
//         y: Math.round((p.yPercent / 100) * naturalHeight),
//         fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
//         // CRITICAL: Percentages for responsive display
//         xPercent: p.xPercent,
//         yPercent: p.yPercent,
//         fontSizePercent: p.fontSizePercent,
//         // Original dimensions
//         naturalWidth: naturalWidth,
//         naturalHeight: naturalHeight,
//         color: p.color,
//         bold: p.bold,
//       }));

//     setPreviewData({
//       name,
//       description,
//       imageUrl,
//       placeholders: payloadPlaceholders,
//       naturalWidth,
//       naturalHeight,
//     });
//     setShowPreview(true);
//   };

//   /* ================= SAVE ================= */
//   const saveTemplate = async () => {
//     const imgElement = imageRef.current;
//     const naturalWidth = imgElement.naturalWidth;
//     const naturalHeight = imgElement.naturalHeight;

//     const payloadPlaceholders = placeholders
//       .filter((p) => p.key.trim() !== "")
//       .map((p) => ({
//         key: p.key,
//         // Store absolute positions for original image
//         x: Math.round((p.xPercent / 100) * naturalWidth),
//         y: Math.round((p.yPercent / 100) * naturalHeight),
//         fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
//         // CRITICAL: Store percentages for responsive display
//         xPercent: p.xPercent,
//         yPercent: p.yPercent,
//         fontSizePercent: p.fontSizePercent,
//         // Store original dimensions for reference
//         naturalWidth: naturalWidth,
//         naturalHeight: naturalHeight,
//         color: p.color,
//         bold: p.bold,
//       }));

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("image", imageFile);
//     formData.append("placeholders", JSON.stringify(payloadPlaceholders));

//     try {
//       const res = await fetch(
//         "https://visitingcard-backend.onrender.com/templates/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Failed to save template");
//       }
//       alert("Template saved successfully");
//       setShowPreview(false);
//       setName("");
//       setDescription("");
//       setImageFile(null);
//       setImageUrl(null);
//       setPlaceholders([]);
//       setSelectedId(null);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div style={{ display: 'flex', gap: '24px', padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
//       {/* LEFT PANEL */}
//       <div style={{ width: '280px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: 'fit-content' }}>
//         <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Template Info</h3>
//         <input
//           placeholder="Template Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ width: '100%', marginBottom: '16px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           style={{ width: '100%', marginBottom: '16px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           style={{ width: '100%', marginBottom: '16px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
//         />
//         <button
//           onClick={addPlaceholder}
//           style={{ width: '100%', padding: '12px', margin: '8px 0', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', background: '#007bff', color: 'white' }}
//         >
//           ➕ Add Text
//         </button>

//         {selected && (
//           <>
//             <h4 style={{ marginTop: '20px', marginBottom: '12px', color: '#333' }}>Edit Text</h4>
//             <input
//               placeholder="Type text"
//               value={selected.key}
//               onChange={(e) => updateSelected({ key: e.target.value })}
//               style={{ width: '100%', marginBottom: '16px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
//             />
//             <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '14px', color: '#555' }}>
//               Font Size: {selected.fontSizePercent.toFixed(1)}%
//             </label>
//             <input
//               type="range"
//               min={1}
//               max={10}
//               step={0.1}
//               value={selected.fontSizePercent}
//               onChange={(e) => updateSelected({ fontSizePercent: +e.target.value })}
//               style={{ width: '100%', marginBottom: '16px' }}
//             />
//             <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '14px', color: '#555' }}>Color</label>
//             <input
//               type="color"
//               value={selected.color}
//               onChange={(e) => updateSelected({ color: e.target.value })}
//               style={{ width: '100%', marginBottom: '16px', padding: '4px', border: '1px solid #ddd', borderRadius: '6px', height: '40px' }}
//             />
//             <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0' }}>
//               <input
//                 type="checkbox"
//                 checked={selected.bold}
//                 onChange={(e) => updateSelected({ bold: e.target.checked })}
//                 style={{ width: 'auto', margin: 0 }}
//               />
//               Bold
//             </label>
//             <button
//               onClick={deletePlaceholder}
//               style={{ width: '100%', padding: '12px', margin: '8px 0', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', background: '#dc3545', color: 'white' }}
//             >
//               🗑️ Delete Text
//             </button>
//           </>
//         )}

//         <button
//           onClick={showPreviewModal}
//           style={{ width: '100%', padding: '12px', marginTop: '20px', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', background: '#28a745', color: 'white' }}
//         >
//           👁️ Preview Template
//         </button>
//       </div>

//       {/* CANVAS */}
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
//         <div ref={canvasRef} style={{ position: 'relative', display: 'inline-block', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minHeight: '300px', minWidth: '300px' }}>
//           {imageUrl && (
//             <img
//               ref={imageRef}
//               src={imageUrl}
//               alt=""
//               onLoad={(e) => {
//                 const img = e.target;
//                 setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
//                 const rect = img.getBoundingClientRect();
//                 setDisplayDimensions({ width: rect.width, height: rect.height });
//               }}
//               style={{ display: 'block', maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
//             />
//           )}
//           {placeholders.map((p) => {
//             const xPos = (p.xPercent / 100) * displayDimensions.width;
//             const yPos = (p.yPercent / 100) * displayDimensions.height;
//             const calculatedFontSize = (p.fontSizePercent / 100) * displayDimensions.width;
            
//             return (
//               <div
//                 key={p.id}
//                 onMouseDown={(e) => startDrag(e, p.id)}
//                 onClick={() => setSelectedId(p.id)}
//                 style={{
//                   position: 'absolute',
//                   left: `${xPos}px`,
//                   top: `${yPos}px`,
//                   fontSize: `${calculatedFontSize}px`,
//                   color: p.color,
//                   fontWeight: p.bold ? "700" : "400",
//                   cursor: 'move',
//                   userSelect: 'none',
//                   transform: 'translate(-50%, -50%)',
//                   whiteSpace: 'nowrap',
//                   backgroundColor: selectedId === p.id ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
//                   padding: '2px 4px',
//                   borderRadius: '2px',
//                   border: selectedId === p.id ? '2px solid #007bff' : '2px solid transparent',
//                 }}
//               >
//                 {p.key.trim() === "" ? "Type here" : p.key}
//               </div>
//             );
//           })}
//         </div>
//         {imageDimensions.width > 0 && (
//           <div style={{ padding: '8px 12px', background: 'white', borderRadius: '6px', fontSize: '14px', color: '#666', border: '1px solid #ddd' }}>
//             Original: {imageDimensions.width} × {imageDimensions.height}px | 
//             Display: {Math.round(displayDimensions.width)} × {Math.round(displayDimensions.height)}px
//           </div>
//         )}
//       </div>

//       {/* PREVIEW MODAL */}
//       {showPreview && previewData && (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
//           <div style={{ background: 'white', borderRadius: '12px', padding: '30px', maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto', position: 'relative' }}>
//             <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Preview Template</h2>
            
//             <div style={{ marginBottom: '20px' }}>
//               <p><strong>Name:</strong> {previewData.name}</p>
//               {previewData.description && <p><strong>Description:</strong> {previewData.description}</p>}
//               <p><strong>Placeholders:</strong> {previewData.placeholders.length}</p>
//             </div>

//             <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
//               <img
//                 ref={previewCanvasRef}
//                 src={previewData.imageUrl}
//                 alt="Template Preview"
//                 onLoad={(e) => {
//                   const rect = e.target.getBoundingClientRect();
//                   // Force re-render to update placeholder positions
//                   setPreviewData({...previewData});
//                 }}
//                 style={{ display: 'block', maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', border: '1px solid #ddd' }}
//               />
//               {previewCanvasRef.current && previewData.placeholders.map((p, idx) => {
//                 const rect = previewCanvasRef.current.getBoundingClientRect();
//                 const xPos = (p.xPercent / 100) * rect.width;
//                 const yPos = (p.yPercent / 100) * rect.height;
//                 const calculatedFontSize = (p.fontSizePercent / 100) * rect.width;
                
//                 return (
//                   <div
//                     key={idx}
//                     style={{
//                       position: 'absolute',
//                       left: `${xPos}px`,
//                       top: `${yPos}px`,
//                       fontSize: `${calculatedFontSize}px`,
//                       color: p.color,
//                       fontWeight: p.bold ? "700" : "400",
//                       transform: 'translate(-50%, -50%)',
//                       whiteSpace: 'nowrap',
//                       padding: '2px 4px',
//                       background: 'rgba(255, 255, 0, 0.2)',
//                       border: '1px dashed #ff0000',
//                     }}
//                   >
//                     {p.key}
//                   </div>
//                 );
//               })}
//             </div>

//             <div style={{ marginTop: '20px' }}>
//               <h4>Placeholder Details:</h4>
//               {previewData.placeholders.map((p, idx) => (
//                 <div key={idx} style={{ padding: '8px', background: '#f5f5f5', marginBottom: '8px', borderRadius: '4px', fontSize: '13px' }}>
//                   <strong>Key:</strong> {p.key} | <strong>Position:</strong> ({p.x}, {p.y})px | <strong>Size:</strong> {p.fontSize}px | <strong>Color:</strong> {p.color}
//                 </div>
//               ))}
//             </div>

//             <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
//               <button
//                 onClick={saveTemplate}
//                 style={{ flex: 1, padding: '12px 24px', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', background: '#28a745', color: 'white' }}
//               >
//                 ✅ Confirm & Submit
//               </button>
//               <button
//                 onClick={() => setShowPreview(false)}
//                 style={{ flex: 1, padding: '12px 24px', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', background: '#6c757d', color: 'white' }}
//               >
//                 ✏️ Edit More
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




























// import { useRef, useState, useEffect } from "react";

// export default function CreateTemplate() {
//   const imageRef = useRef(null);
//   const textRefs = useRef({});

//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);

//   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
//   const [displayDimensions, setDisplayDimensions] = useState({ width: 0, height: 0 });

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const [placeholders, setPlaceholders] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImageFile(file);
//     const url = URL.createObjectURL(file);
//     setImageUrl(url);

//     const img = new Image();
//     img.onload = () => {
//       setImageDimensions({ width: img.width, height: img.height });
//     };
//     img.src = url;
//   };

//   /* ================= TRACK DISPLAY SIZE ================= */
//   useEffect(() => {
//     const updateSize = () => {
//       if (!imageRef.current) return;
//       const r = imageRef.current.getBoundingClientRect();
//       setDisplayDimensions({ width: r.width, height: r.height });
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, [imageUrl]);

//   /* ================= ADD TEXT ================= */
//   const addPlaceholder = () => {
//     const id = crypto.randomUUID();
//     setPlaceholders((prev) => [
//       ...prev,
//       {
//         id,
//         key: "",
//         xPercent: 0,
//         yPercent: 0,
//         fontSizePercent: 3,
//         color: "#000000",
//         bold: true,
//       },
//     ]);
//     setSelectedId(id);
//   };

//   /* ================= DRAG (TOP-LEFT SAFE) ================= */
//   const startDrag = (e, id) => {
//     e.preventDefault();
//     setSelectedId(id);

//     const img = imageRef.current;
//     const textEl = textRefs.current[id];
//     if (!img || !textEl) return;

//     const imgRect = img.getBoundingClientRect();
//     const textRect = textEl.getBoundingClientRect();

//     const startMouseX = e.clientX;
//     const startMouseY = e.clientY;

//     const target = placeholders.find((p) => p.id === id);
//     if (!target) return;

//     const startX = (target.xPercent / 100) * imgRect.width;
//     const startY = (target.yPercent / 100) * imgRect.height;

//     const onMove = (ev) => {
//       let newX = startX + (ev.clientX - startMouseX);
//       let newY = startY + (ev.clientY - startMouseY);

//       // 🔒 clamp inside image
//       newX = Math.max(0, Math.min(imgRect.width - textRect.width, newX));
//       newY = Math.max(0, Math.min(imgRect.height - textRect.height, newY));

//       setPlaceholders((prev) =>
//         prev.map((p) =>
//           p.id === id
//             ? {
//                 ...p,
//                 xPercent: (newX / imgRect.width) * 100,
//                 yPercent: (newY / imgRect.height) * 100,
//               }
//             : p
//         )
//       );
//     };

//     const onUp = () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   };

//   /* ================= UPDATE ================= */
//   const updateSelected = (changes) => {
//     setPlaceholders((prev) =>
//       prev.map((p) => (p.id === selectedId ? { ...p, ...changes } : p))
//     );
//   };

//   const selected = placeholders.find((p) => p.id === selectedId);

//   /* ================= SAVE TEMPLATE ================= */
//   const saveTemplate = async () => {
//     if (!imageRef.current || !imageFile || !name) {
//       alert("Template name and image are required");
//       return;
//     }

//     const naturalWidth = imageRef.current.naturalWidth;
//     const naturalHeight = imageRef.current.naturalHeight;

//     const payloadPlaceholders = placeholders
//       .filter((p) => p.key.trim() !== "")
//       .map((p) => ({
//         key: p.key,
//         x: Math.round((p.xPercent / 100) * naturalWidth),
//         y: Math.round((p.yPercent / 100) * naturalHeight),
//         fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
//         xPercent: p.xPercent,
//         yPercent: p.yPercent,
//         fontSizePercent: p.fontSizePercent,
//         color: p.color,
//         bold: p.bold,
//       }));

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("image", imageFile);
//     formData.append("placeholders", JSON.stringify(payloadPlaceholders));

//     try {
//       const res = await fetch(
//         "https://visitingcard-backend.onrender.com/templates/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!res.ok) throw new Error("Failed to save template");

//       alert("Template saved successfully ✅");

//       setName("");
//       setDescription("");
//       setImageFile(null);
//       setImageUrl(null);
//       setPlaceholders([]);
//       setSelectedId(null);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div style={{ display: "flex", gap: 24, padding: 20, background: "#f5f5f5" }}>
//       {/* LEFT PANEL */}
//       <div style={{ width: 280, background: "#fff", padding: 20, borderRadius: 12 }}>
//         <h3>Template Info</h3>

//         <input
//           placeholder="Template Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input type="file" accept="image/*" onChange={handleImageUpload} />

//         <button onClick={addPlaceholder}>➕ Add Text</button>

//         {selected && (
//           <>
//             <h4>Edit Text</h4>

//             <input
//               placeholder="Text"
//               value={selected.key}
//               onChange={(e) => updateSelected({ key: e.target.value })}
//             />

//             <label>Font Size (%)</label>
//             <input
//               type="range"
//               min={1}
//               max={10}
//               step={0.1}
//               value={selected.fontSizePercent}
//               onChange={(e) =>
//                 updateSelected({ fontSizePercent: +e.target.value })
//               }
//             />
//           </>
//         )}

//         {/* ✅ SAVE BUTTON */}
//         <button
//           onClick={saveTemplate}
//           style={{
//             marginTop: 20,
//             background: "#28a745",
//             color: "#fff",
//             padding: 12,
//             border: "none",
//             borderRadius: 6,
//             fontWeight: 600,
//             cursor: "pointer",
//           }}
//         >
//           💾 Save Template
//         </button>
//       </div>

//       {/* CANVAS */}
//       <div>
//         <div style={{ position: "relative", background: "#fff" }}>
//           {imageUrl && (
//             <img
//               ref={imageRef}
//               src={imageUrl}
//               alt=""
//               onLoad={(e) => {
//                 const r = e.target.getBoundingClientRect();
//                 setDisplayDimensions({ width: r.width, height: r.height });
//               }}
//               style={{ maxWidth: "100%", maxHeight: "80vh" }}
//             />
//           )}

//           {placeholders.map((p) => {
//             const x = (p.xPercent / 100) * displayDimensions.width;
//             const y = (p.yPercent / 100) * displayDimensions.height;
//             const fs = (p.fontSizePercent / 100) * displayDimensions.width;

//             return (
//               <div
//                 key={p.id}
//                 ref={(el) => (textRefs.current[p.id] = el)}
//                 onMouseDown={(e) => startDrag(e, p.id)}
//                 onClick={() => setSelectedId(p.id)}
//                 style={{
//                   position: "absolute",
//                   left: x,
//                   top: y,
//                   fontSize: fs,
//                   fontWeight: p.bold ? 700 : 400,
//                   color: p.color,
//                   cursor: "move",
//                   whiteSpace: "nowrap",
//                   border:
//                     selectedId === p.id
//                       ? "2px solid #007bff"
//                       : "2px solid transparent",
//                   padding: "2px 4px",
//                   background: "rgba(0,123,255,0.1)",
//                 }}
//               >
//                 {p.key || "Type here"}
//               </div>
//             );
//           })}
//         </div>

//         {selected && imageRef.current && (
//           <div style={{ marginTop: 10, background: "#fff", padding: 10 }}>
//             <strong>Position</strong>
//             <div>
//               X:{" "}
//               {Math.round(
//                 (selected.xPercent / 100) * imageRef.current.naturalWidth
//               )}{" "}
//               px
//             </div>
//             <div>
//               Y:{" "}
//               {Math.round(
//                 (selected.yPercent / 100) * imageRef.current.naturalHeight
//               )}{" "}
//               px
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
















// import { useRef, useState, useEffect } from "react";

// const FONT_FAMILIES = [
//   // 💍 Wedding / Script (Names)
//   { label: "Great Vibes (Wedding Script)", value: "'Great Vibes', cursive" },
//   { label: "Allura (Elegant Script)", value: "'Allura', cursive" },
//   { label: "Alex Brush (Luxury Script)", value: "'Alex Brush', cursive" },
//   { label: "Dancing Script", value: "'Dancing Script', cursive" },
//   { label: "Sacramento (Soft Script)", value: "'Sacramento', cursive" },
//   { label: "Parisienne (Romantic)", value: "'Parisienne', cursive" },

//   // 👑 Royal / Serif (Headings)
//   { label: "Playfair Display (Elegant)", value: "'Playfair Display', serif" },
//   { label: "Cinzel (Royal)", value: "'Cinzel', serif" },
//   { label: "Cormorant Garamond (Classic)", value: "'Cormorant Garamond', serif" },
//   { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
//   { label: "Merriweather", value: "'Merriweather', serif" },

//   // ✨ Modern / Clean (Details)
//   { label: "Poppins", value: "'Poppins', sans-serif" },
//   { label: "Montserrat", value: "'Montserrat', sans-serif" },
//   { label: "Lato", value: "'Lato', sans-serif" },
//   { label: "Raleway", value: "'Raleway', sans-serif" },
//   { label: "Open Sans", value: "'Open Sans', sans-serif" },

//   // 🎨 Decorative / Special
//   { label: "Cinzel Decorative", value: "'Cinzel Decorative', cursive" },
//   { label: "Italianno (Thin Script)", value: "'Italianno', cursive" },
// ];


// export default function CreateTemplate() {
//   const imageRef = useRef(null);
//   const textRefs = useRef({});

//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);

//   const [displayDimensions, setDisplayDimensions] = useState({
//     width: 0,
//     height: 0,
//   });

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const [placeholders, setPlaceholders] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImageFile(file);
//     const url = URL.createObjectURL(file);
//     setImageUrl(url);
//   };

//   /* ================= TRACK DISPLAY SIZE ================= */
//   useEffect(() => {
//     const updateSize = () => {
//       if (!imageRef.current) return;
//       const r = imageRef.current.getBoundingClientRect();
//       setDisplayDimensions({ width: r.width, height: r.height });
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, [imageUrl]);

//   /* ================= ADD TEXT ================= */
//   const addPlaceholder = () => {
//     const id = crypto.randomUUID();
//     setPlaceholders((prev) => [
//       ...prev,
//       {
//         id,
//         key: "",
//         xPercent: 0,
//         yPercent: 0,
//         fontSizePercent: 4,
//         color: "#000000",
//         bold: true,
//         italic: false,
//         fontFamily: "'Great Vibes', cursive",
//         letterSpacing: 0,
//         textShadow: false,
//       },
//     ]);
//     setSelectedId(id);
//   };

//   /* ================= DRAG ================= */
//   const startDrag = (e, id) => {
//     e.preventDefault();
//     setSelectedId(id);

//     const img = imageRef.current;
//     const textEl = textRefs.current[id];
//     if (!img || !textEl) return;

//     const imgRect = img.getBoundingClientRect();
//     const textRect = textEl.getBoundingClientRect();

//     const startX = e.clientX;
//     const startY = e.clientY;

//     const target = placeholders.find((p) => p.id === id);
//     if (!target) return;

//     const baseX = (target.xPercent / 100) * imgRect.width;
//     const baseY = (target.yPercent / 100) * imgRect.height;

//     const onMove = (ev) => {
//       let x = baseX + (ev.clientX - startX);
//       let y = baseY + (ev.clientY - startY);

//       x = Math.max(0, Math.min(imgRect.width - textRect.width, x));
//       y = Math.max(0, Math.min(imgRect.height - textRect.height, y));

//       setPlaceholders((prev) =>
//         prev.map((p) =>
//           p.id === id
//             ? {
//                 ...p,
//                 xPercent: (x / imgRect.width) * 100,
//                 yPercent: (y / imgRect.height) * 100,
//               }
//             : p
//         )
//       );
//     };

//     const onUp = () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   };

//   /* ================= UPDATE ================= */
//   const updateSelected = (changes) => {
//     setPlaceholders((prev) =>
//       prev.map((p) => (p.id === selectedId ? { ...p, ...changes } : p))
//     );
//   };

//   const selected = placeholders.find((p) => p.id === selectedId);

//   /* ================= SAVE ================= */
//   const saveTemplate = async () => {
//     if (!imageRef.current || !imageFile || !name) {
//       alert("Template name and image required");
//       return;
//     }

//     const naturalWidth = imageRef.current.naturalWidth;
//     const naturalHeight = imageRef.current.naturalHeight;

//     const payloadPlaceholders = placeholders.map((p) => ({
//       key: p.key,
//       x: Math.round((p.xPercent / 100) * naturalWidth),
//       y: Math.round((p.yPercent / 100) * naturalHeight),
//       fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
//       xPercent: p.xPercent,
//       yPercent: p.yPercent,
//       fontSizePercent: p.fontSizePercent,
//       color: p.color,
//       bold: p.bold,
//       italic: p.italic,
//       fontFamily: p.fontFamily,
//       letterSpacing: p.letterSpacing,
//       textShadow: p.textShadow,
//     }));

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("image", imageFile);
//     formData.append("placeholders", JSON.stringify(payloadPlaceholders));

//     await fetch("https://visitingcard-backend.onrender.com/templates/", {
//       method: "POST",
//       body: formData,
//     });

//     alert("Template saved ✅");
//   };

//   /* ================= UI ================= */
//   return (
//     <div style={{ display: "flex", gap: 24, padding: 20 }}>
//       {/* LEFT PANEL */}
//       <div style={{ width: 300, background: "#fff", padding: 20 }}>
//         <h3>Template Info</h3>

//         <input
//           placeholder="Template Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input type="file" accept="image/*" onChange={handleImageUpload} />

//         <button onClick={addPlaceholder}>➕ Add Text</button>

//         {selected && (
//           <>
//             <h4>Text Styling</h4>

//             <input
//               placeholder="Text"
//               value={selected.key}
//               onChange={(e) => updateSelected({ key: e.target.value })}
//             />

//             <label>Font Family</label>
//             <select
//               value={selected.fontFamily}
//               onChange={(e) =>
//                 updateSelected({ fontFamily: e.target.value })
//               }
//             >
//               {FONT_FAMILIES.map((f) => (
//                 <option key={f.value} value={f.value}>
//                   {f.label}
//                 </option>
//               ))}
//             </select>

//             <label>Font Size (%)</label>
//             <input
//               type="range"
//               min={1}
//               max={10}
//               step={0.1}
//               value={selected.fontSizePercent}
//               onChange={(e) =>
//                 updateSelected({ fontSizePercent: +e.target.value })
//               }
//             />

//             <label>Letter Spacing</label>
//             <input
//               type="range"
//               min={0}
//               max={10}
//               value={selected.letterSpacing}
//               onChange={(e) =>
//                 updateSelected({ letterSpacing: +e.target.value })
//               }
//             />

//             <label>Color</label>
//             <input
//               type="color"
//               value={selected.color}
//               onChange={(e) =>
//                 updateSelected({ color: e.target.value })
//               }
//             />

//             <label>
//               <input
//                 type="checkbox"
//                 checked={selected.bold}
//                 onChange={(e) =>
//                   updateSelected({ bold: e.target.checked })
//                 }
//               />
//               Bold
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={selected.italic}
//                 onChange={(e) =>
//                   updateSelected({ italic: e.target.checked })
//                 }
//               />
//               Italic
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={selected.textShadow}
//                 onChange={(e) =>
//                   updateSelected({ textShadow: e.target.checked })
//                 }
//               />
//               Wedding Shadow ✨
//             </label>
//           </>
//         )}

//         <button onClick={saveTemplate}>💾 Save Template</button>
//       </div>

//       {/* CANVAS */}
//       <div>
//         <div style={{ position: "relative" }}>
//           {imageUrl && (
//             <img
//               ref={imageRef}
//               src={imageUrl}
//               alt=""
//               onLoad={(e) => {
//                 const r = e.target.getBoundingClientRect();
//                 setDisplayDimensions({ width: r.width, height: r.height });
//               }}
//               style={{ maxWidth: "100%", maxHeight: "80vh" }}
//             />
//           )}

//           {placeholders.map((p) => {
//             const x = (p.xPercent / 100) * displayDimensions.width;
//             const y = (p.yPercent / 100) * displayDimensions.height;
//             const fs = (p.fontSizePercent / 100) * displayDimensions.width;

//             return (
//               <div
//                 key={p.id}
//                 ref={(el) => (textRefs.current[p.id] = el)}
//                 onMouseDown={(e) => startDrag(e, p.id)}
//                 style={{
//                   position: "absolute",
//                   left: x,
//                   top: y,
//                   fontSize: fs,
//                   fontFamily: p.fontFamily,
//                   fontWeight: p.bold ? 700 : 400,
//                   fontStyle: p.italic ? "italic" : "normal",
//                   letterSpacing: p.letterSpacing,
//                   color: p.color,
//                   textShadow: p.textShadow
//                     ? "2px 2px 6px rgba(0,0,0,0.3)"
//                     : "none",
//                   cursor: "move",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {p.key || "Type here"}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }















// import { useRef, useState, useEffect } from "react";
// import { Plus, Save, Type, Palette, ImagePlus, Sparkles } from "lucide-react";

// const FONT_FAMILIES = [
//   // 💍 Wedding / Script (Names)
//   { label: "Great Vibes (Wedding Script)", value: "'Great Vibes', cursive" },
//   { label: "Allura (Elegant Script)", value: "'Allura', cursive" },
//   { label: "Alex Brush (Luxury Script)", value: "'Alex Brush', cursive" },
//   { label: "Dancing Script", value: "'Dancing Script', cursive" },
//   { label: "Sacramento (Soft Script)", value: "'Sacramento', cursive" },
//   { label: "Parisienne (Romantic)", value: "'Parisienne', cursive" },

//   // 👑 Royal / Serif (Headings)
//   { label: "Playfair Display (Elegant)", value: "'Playfair Display', serif" },
//   { label: "Cinzel (Royal)", value: "'Cinzel', serif" },
//   { label: "Cormorant Garamond (Classic)", value: "'Cormorant Garamond', serif" },
//   { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
//   { label: "Merriweather", value: "'Merriweather', serif" },

//   // ✨ Modern / Clean (Details)
//   { label: "Poppins", value: "'Poppins', sans-serif" },
//   { label: "Montserrat", value: "'Montserrat', sans-serif" },
//   { label: "Lato", value: "'Lato', sans-serif" },
//   { label: "Raleway", value: "'Raleway', sans-serif" },
//   { label: "Open Sans", value: "'Open Sans', sans-serif" },

//   // 🎨 Decorative / Special
//   { label: "Cinzel Decorative", value: "'Cinzel Decorative', cursive" },
//   { label: "Italianno (Thin Script)", value: "'Italianno', cursive" },
// ];


// const TEMPLATE_TYPES = [
//   "Bottom Bar Design",
//   "Wedding Card Design",
//   "Birthday Wish Design",
//   "Business Card Design",
// ];


// export default function CreateTemplate() {
//   const imageRef = useRef(null);
//   const textRefs = useRef({});

//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);

//   const [displayDimensions, setDisplayDimensions] = useState({
//     width: 0,
//     height: 0,
//   });

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const [placeholders, setPlaceholders] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImageFile(file);
//     const url = URL.createObjectURL(file);
//     setImageUrl(url);
//   };

//   /* ================= TRACK DISPLAY SIZE ================= */
//   useEffect(() => {
//     const updateSize = () => {
//       if (!imageRef.current) return;
//       const r = imageRef.current.getBoundingClientRect();
//       setDisplayDimensions({ width: r.width, height: r.height });
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, [imageUrl]);

//   /* ================= ADD TEXT ================= */
//   const addPlaceholder = () => {
//     const id = crypto.randomUUID();
//     setPlaceholders((prev) => [
//       ...prev,
//       {
//         id,
//         key: "",
//         xPercent: 0,
//         yPercent: 0,
//         fontSizePercent: 4,
//         color: "#000000",
//         bold: true,
//         italic: false,
//         fontFamily: "'Great Vibes', cursive",
//         letterSpacing: 0,
//         textShadow: false,
//       },
//     ]);
//     setSelectedId(id);
//   };

//   /* ================= DRAG ================= */
//   const startDrag = (e, id) => {
//     e.preventDefault();
//     setSelectedId(id);

//     const img = imageRef.current;
//     const textEl = textRefs.current[id];
//     if (!img || !textEl) return;

//     const imgRect = img.getBoundingClientRect();
//     const textRect = textEl.getBoundingClientRect();

//     const startX = e.clientX;
//     const startY = e.clientY;

//     const target = placeholders.find((p) => p.id === id);
//     if (!target) return;

//     const baseX = (target.xPercent / 100) * imgRect.width;
//     const baseY = (target.yPercent / 100) * imgRect.height;

//     const onMove = (ev) => {
//       let x = baseX + (ev.clientX - startX);
//       let y = baseY + (ev.clientY - startY);

//       x = Math.max(0, Math.min(imgRect.width - textRect.width, x));
//       y = Math.max(0, Math.min(imgRect.height - textRect.height, y));

//       setPlaceholders((prev) =>
//         prev.map((p) =>
//           p.id === id
//             ? {
//                 ...p,
//                 xPercent: (x / imgRect.width) * 100,
//                 yPercent: (y / imgRect.height) * 100,
//               }
//             : p
//         )
//       );
//     };

//     const onUp = () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   };

//   /* ================= UPDATE ================= */
//   const updateSelected = (changes) => {
//     setPlaceholders((prev) =>
//       prev.map((p) => (p.id === selectedId ? { ...p, ...changes } : p))
//     );
//   };

//   const selected = placeholders.find((p) => p.id === selectedId);

//   /* ================= SAVE ================= */
//   const saveTemplate = async () => {
//     if (!imageRef.current || !imageFile || !name) {
//       alert("Template name and image required");
//       return;
//     }

//     const naturalWidth = imageRef.current.naturalWidth;
//     const naturalHeight = imageRef.current.naturalHeight;

//     const payloadPlaceholders = placeholders.map((p) => ({
//       key: p.key,
//       x: Math.round((p.xPercent / 100) * naturalWidth),
//       y: Math.round((p.yPercent / 100) * naturalHeight),
//       fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
//       xPercent: p.xPercent,
//       yPercent: p.yPercent,
//       fontSizePercent: p.fontSizePercent,
//       color: p.color,
//       bold: p.bold,
//       italic: p.italic,
//       fontFamily: p.fontFamily,
//       letterSpacing: p.letterSpacing,
//       textShadow: p.textShadow,
//     }));

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("image", imageFile);
//     formData.append("placeholders", JSON.stringify(payloadPlaceholders));

//     await fetch("https://visitingcard-backend.onrender.com/templates/", {
//       method: "POST",
//       body: formData,
//     });

//     alert("Template saved ✅");
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Sparkles className="w-6 h-6 text-blue-600" />
//               <h1 className="text-xl font-bold text-gray-900">Create Template</h1>
//             </div>
//             <button
//               onClick={saveTemplate}
//               className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//             >
//               <Save className="w-4 h-4" />
//               <span className="hidden sm:inline">Save Template</span>
//               <span className="sm:hidden">Save</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
//         {/* LEFT PANEL */}
//         <div className="w-full lg:w-80 bg-white rounded-xl shadow-lg p-6 space-y-6 h-fit lg:sticky lg:top-24">
//           {/* Template Info Section */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2 text-gray-900">
//               <ImagePlus className="w-5 h-5 text-blue-600" />
//               <h3 className="font-semibold text-lg">Template Info</h3>
//             </div>

//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Template Name *
//                 </label>
//         <select
//   value={name}
//   onChange={(e) => setName(e.target.value)}
//   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
// >
//   <option value="">Select template type *</option>
//   {TEMPLATE_TYPES.map((type) => (
//     <option key={type} value={type}>
//       {type}
//     </option>
//   ))}
// </select>

//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   placeholder="Describe your template"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={3}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload Image *
//                 </label>
//                 <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <ImagePlus className="w-5 h-5" />
//                     <span className="text-sm">{imageFile ? imageFile.name : "Choose image"}</span>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Add Text Button */}
//           <button
//             onClick={addPlaceholder}
//             className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
//           >
//             <Plus className="w-5 h-5" />
//             <span>Add Text Layer</span>
//           </button>

//           {/* Text Styling Section */}
//           {selected && (
//             <div className="space-y-4 pt-4 border-t border-gray-200">
//               <div className="flex items-center space-x-2 text-gray-900">
//                 <Type className="w-5 h-5 text-blue-600" />
//                 <h3 className="font-semibold text-lg">Text Styling</h3>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Text Content
//                   </label>
//                   <input
//                     placeholder="Enter text"
//                     value={selected.key}
//                     onChange={(e) => updateSelected({ key: e.target.value })}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Font Family
//                   </label>
//                   <select
//                     value={selected.fontFamily}
//                     onChange={(e) => updateSelected({ fontFamily: e.target.value })}
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
//                   >
//                     {FONT_FAMILIES.map((f) => (
//                       <option key={f.value} value={f.value}>
//                         {f.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Font Size: {selected.fontSizePercent.toFixed(1)}%
//                   </label>
//                   <input
//                     type="range"
//                     min={1}
//                     max={10}
//                     step={0.1}
//                     value={selected.fontSizePercent}
//                     onChange={(e) => updateSelected({ fontSizePercent: +e.target.value })}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Letter Spacing: {selected.letterSpacing}
//                   </label>
//                   <input
//                     type="range"
//                     min={0}
//                     max={10}
//                     value={selected.letterSpacing}
//                     onChange={(e) => updateSelected({ letterSpacing: +e.target.value })}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
//                     <Palette className="w-4 h-4" />
//                     <span>Text Color</span>
//                   </label>
//                   <div className="flex items-center space-x-3">
//                     <input
//                       type="color"
//                       value={selected.color}
//                       onChange={(e) => updateSelected({ color: e.target.value })}
//                       className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
//                     />
//                     <input
//                       type="text"
//                       value={selected.color}
//                       onChange={(e) => updateSelected({ color: e.target.value })}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2 pt-2">
//                   <label className="flex items-center space-x-3 cursor-pointer group">
//                     <input
//                       type="checkbox"
//                       checked={selected.bold}
//                       onChange={(e) => updateSelected({ bold: e.target.checked })}
//                       className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                     />
//                     <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                       Bold
//                     </span>
//                   </label>

//                   <label className="flex items-center space-x-3 cursor-pointer group">
//                     <input
//                       type="checkbox"
//                       checked={selected.italic}
//                       onChange={(e) => updateSelected({ italic: e.target.checked })}
//                       className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                     />
//                     <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                       Italic
//                     </span>
//                   </label>

//                   <label className="flex items-center space-x-3 cursor-pointer group">
//                     <input
//                       type="checkbox"
//                       checked={selected.textShadow}
//                       onChange={(e) => updateSelected({ textShadow: e.target.checked })}
//                       className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
//                     />
//                     <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                       Text Shadow ✨
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* CANVAS */}
//         <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
//           <div className="mb-4">
//             <h3 className="font-semibold text-lg text-gray-900">Canvas Preview</h3>
//             <p className="text-sm text-gray-600 mt-1">
//               {imageUrl ? "Drag text elements to position them" : "Upload an image to start designing"}
//             </p>
//           </div>

//           <div className="relative bg-gray-50 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
//             {!imageUrl ? (
//               <div className="text-center text-gray-400 py-20">
//                 <ImagePlus className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                 <p className="text-lg font-medium">No image uploaded</p>
//                 <p className="text-sm mt-2">Upload an image to begin</p>
//               </div>
//             ) : (
//               <div className="relative inline-block">
//                 <img
//                   ref={imageRef}
//                   src={imageUrl}
//                   alt=""
//                   onLoad={(e) => {
//                     const r = e.target.getBoundingClientRect();
//                     setDisplayDimensions({ width: r.width, height: r.height });
//                   }}
//                   className="max-w-full max-h-[calc(100vh-300px)] rounded-lg shadow-md"
//                 />

//                 {placeholders.map((p) => {
//                   const x = (p.xPercent / 100) * displayDimensions.width;
//                   const y = (p.yPercent / 100) * displayDimensions.height;
//                   const fs = (p.fontSizePercent / 100) * displayDimensions.width;

//                   return (
//                     <div
//                       key={p.id}
//                       ref={(el) => (textRefs.current[p.id] = el)}
//                       onMouseDown={(e) => startDrag(e, p.id)}
//                       style={{
//                         position: "absolute",
//                         left: x,
//                         top: y,
//                         fontSize: fs,
//                         fontFamily: p.fontFamily,
//                         fontWeight: p.bold ? 700 : 400,
//                         fontStyle: p.italic ? "italic" : "normal",
//                         letterSpacing: p.letterSpacing,
//                         color: p.color,
//                         textShadow: p.textShadow
//                           ? "2px 2px 6px rgba(0,0,0,0.3)"
//                           : "none",
//                         cursor: "move",
//                         whiteSpace: "nowrap",
//                       }}
//                       className={`select-none ${selectedId === p.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
//                     >
//                       {p.key || "Type here"}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















import { useRef, useState, useEffect } from "react";
import { Plus, Save, Type, Palette, ImagePlus, Sparkles } from "lucide-react";

const FONT_FAMILIES = [
  // 💍 Wedding / Script (Names)
  { label: "Great Vibes (Wedding Script)", value: "'Great Vibes', cursive" },
  { label: "Allura (Elegant Script)", value: "'Allura', cursive" },
  { label: "Alex Brush (Luxury Script)", value: "'Alex Brush', cursive" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Sacramento (Soft Script)", value: "'Sacramento', cursive" },
  { label: "Parisienne (Romantic)", value: "'Parisienne', cursive" },

  // 👑 Royal / Serif (Headings)
  { label: "Playfair Display (Elegant)", value: "'Playfair Display', serif" },
  { label: "Cinzel (Royal)", value: "'Cinzel', serif" },
  { label: "Cormorant Garamond (Classic)", value: "'Cormorant Garamond', serif" },
  { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
  { label: "Merriweather", value: "'Merriweather', serif" },

  // ✨ Modern / Clean (Details)
  { label: "Poppins", value: "'Poppins', sans-serif" },
  { label: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Lato", value: "'Lato', sans-serif" },
  { label: "Raleway", value: "'Raleway', sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },

  // 🎨 Decorative / Special
  { label: "Cinzel Decorative", value: "'Cinzel Decorative', cursive" },
  { label: "Italianno (Thin Script)", value: "'Italianno', cursive" },
];

const TEMPLATE_TYPES = [
  "Bottom Bar Design",
  "Wedding Card Design",
  "Birthday Wish Design",
  "Business Card Design",
];

export default function CreateTemplate() {
  const imageRef = useRef(null);
  const textRefs = useRef({});

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [displayDimensions, setDisplayDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [placeholders, setPlaceholders] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  /* ================= TRACK DISPLAY SIZE ================= */
  useEffect(() => {
    const updateSize = () => {
      if (!imageRef.current) return;
      const r = imageRef.current.getBoundingClientRect();
      setDisplayDimensions({ width: r.width, height: r.height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [imageUrl]);

  /* ================= ADD TEXT ================= */
  const addPlaceholder = () => {
    const id = crypto.randomUUID();
    setPlaceholders((prev) => [
      ...prev,
      {
        id,
        key: "",
        xPercent: 0,
        yPercent: 0,
        fontSizePercent: 4,
        color: "#000000",
        bold: true,
        italic: false,
        fontFamily: "'Great Vibes', cursive",
        letterSpacing: 0,
        textShadow: false,
      },
    ]);
    setSelectedId(id);
  };

  /* ================= DRAG FUNCTION (WORKS FOR BOTH MOUSE & TOUCH) ================= */
  const startDrag = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);

    const img = imageRef.current;
    const textEl = textRefs.current[id];
    if (!img || !textEl) return;

    const imgRect = img.getBoundingClientRect();
    const textRect = textEl.getBoundingClientRect();

    // Get coordinates based on event type (mouse or touch)
    const isTouch = e.type.includes('touch');
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    const startX = clientX;
    const startY = clientY;

    const target = placeholders.find((p) => p.id === id);
    if (!target) return;

    const baseX = (target.xPercent / 100) * imgRect.width;
    const baseY = (target.yPercent / 100) * imgRect.height;

    const onMove = (ev) => {
      // Get coordinates based on event type
      const isMoveTouch = ev.type.includes('touch');
      const moveX = isMoveTouch ? ev.touches[0].clientX : ev.clientX;
      const moveY = isMoveTouch ? ev.touches[0].clientY : ev.clientY;
      
      let x = baseX + (moveX - startX);
      let y = baseY + (moveY - startY);

      x = Math.max(0, Math.min(imgRect.width - textRect.width, x));
      y = Math.max(0, Math.min(imgRect.height - textRect.height, y));

      setPlaceholders((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                xPercent: (x / imgRect.width) * 100,
                yPercent: (y / imgRect.height) * 100,
              }
            : p
        )
      );
    };

    const onUp = () => {
      // Remove mouse event listeners
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      // Remove touch event listeners
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };

    // Add both mouse and touch event listeners
    if (isTouch) {
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onUp);
    } else {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    }
  };

  /* ================= UPDATE ================= */
  const updateSelected = (changes) => {
    setPlaceholders((prev) =>
      prev.map((p) => (p.id === selectedId ? { ...p, ...changes } : p))
    );
  };

  const selected = placeholders.find((p) => p.id === selectedId);

  /* ================= SAVE ================= */
  const saveTemplate = async () => {
    if (!imageRef.current || !imageFile || !name) {
      alert("Template name and image required");
      return;
    }

    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;

    const payloadPlaceholders = placeholders.map((p) => ({
      key: p.key,
      x: Math.round((p.xPercent / 100) * naturalWidth),
      y: Math.round((p.yPercent / 100) * naturalHeight),
      fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
      xPercent: p.xPercent,
      yPercent: p.yPercent,
      fontSizePercent: p.fontSizePercent,
      color: p.color,
      bold: p.bold,
      italic: p.italic,
      fontFamily: p.fontFamily,
      letterSpacing: p.letterSpacing,
      textShadow: p.textShadow,
    }));

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageFile);
    formData.append("placeholders", JSON.stringify(payloadPlaceholders));

    await fetch("https://visitingcard-backend.onrender.com/templates/", {
      method: "POST",
      body: formData,
    });

    alert("Template saved ✅");
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Create Template</h1>
            </div>
            <button
              onClick={saveTemplate}
              className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save Template</span>
              <span className="sm:hidden">Save</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
        {/* LEFT PANEL */}
        <div className="w-full lg:w-80 bg-white rounded-xl shadow-lg p-6 space-y-6 h-fit lg:sticky lg:top-24">
          {/* Template Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-900">
              <ImagePlus className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Template Info</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name *
                </label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select template type *</option>
                  {TEMPLATE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe your template"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image *
                </label>
                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center space-x-2 text-gray-600">
                    <ImagePlus className="w-5 h-5" />
                    <span className="text-sm">{imageFile ? imageFile.name : "Choose image"}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Add Text Button */}
          <button
            onClick={addPlaceholder}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add Text Layer</span>
          </button>

          {/* Text Styling Section */}
          {selected && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-gray-900">
                <Type className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Text Styling</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Content
                  </label>
                  <input
                    placeholder="Enter text"
                    value={selected.key}
                    onChange={(e) => updateSelected({ key: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Family
                  </label>
                  <select
                    value={selected.fontFamily}
                    onChange={(e) => updateSelected({ fontFamily: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {FONT_FAMILIES.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size: {selected.fontSizePercent.toFixed(1)}%
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={0.1}
                    value={selected.fontSizePercent}
                    onChange={(e) => updateSelected({ fontSizePercent: +e.target.value })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Letter Spacing: {selected.letterSpacing}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={selected.letterSpacing}
                    onChange={(e) => updateSelected({ letterSpacing: +e.target.value })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span>Text Color</span>
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={selected.color}
                      onChange={(e) => updateSelected({ color: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={selected.color}
                      onChange={(e) => updateSelected({ color: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selected.bold}
                      onChange={(e) => updateSelected({ bold: e.target.checked })}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Bold
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selected.italic}
                      onChange={(e) => updateSelected({ italic: e.target.checked })}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Italic
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selected.textShadow}
                      onChange={(e) => updateSelected({ textShadow: e.target.checked })}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Text Shadow ✨
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CANVAS */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-900">Canvas Preview</h3>
            <p className="text-sm text-gray-600 mt-1">
              {imageUrl ? "Drag text elements to position them (works on mobile too!)" : "Upload an image to start designing"}
            </p>
          </div>

          <div className="relative bg-gray-50 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
            {!imageUrl ? (
              <div className="text-center text-gray-400 py-20">
                <ImagePlus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No image uploaded</p>
                <p className="text-sm mt-2">Upload an image to begin</p>
              </div>
            ) : (
              <div className="relative inline-block">
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt=""
                  onLoad={(e) => {
                    const r = e.target.getBoundingClientRect();
                    setDisplayDimensions({ width: r.width, height: r.height });
                  }}
                  className="max-w-full max-h-[calc(100vh-300px)] rounded-lg shadow-md"
                  style={{ touchAction: "none" }} // Prevent image dragging on mobile
                />

                {placeholders.map((p) => {
                  const x = (p.xPercent / 100) * displayDimensions.width;
                  const y = (p.yPercent / 100) * displayDimensions.height;
                  const fs = (p.fontSizePercent / 100) * displayDimensions.width;

                  return (
                    <div
                      key={p.id}
                      ref={(el) => (textRefs.current[p.id] = el)}
                      onMouseDown={(e) => startDrag(e, p.id)}
                      onTouchStart={(e) => startDrag(e, p.id)} // Touch support for mobile
                      style={{
                        position: "absolute",
                        left: x,
                        top: y,
                        fontSize: fs,
                        fontFamily: p.fontFamily,
                        fontWeight: p.bold ? 700 : 400,
                        fontStyle: p.italic ? "italic" : "normal",
                        letterSpacing: p.letterSpacing,
                        color: p.color,
                        textShadow: p.textShadow
                          ? "2px 2px 6px rgba(0,0,0,0.3)"
                          : "none",
                        cursor: "move",
                        whiteSpace: "nowrap",
                        // Mobile touch optimizations
                        touchAction: "none",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                      className={`select-none ${selectedId === p.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    >
                      {p.key || "Type here"}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add this CSS for better mobile experience */}
      <style jsx global>{`
        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Prevent text selection during drag on mobile */
          .select-none {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        }
      `}</style>
    </div>
  );
}