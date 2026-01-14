import { Routes, Route } from "react-router-dom";
import CreateTemplate from "./pages/CreateTemplate";
import TemplateList from "./pages/TemplateList";
import DesignLandingPage from "./pages/LandingPage";
import EditTemplate from "./pages/EditTemplate";

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<DesignLandingPage />} />
        <Route path="/templates" element={<TemplateList />} />
        <Route path="/create" element={<CreateTemplate />} />
        <Route path="/edit-template/:id" element={<EditTemplate />} />
      </Routes>
    </div>
  );
}