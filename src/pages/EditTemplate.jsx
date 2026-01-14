// import { useRef, useState, useEffect } from "react";
// import { Plus, Save, Type, Palette, ImagePlus, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";

// // Mock hooks for demo - replace with actual react-router-dom in your app

// const FONT_FAMILIES = [
//   { label: "Great Vibes (Wedding Script)", value: "'Great Vibes', cursive" },
//   { label: "Allura (Elegant Script)", value: "'Allura', cursive" },
//   { label: "Alex Brush (Luxury Script)", value: "'Alex Brush', cursive" },
//   { label: "Dancing Script", value: "'Dancing Script', cursive" },
//   { label: "Sacramento (Soft Script)", value: "'Sacramento', cursive" },
//   { label: "Parisienne (Romantic)", value: "'Parisienne', cursive" },
//   { label: "Playfair Display (Elegant)", value: "'Playfair Display', serif" },
//   { label: "Cinzel (Royal)", value: "'Cinzel', serif" },
//   { label: "Cormorant Garamond (Classic)", value: "'Cormorant Garamond', serif" },
//   { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
//   { label: "Merriweather", value: "'Merriweather', serif" },
//   { label: "Poppins", value: "'Poppins', sans-serif" },
//   { label: "Montserrat", value: "'Montserrat', sans-serif" },
//   { label: "Lato", value: "'Lato', sans-serif" },
//   { label: "Raleway", value: "'Raleway', sans-serif" },
//   { label: "Open Sans", value: "'Open Sans', sans-serif" },
//   { label: "Cinzel Decorative", value: "'Cinzel Decorative', cursive" },
//   { label: "Italianno (Thin Script)", value: "'Italianno', cursive" },
// ];

// export default function EditTemplate() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const imageRef = useRef(null);
//   const textRefs = useRef({});

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [originalImageUrl, setOriginalImageUrl] = useState(null);

//   const [displayDimensions, setDisplayDimensions] = useState({
//     width: 0,
//     height: 0,
//   });

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [placeholders, setPlaceholders] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);

//   /* ================= FETCH TEMPLATE ================= */
//   useEffect(() => {
//     fetchTemplate();
//   }, [id]);

//   const fetchTemplate = async () => {
//     try {
// console.log("Template ID:", id)
//       const res = await fetch(`https://visitingcard-backend.onrender.com/templates/${id}`);
//       const template = await res.json();
      
//       setName(template.name);
//       setDescription(template.description || "");
//       setOriginalImageUrl(template.imageUrl);
//       setImageUrl(template.imageUrl);
      
//       // Convert backend placeholders to frontend format
//       const convertedPlaceholders = template.placeholders?.map((p) => ({
//         id: crypto.randomUUID(),
//         key: p.key,
//         xPercent: p.xPercent || 0,
//         yPercent: p.yPercent || 0,
//         fontSizePercent: p.fontSizePercent || 4,
//         color: p.color || "#000000",
//         bold: p.bold !== undefined ? p.bold : true,
//         italic: p.italic || false,
//         fontFamily: p.fontFamily || "'Great Vibes', cursive",
//         letterSpacing: p.letterSpacing || 0,
//         textShadow: p.textShadow || false,
//       })) || [];
      
//       setPlaceholders(convertedPlaceholders);
//     } catch (e) {
//       console.error("Error fetching template:", e);
//       alert("Failed to load template");
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   /* ================= DELETE TEXT ================= */
//   const deleteSelected = () => {
//     if (!selectedId) return;
//     setPlaceholders((prev) => prev.filter((p) => p.id !== selectedId));
//     setSelectedId(null);
//   };

//   /* ================= UPDATE TEMPLATE ================= */
//   const updateTemplate = async () => {
//     if (!imageRef.current || !name) {
//       alert("Template name is required");
//       return;
//     }

//     setSaving(true);

//     try {
//       const naturalWidth = imageRef.current.naturalWidth;
//       const naturalHeight = imageRef.current.naturalHeight;

//       const payloadPlaceholders = placeholders.map((p) => ({
//         key: p.key,
//         x: Math.round((p.xPercent / 100) * naturalWidth),
//         y: Math.round((p.yPercent / 100) * naturalHeight),
//         fontSize: Math.round((p.fontSizePercent / 100) * naturalWidth),
//         xPercent: p.xPercent,
//         yPercent: p.yPercent,
//         fontSizePercent: p.fontSizePercent,
//         color: p.color,
//         bold: p.bold,
//         italic: p.italic,
//         fontFamily: p.fontFamily,
//         letterSpacing: p.letterSpacing,
//         textShadow: p.textShadow,
//       }));

//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
      
//       // Only append image if a new one was uploaded
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }
      
//       formData.append("placeholders", JSON.stringify(payloadPlaceholders));

//       const response = await fetch(`https://visitingcard-backend.onrender.com/templates/${id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Template updated successfully ✅");
//         navigate("/templates");
//       } else {
//         throw new Error("Failed to update template");
//       }
//     } catch (error) {
//       console.error("Error updating template:", error);
//       alert("Failed to update template");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ================= LOADING STATE ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600 font-medium">Loading template...</p>
//         </div>
//       </div>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate("/templates")}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <div className="flex items-center space-x-2">
//                 <Sparkles className="w-6 h-6 text-blue-600" />
//                 <h1 className="text-xl font-bold text-gray-900">Edit Template</h1>
//               </div>
//             </div>
//             <button
//               onClick={updateTemplate}
//               disabled={saving}
//               className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {saving ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   <span className="hidden sm:inline">Updating...</span>
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-4 h-4" />
//                   <span className="hidden sm:inline">Update Template</span>
//                   <span className="sm:hidden">Update</span>
//                 </>
//               )}
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
//                 <input
//                   placeholder="Enter template name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                 />
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
//                   Change Image (Optional)
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
//                     <span className="text-sm">
//                       {imageFile ? imageFile.name : "Upload new image"}
//                     </span>
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
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2 text-gray-900">
//                   <Type className="w-5 h-5 text-blue-600" />
//                   <h3 className="font-semibold text-lg">Text Styling</h3>
//                 </div>
//                 <button
//                   onClick={deleteSelected}
//                   className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
//                 >
//                   Delete
//                 </button>
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
//               Drag text elements to reposition them
//             </p>
//           </div>

//           <div className="relative bg-gray-50 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
//             {imageUrl && (
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
import { Plus, Save, Type, Palette, ImagePlus, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

// Mock hooks for demo - replace with actual react-router-dom in your app

const FONT_FAMILIES = [
  { label: "Great Vibes (Wedding Script)", value: "'Great Vibes', cursive" },
  { label: "Allura (Elegant Script)", value: "'Allura', cursive" },
  { label: "Alex Brush (Luxury Script)", value: "'Alex Brush', cursive" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Sacramento (Soft Script)", value: "'Sacramento', cursive" },
  { label: "Parisienne (Romantic)", value: "'Parisienne', cursive" },
  { label: "Playfair Display (Elegant)", value: "'Playfair Display', serif" },
  { label: "Cinzel (Royal)", value: "'Cinzel', serif" },
  { label: "Cormorant Garamond (Classic)", value: "'Cormorant Garamond', serif" },
  { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
  { label: "Merriweather", value: "'Merriweather', serif" },
  { label: "Poppins", value: "'Poppins', sans-serif" },
  { label: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Lato", value: "'Lato', sans-serif" },
  { label: "Raleway", value: "'Raleway', sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Cinzel Decorative", value: "'Cinzel Decorative', cursive" },
  { label: "Italianno (Thin Script)", value: "'Italianno', cursive" },
];

export default function EditTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const textRefs = useRef({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);

  const [displayDimensions, setDisplayDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [placeholders, setPlaceholders] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  /* ================= FETCH TEMPLATE ================= */
  useEffect(() => {
    fetchTemplate();
  }, [id]);

  const fetchTemplate = async () => {
    try {
      console.log("Template ID:", id)
      const res = await fetch(`https://visitingcard-backend.onrender.com/templates/${id}`);
      const template = await res.json();
      
      setName(template.name);
      setDescription(template.description || "");
      setOriginalImageUrl(template.imageUrl);
      setImageUrl(template.imageUrl);
      
      // Convert backend placeholders to frontend format
      const convertedPlaceholders = template.placeholders?.map((p) => ({
        id: crypto.randomUUID(),
        key: p.key,
        xPercent: p.xPercent || 0,
        yPercent: p.yPercent || 0,
        fontSizePercent: p.fontSizePercent || 4,
        color: p.color || "#000000",
        bold: p.bold !== undefined ? p.bold : true,
        italic: p.italic || false,
        fontFamily: p.fontFamily || "'Great Vibes', cursive",
        letterSpacing: p.letterSpacing || 0,
        textShadow: p.textShadow || false,
      })) || [];
      
      setPlaceholders(convertedPlaceholders);
    } catch (e) {
      console.error("Error fetching template:", e);
      alert("Failed to load template");
    } finally {
      setLoading(false);
    }
  };

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

  /* ================= DRAG - UPDATED FOR MOBILE SUPPORT ================= */
  const startDrag = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);

    const img = imageRef.current;
    const textEl = textRefs.current[id];
    if (!img || !textEl) return;

    const imgRect = img.getBoundingClientRect();
    const textRect = textEl.getBoundingClientRect();

    // Check if it's a touch event
    const isTouch = e.type === 'touchstart';
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    const startX = clientX;
    const startY = clientY;

    const target = placeholders.find((p) => p.id === id);
    if (!target) return;

    const baseX = (target.xPercent / 100) * imgRect.width;
    const baseY = (target.yPercent / 100) * imgRect.height;

    const onMove = (ev) => {
      // Prevent default to avoid scrolling while dragging
      ev.preventDefault();
      
      const currentX = isTouch ? ev.touches[0].clientX : ev.clientX;
      const currentY = isTouch ? ev.touches[0].clientY : ev.clientY;

      let x = baseX + (currentX - startX);
      let y = baseY + (currentY - startY);

      // Boundary checks
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
      // Remove both mouse and touch event listeners
      if (isTouch) {
        window.removeEventListener("touchmove", onMove, { passive: false });
        window.removeEventListener("touchend", onUp);
      } else {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      }
    };

    // Add appropriate event listeners based on device
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

  /* ================= DELETE TEXT ================= */
  const deleteSelected = () => {
    if (!selectedId) return;
    setPlaceholders((prev) => prev.filter((p) => p.id !== selectedId));
    setSelectedId(null);
  };

  /* ================= UPDATE TEMPLATE ================= */
  const updateTemplate = async () => {
    if (!imageRef.current || !name) {
      alert("Template name is required");
      return;
    }

    setSaving(true);

    try {
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
      
      // Only append image if a new one was uploaded
      if (imageFile) {
        formData.append("image", imageFile);
      }
      
      formData.append("placeholders", JSON.stringify(payloadPlaceholders));

      const response = await fetch(`https://visitingcard-backend.onrender.com/templates/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Template updated successfully ✅");
        navigate("/templates");
      } else {
        throw new Error("Failed to update template");
      }
    } catch (error) {
      console.error("Error updating template:", error);
      alert("Failed to update template");
    } finally {
      setSaving(false);
    }
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading template...</p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/templates")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Edit Template</h1>
              </div>
            </div>
            <button
              onClick={updateTemplate}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Update Template</span>
                  <span className="sm:hidden">Update</span>
                </>
              )}
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
                <input
                  placeholder="Enter template name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
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
                  Change Image (Optional)
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
                    <span className="text-sm">
                      {imageFile ? imageFile.name : "Upload new image"}
                    </span>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-900">
                  <Type className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-lg">Text Styling</h3>
                </div>
                <button
                  onClick={deleteSelected}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
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
              Drag text elements to reposition them (works on mobile too!)
            </p>
          </div>

          <div className="relative bg-gray-50 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
            {imageUrl && (
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
                      onTouchStart={(e) => startDrag(e, p.id)}
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
                        // Mobile-specific styles
                        touchAction: "none",
                        userSelect: "none",
                        WebkitUserSelect: "none",
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
    </div>
  );
}