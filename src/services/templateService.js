// export const saveTemplate = async (payload) => {
//   try {
//     const formData = new FormData();

//     formData.append("name", payload.name);
//     formData.append("description", payload.description);
//     formData.append("image", payload.imageFile);

//     // placeholders must be STRING
//     formData.append(
//       "placeholders",
//       JSON.stringify(payload.placeholders)
//     );

//     const response = await fetch(
//       "https://visitingcard-backend.onrender.com/templates/",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(error);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Save template failed:", error);
//     throw error;
//   }
// };













// src/services/templateService.js

/**
 * Save a new visiting card template to the backend
 */
export const saveTemplate = async (payload) => {
  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("image", payload.imageFile);
    formData.append("placeholders", JSON.stringify(payload.placeholders));

    // 🔥 Fix: remove extra spaces in URL!
    const response = await fetch("https://visitingcard-backend.onrender.com/templates", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Save template failed:", error);
    throw error;
  }
};

/**
 * Fetch all saved templates from the backend
 */
export const getTemplates = async () => {
  try {
    // 🔥 Same clean URL
    const response = await fetch("https://visitingcard-backend.onrender.com/templates", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch templates: HTTP ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch templates failed:", error);
    throw error;
  }
};