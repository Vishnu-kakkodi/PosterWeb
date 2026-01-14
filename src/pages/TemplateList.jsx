// // import { useEffect, useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./TemplateList.css";

// // export default function TemplateList() {
// //   const [templates, setTemplates] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedTemplate, setSelectedTemplate] = useState(null);
// //   const navigate = useNavigate();

// //   const imageRef = useRef(null);
// //   const [imageSize, setImageSize] = useState({
// //     width: 0,
// //     height: 0,
// //     naturalWidth: 0,
// //     naturalHeight: 0,
// //   });

// //   useEffect(() => {
// //     fetchTemplates();
// //   }, []);

// //   const fetchTemplates = async () => {
// //     try {
// //       const res = await fetch(
// //         "https://visitingcard-backend.onrender.com/templates/"
// //       );
// //       const data = await res.json();
// //       setTemplates(data);
// //     } catch (e) {
// //       console.error(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const closePreview = () => {
// //     setSelectedTemplate(null);
// //     setImageSize({
// //       width: 0,
// //       height: 0,
// //       naturalWidth: 0,
// //       naturalHeight: 0,
// //     });
// //   };

// //   if (loading) {
// //     return <div className="loading">Loading...</div>;
// //   }

// //   return (
// //     <div className="page">
// //       <div className="header">
// //         <h1>Business Card Templates</h1>
// //         <button onClick={() => navigate("/create")}>
// //           + Create New Template
// //         </button>
// //       </div>

// //       {/* GRID */}
// //       <div className="grid">
// //         {templates.map((t) => (
// //           <div
// //             key={t._id}
// //             className="card"
// //             onClick={() => setSelectedTemplate(t)}
// //           >
// //             <div className="thumb-wrapper">
// //               <img src={t.imageUrl} alt={t.name} />
// //             </div>
// //             <h3>{t.name}</h3>
// //             <p>{t.placeholders?.length || 0} fields</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* PREVIEW MODAL */}
// //       {selectedTemplate && (
// //         <div className="modal-overlay" onClick={closePreview}>
// //           <div
// //             className="modal"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div className="modal-header">
// //               <h2>{selectedTemplate.name}</h2>
// //               <button onClick={closePreview}>✕</button>
// //             </div>

// //             <div className="preview-area">
// //               <div className="image-container">
// // <img
// //   ref={imageRef}
// //   src={selectedTemplate.imageUrl}
// //   alt="preview"
// //   className="preview-image"
// //   onLoad={(e) => {
// //     const img = e.target;
// //     const rect = img.getBoundingClientRect();

// //     setImageSize({
// //       width: rect.width,
// //       height: rect.height,
// //       naturalWidth: img.naturalWidth,
// //       naturalHeight: img.naturalHeight,
// //     });
// //   }}
// // />


// //                 {/* PLACEHOLDERS */}
// //                 {imageSize.width > 0 &&
// //                   selectedTemplate.placeholders?.map((p, i) => {
// //                     const scaleX =
// //                       imageSize.width / imageSize.naturalWidth;
// //                     const scaleY =
// //                       imageSize.height / imageSize.naturalHeight;

// //                     const x = p.x * scaleX;
// //                     const y = p.y * scaleY;
// //                     const fontSize = p.fontSize * scaleX;

// //                     return (
// //                       <div
// //                         key={i}
// //                         className="placeholder"
// //                         style={{
// //                           left: x,
// //                           top: y,
// //                           fontSize,
// //                           color: p.color || "#000",
// //                           fontWeight: p.bold ? "700" : "400",
// //                         }}
// //                       >
// //                         {p.key}
// //                       </div>
// //                     );
// //                   })}
// //               </div>
// //             </div>

// //             <div className="actions">
// //               <button
// //                 onClick={() =>
// //                   navigate(`/generate/${selectedTemplate._id}`)
// //                 }
// //               >
// //                 Generate
// //               </button>
// //               <button
// //                 onClick={() =>
// //                   navigate(`/edit-template/${selectedTemplate._id}`)
// //                 }
// //               >
// //                 Edit
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }






















// import { useEffect, useState, useRef } from "react";
// import { Plus, Eye, Edit, Loader2, X, Sparkles } from "lucide-react";

// // Mock hook for demo - replace with actual react-router-dom
// const useNavigate = () => (path) => console.log("Navigate to:", path);

// export default function TemplateList() {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const navigate = useNavigate();

//   const imageRef = useRef(null);
//   const cardImageRefs = useRef({});
//   const [imageSize, setImageSize] = useState({
//     width: 0,
//     height: 0,
//     naturalWidth: 0,
//     naturalHeight: 0,
//   });

//   const [cardImageSizes, setCardImageSizes] = useState({});

//   useEffect(() => {
//     fetchTemplates();
//   }, []);

//   const fetchTemplates = async () => {
//     try {
//       const res = await fetch(
//         "https://visitingcard-backend.onrender.com/templates/"
//       );
//       const data = await res.json();
//       setTemplates(data);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closePreview = () => {
//     setSelectedTemplate(null);
//     setImageSize({
//       width: 0,
//       height: 0,
//       naturalWidth: 0,
//       naturalHeight: 0,
//     });
//   };

//   const handleCardImageLoad = (templateId, e) => {
//     const img = e.target;
//     const rect = img.getBoundingClientRect();

//     setCardImageSizes((prev) => ({
//       ...prev,
//       [templateId]: {
//         width: rect.width,
//         height: rect.height,
//         naturalWidth: img.naturalWidth,
//         naturalHeight: img.naturalHeight,
//       },
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600 font-medium">Loading templates...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Sparkles className="w-8 h-8 text-blue-600" />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Choose from {templates.length} professional templates
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate("/create")}
//               className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//             >
//               <Plus className="w-5 h-5" />
//               <span className="hidden sm:inline">Create New</span>
//               <span className="sm:hidden">New</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Grid - Masonry Style */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {templates.map((t) => {
//             const cardSize = cardImageSizes[t._id];

//             return (
//               <div
//                 key={t._id}
//                 className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer group"
//                 onClick={() => setSelectedTemplate(t)}
//               >
//                 {/* Fixed height container that centers content */}
//                 <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl overflow-hidden flex items-center justify-center p-4">
//                   <div className="relative max-w-full max-h-full">
//                     <img
//                       ref={(el) => (cardImageRefs.current[t._id] = el)}
//                       src={t.imageUrl}
//                       alt={t.name}
//                       onLoad={(e) => handleCardImageLoad(t._id, e)}
//                       className="max-w-full max-h-full object-contain shadow-lg rounded group-hover:scale-105 transition-transform duration-300"
//                       style={{ maxHeight: '240px' }}
//                     />

//                     {/* Overlay Placeholders */}
//                     {cardSize && cardSize.width > 0 &&
//                       t.placeholders?.map((p, i) => {
//                         const scaleX = cardSize.width / cardSize.naturalWidth;
//                         const scaleY = cardSize.height / cardSize.naturalHeight;

//                         const x = p.x * scaleX;
//                         const y = p.y * scaleY;
//                         const fontSize = p.fontSize * scaleX;

//                         return (
//                           <div
//                             key={i}
//                             style={{
//                               position: "absolute",
//                               left: x,
//                               top: y,
//                               fontSize,
//                               color: p.color || "#000",
//                               fontWeight: p.bold ? "700" : "400",
//                               fontStyle: p.italic ? "italic" : "normal",
//                               fontFamily: p.fontFamily || "inherit",
//                               letterSpacing: p.letterSpacing || 0,
//                               textShadow: p.textShadow
//                                 ? "2px 2px 6px rgba(0,0,0,0.3)"
//                                 : "none",
//                               textDecoration: p.underline ? "underline" : "none",
//                               transform: p.rotation ? `rotate(${p.rotation}deg)` : "none",
//                               opacity: p.opacity !== undefined ? p.opacity : 1,
//                               whiteSpace: "nowrap",
//                               pointerEvents: "none",
//                             }}
//                           >
//                             {p.key}
//                           </div>
//                         );
//                       })}
//                   </div>

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center rounded-t-xl">
//                     <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center space-y-2">
//                       <Eye className="w-10 h-10 text-white" />
//                       <span className="text-white font-medium">View Details</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Card Info */}
//                 <div className="p-5">
//                   <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
//                     {t.name}
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600">
//                       {t.placeholders?.length || 0} text fields
//                     </p>
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                       {t.description || "Template"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {templates.length === 0 && (
//           <div className="text-center py-16">
//             <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">
//               No templates yet
//             </h3>
//             <p className="text-gray-500 mb-6">
//               Create your first template to get started
//             </p>
//             <button
//               onClick={() => navigate("/create")}
//               className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Create Template</span>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Preview Modal */}
//       {selectedTemplate && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//           onClick={closePreview}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {selectedTemplate.name}
//                 </h2>
//                 {selectedTemplate.description && (
//                   <p className="text-sm text-gray-600 mt-1">
//                     {selectedTemplate.description}
//                   </p>
//                 )}
//               </div>
//               <button
//                 onClick={closePreview}
//                 className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
//               >
//                 <X className="w-6 h-6 text-gray-600" />
//               </button>
//             </div>

//             {/* Preview Area - Scrollable */}
//             <div className="flex-1 overflow-auto p-6">
//               <div className="flex justify-center items-center min-h-full">
//                 <div className="relative inline-block">
//                   <img
//                     ref={imageRef}
//                     src={selectedTemplate.imageUrl}
//                     alt="preview"
//                     onLoad={(e) => {
//                       const img = e.target;
//                       const rect = img.getBoundingClientRect();

//                       setImageSize({
//                         width: rect.width,
//                         height: rect.height,
//                         naturalWidth: img.naturalWidth,
//                         naturalHeight: img.naturalHeight,
//                       });
//                     }}
//                     className="max-w-full h-auto rounded-lg shadow-xl"
//                     style={{ maxHeight: 'calc(90vh - 300px)' }}
//                   />

//                   {/* Placeholders Overlay */}
//                   {imageSize.width > 0 &&
//                     selectedTemplate.placeholders?.map((p, i) => {
//                       const scaleX = imageSize.width / imageSize.naturalWidth;
//                       const scaleY = imageSize.height / imageSize.naturalHeight;

//                       const x = p.x * scaleX;
//                       const y = p.y * scaleY;
//                       const fontSize = p.fontSize * scaleX;

//                       return (
//                         <div
//                           key={i}
//                           style={{
//                             position: "absolute",
//                             left: x,
//                             top: y,
//                             fontSize,
//                             color: p.color || "#000",
//                             fontWeight: p.bold ? "700" : "400",
//                             fontStyle: p.italic ? "italic" : "normal",
//                             fontFamily: p.fontFamily || "inherit",
//                             letterSpacing: p.letterSpacing || 0,
//                             textShadow: p.textShadow
//                               ? "2px 2px 6px rgba(0,0,0,0.3)"
//                               : "none",
//                             textDecoration: p.underline ? "underline" : "none",
//                             transform: p.rotation ? `rotate(${p.rotation}deg)` : "none",
//                             opacity: p.opacity !== undefined ? p.opacity : 1,
//                             whiteSpace: "nowrap",
//                             pointerEvents: "none",
//                           }}
//                         >
//                           {p.key}
//                         </div>
//                       );
//                     })}
//                 </div>
//               </div>

//               {/* Template Info */}
//               <div className="mt-8 bg-gray-50 rounded-lg p-4">
//                 <h3 className="font-semibold text-gray-900 mb-3">
//                   Text Fields ({selectedTemplate.placeholders?.length || 0})
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
//                   {selectedTemplate.placeholders?.map((p, i) => (
//                     <div
//                       key={i}
//                       className="bg-white rounded-lg p-3 border border-gray-200"
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-xs font-medium text-gray-500">
//                           Field {i + 1}
//                         </span>
//                         <div
//                           className="w-4 h-4 rounded border border-gray-300"
//                           style={{ backgroundColor: p.color }}
//                         />
//                       </div>
//                       <p
//                         className="text-sm font-medium text-gray-900 truncate"
//                         style={{ fontFamily: p.fontFamily || "inherit" }}
//                       >
//                         {p.key}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {p.fontFamily?.split(",")[0]?.replace(/'/g, "") || "Default"}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Actions - Fixed at Bottom */}
//             <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
//               <button
//                 onClick={() => navigate(`/edit-template/${selectedTemplate._id}`)}
//                 className="flex items-center space-x-2 px-6 py-2.5 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
//               >
//                 <Edit className="w-4 h-4" />
//                 <span>Edit Template</span>
//               </button>
//               <button
//                 onClick={() => navigate(`/generate/${selectedTemplate._id}`)}
//                 className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//               >
//                 <Sparkles className="w-4 h-4" />
//                 <span>Generate Design</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






















import { useEffect, useState, useRef } from "react";
import { Plus, Eye, Edit, Loader2, X, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";


// Mock hook for demo - replace with actual react-router-dom

const TEMPLATE_TYPES = [
  "Bottom Bar Design",
  "Wedding Card Design",
  "Birthday Wish Design",
  "Business Card Design",
];

export default function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const navigate = useNavigate();

  const imageRef = useRef(null);
  const cardImageRefs = useRef({});
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0,
  });

  const [cardImageSizes, setCardImageSizes] = useState({});

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch(
        "https://visitingcard-backend.onrender.com/templates/"
      );
      const data = await res.json();
      setTemplates(data);
      
      // Initialize all categories as expanded by default
      const initialExpanded = {};
      TEMPLATE_TYPES.forEach(type => {
        initialExpanded[type] = true;
      });
      setExpandedCategories(initialExpanded);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Group templates by their name/type
  const groupedTemplates = templates.reduce((groups, template) => {
    // Find which category this template belongs to
    const category = TEMPLATE_TYPES.find(type => 
      template.name.toLowerCase().includes(type.toLowerCase()) ||
      template.description?.toLowerCase().includes(type.toLowerCase())
    ) || "Other";
    
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(template);
    return groups;
  }, {});

  // Ensure all template types are present in the grouped object
  TEMPLATE_TYPES.forEach(type => {
    if (!groupedTemplates[type]) {
      groupedTemplates[type] = [];
    }
  });

  const closePreview = () => {
    setSelectedTemplate(null);
    setImageSize({
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
    });
  };

  const handleCardImageLoad = (templateId, e) => {
    const img = e.target;
    const rect = img.getBoundingClientRect();

    setCardImageSizes((prev) => ({
      ...prev,
      [templateId]: {
        width: rect.width,
        height: rect.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      },
    }));
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading templates...</p>
        </div>
      </div>
    );
  }

  const totalTemplates = templates.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Choose from {totalTemplates} professional templates across {TEMPLATE_TYPES.length} categories
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/create")}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Create New</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </header>

      {/* Template Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {TEMPLATE_TYPES.map((category) => {
          const categoryTemplates = groupedTemplates[category] || [];
          const isExpanded = expandedCategories[category];
          
          if (categoryTemplates.length === 0 && totalTemplates > 0) {
            return null; // Skip empty categories if there are templates
          }

          return (
            <div key={category} className="mb-12 last:mb-0">
              {/* Category Header */}
              <div 
                className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {categoryTemplates.length} template{categoryTemplates.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <div className="flex items-center space-x-2">
                      {categoryTemplates.slice(0, 3).map((template, idx) => (
                        <div 
                          key={template._id} 
                          className="relative w-12 h-8 rounded border border-gray-200 overflow-hidden"
                          style={{ transform: `translateX(-${idx * 8}px)` }}
                        >
                          <img 
                            src={template.imageUrl} 
                            alt={template.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {categoryTemplates.length > 3 && (
                        <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                          +{categoryTemplates.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Category Templates Grid - Collapsible */}
              {isExpanded && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTemplates.map((t) => {
                    const cardSize = cardImageSizes[t._id];

                    return (
                      <div
                        key={t._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer group"
                        onClick={() => setSelectedTemplate(t)}
                      >
                        {/* Fixed height container that centers content */}
                        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl overflow-hidden flex items-center justify-center p-4">
                          <div className="relative max-w-full max-h-full">
                            <img
                              ref={(el) => (cardImageRefs.current[t._id] = el)}
                              src={t.imageUrl}
                              alt={t.name}
                              onLoad={(e) => handleCardImageLoad(t._id, e)}
                              className="max-w-full max-h-full object-contain shadow-lg rounded group-hover:scale-105 transition-transform duration-300"
                              style={{ maxHeight: '240px' }}
                            />

                            {/* Overlay Placeholders */}
                            {cardSize && cardSize.width > 0 &&
                              t.placeholders?.map((p, i) => {
                                const scaleX = cardSize.width / cardSize.naturalWidth;
                                const scaleY = cardSize.height / cardSize.naturalHeight;

                                const x = p.x * scaleX;
                                const y = p.y * scaleY;
                                const fontSize = p.fontSize * scaleX;

                                return (
                                  <div
                                    key={i}
                                    style={{
                                      position: "absolute",
                                      left: x,
                                      top: y,
                                      fontSize,
                                      color: p.color || "#000",
                                      fontWeight: p.bold ? "700" : "400",
                                      fontStyle: p.italic ? "italic" : "normal",
                                      fontFamily: p.fontFamily || "inherit",
                                      letterSpacing: p.letterSpacing || 0,
                                      textShadow: p.textShadow
                                        ? "2px 2px 6px rgba(0,0,0,0.3)"
                                        : "none",
                                      textDecoration: p.underline ? "underline" : "none",
                                      transform: p.rotation ? `rotate(${p.rotation}deg)` : "none",
                                      opacity: p.opacity !== undefined ? p.opacity : 1,
                                      whiteSpace: "nowrap",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    {p.key}
                                  </div>
                                );
                              })}
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center rounded-t-xl">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center space-y-2">
                              <Eye className="w-10 h-10 text-white" />
                              <span className="text-white font-medium">View Details</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-5">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                            {t.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                              {t.placeholders?.length || 0} text fields
                            </p>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {t.description || "Template"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Show uncategorized templates if any */}
        {groupedTemplates.Other && groupedTemplates.Other.length > 0 && (
          <div className="mb-12 last:mb-0">
            <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900">Other Templates</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {groupedTemplates.Other.length} template{groupedTemplates.Other.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedTemplates.Other.map((t) => (
                <div
                  key={t._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => setSelectedTemplate(t)}
                >
                  {/* Card content same as above */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="max-w-full max-h-full object-contain shadow-lg rounded group-hover:scale-105 transition-transform duration-300"
                      style={{ maxHeight: '240px' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center rounded-t-xl">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center space-y-2">
                        <Eye className="w-10 h-10 text-white" />
                        <span className="text-white font-medium">View Details</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                      {t.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {t.placeholders?.length || 0} text fields
                      </p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {t.description || "Template"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalTemplates === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No templates yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first template to get started
            </p>
            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Template</span>
            </button>
          </div>
        )}
      </div>

      {/* Preview Modal - Keep the same as before */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedTemplate.name}
                </h2>
                {selectedTemplate.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedTemplate.description}
                  </p>
                )}
              </div>
              <button
                onClick={closePreview}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Preview Area - Scrollable */}
            <div className="flex-1 overflow-auto p-6">
              <div className="flex justify-center items-center min-h-full">
                <div className="relative inline-block">
                  <img
                    ref={imageRef}
                    src={selectedTemplate.imageUrl}
                    alt="preview"
                    onLoad={(e) => {
                      const img = e.target;
                      const rect = img.getBoundingClientRect();

                      setImageSize({
                        width: rect.width,
                        height: rect.height,
                        naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight,
                      });
                    }}
                    className="max-w-full h-auto rounded-lg shadow-xl"
                    style={{ maxHeight: 'calc(90vh - 300px)' }}
                  />

                  {/* Placeholders Overlay */}
                  {imageSize.width > 0 &&
                    selectedTemplate.placeholders?.map((p, i) => {
                      const scaleX = imageSize.width / imageSize.naturalWidth;
                      const scaleY = imageSize.height / imageSize.naturalHeight;

                      const x = p.x * scaleX;
                      const y = p.y * scaleY;
                      const fontSize = p.fontSize * scaleX;

                      return (
                        <div
                          key={i}
                          style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            fontSize,
                            color: p.color || "#000",
                            fontWeight: p.bold ? "700" : "400",
                            fontStyle: p.italic ? "italic" : "normal",
                            fontFamily: p.fontFamily || "inherit",
                            letterSpacing: p.letterSpacing || 0,
                            textShadow: p.textShadow
                              ? "2px 2px 6px rgba(0,0,0,0.3)"
                              : "none",
                            textDecoration: p.underline ? "underline" : "none",
                            transform: p.rotation ? `rotate(${p.rotation}deg)` : "none",
                            opacity: p.opacity !== undefined ? p.opacity : 1,
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                          }}
                        >
                          {p.key}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Template Info */}
              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Text Fields ({selectedTemplate.placeholders?.length || 0})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
                  {selectedTemplate.placeholders?.map((p, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">
                          Field {i + 1}
                        </span>
                        <div
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{ backgroundColor: p.color }}
                        />
                      </div>
                      <p
                        className="text-sm font-medium text-gray-900 truncate"
                        style={{ fontFamily: p.fontFamily || "inherit" }}
                      >
                        {p.key}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {p.fontFamily?.split(",")[0]?.replace(/'/g, "") || "Default"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions - Fixed at Bottom */}
            <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={() => navigate(`/edit-template/${selectedTemplate._id}`)}
                className="flex items-center space-x-2 px-6 py-2.5 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Template</span>
              </button>
              <button
                onClick={() => navigate(`/generate/${selectedTemplate._id}`)}
                className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Design</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}