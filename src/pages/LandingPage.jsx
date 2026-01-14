// import { Sparkles, ArrowRight, Zap } from "lucide-react";

// export default function LandingPage({ onNavigate }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
//       <div className="text-center space-y-6 px-4">
//         <div className="flex justify-center">
//           <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-xl flex items-center justify-center">
//             <Sparkles className="text-white w-7 h-7" />
//           </div>
//         </div>

//         <h1 className="text-5xl font-bold text-white">
//           CardCraft <span className="text-pink-300">Pro</span>
//         </h1>

//         <p className="text-gray-300 max-w-xl mx-auto">
//           Design professional visiting card templates with placeholders,
//           logos, and backgrounds.
//         </p>

//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={() => onNavigate("create")}
//             className="px-6 py-3 bg-pink-500 text-white rounded-lg flex items-center gap-2 hover:scale-105 transition"
//           >
//             <Zap className="w-4 h-4" />
//             Create Template
//             <ArrowRight className="w-4 h-4" />
//           </button>

//           <button
//             onClick={() => onNavigate("list")}
//             className="px-6 py-3 bg-white/10 text-white rounded-lg"
//           >
//             View Templates
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useState } from 'react';
import { Sparkles, Layout, Heart, Briefcase, Users, Zap } from 'lucide-react';

export default function DesignLandingPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = (path) => {
    window.location.href = path;
  };

  const templates = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Business Cards",
      description: "Professional business card templates for every industry"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wedding Cards",
      description: "Beautiful invitation designs for your special day"
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "More Coming Soon",
      description: "New template categories added regularly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DesignHub</span>
            </div>
            
            <nav className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/create')}
                className="px-6 py-2.5 text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Start Design
              </button>
              <button 
                onClick={() => navigate('/templates')}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                My Designs
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Create Stunning Designs
            <span className="block text-blue-600 mt-2">In Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Professional templates for business cards, wedding invitations, and more. 
            Design like a pro without any design experience.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => navigate('/create')}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Designing Now
            </button>
            <button 
              onClick={() => navigate('/templates')}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-md border border-gray-200"
            >
              View Templates
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Template Categories</h2>
          <p className="text-lg text-gray-600">Choose from our growing collection of professional templates</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`mb-4 text-blue-600 transition-transform ${hoveredCard === index ? 'scale-110' : ''}`}>
                {template.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{template.title}</h3>
              <p className="text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DesignHub?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Easy</h3>
              <p className="text-gray-600">Create professional designs in minutes with our intuitive editor</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Layout className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Templates</h3>
              <p className="text-gray-600">Expertly designed templates ready to customize for your needs</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Your Work</h3>
              <p className="text-gray-600">Access your designs anytime, anywhere with cloud storage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center shadow-xl">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of users creating stunning designs</p>
          <button 
            onClick={() => navigate('/create')}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg transform hover:scale-105"
          >
            Start Designing Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">DesignHub</span>
              </div>
              <p className="text-sm">Professional design templates made simple</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Templates</h4>
              <ul className="space-y-2 text-sm">
                <li>Business Cards</li>
                <li>Wedding Cards</li>
                <li>Coming Soon</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Tutorials</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2026 DesignHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}