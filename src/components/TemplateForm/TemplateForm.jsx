import { useState } from "react";

export default function TemplateForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
    imageFile: null, // ✅ ADD THIS
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0] // ✅ FILE OBJECT
          : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Template name is required");
      return;
    }

    if (!form.imageFile) {
      alert("Background image is required");
      return;
    }

    onSubmit(form); // ✅ imageFile INCLUDED
  };

  return (
    <div style={{ width: 260 }}>
      <h3>Template Details</h3>

      <label>Template Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <label>Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      {/* ✅ IMAGE INPUT */}
      <label>Background Image</label>
      <input
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Active
      </label>

      <button onClick={handleSubmit}>Save Template</button>
    </div>
  );
}
