import Home from './frontend/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetAdoption from './frontend/pages/PetAdoption';
// import PetRecipes from './frontend/pages/PetRecipes';
// import AboutUs from './frontend/pages/AboutUs';
// import Contact from './frontend/pages/Contact';
// import Blog from './frontend/pages/Blog';
// import Dashboard from './frontend/pages/Dashboard';
import Login from './frontend/pages/Login';
import Signup from './frontend/pages/Signup';
import Footer from './frontend/components/Footer/Footer';
import Blog from './frontend/pages/Blog';
import BlogDetails from './frontend/pages/BlogDetails';
import PetRecipes from './frontend/pages/PetRecipes';
import RecipeDetails from './frontend/pages/RecipeDetails';
import ProtectedRoute from './frontend/components/ProtectedRoute';
import Dashboard from './frontend/pages/Dashboard';
import { useTheme } from './frontend/features/ThemeContext';
import './App.css';

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} text-gray-900 dark:text-gray-500`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<PetAdoption />} />
          <Route path="/recipes" element={<PetRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          {/* <Route path="/recipes" element={<PetRecipes />} /> */}
          {/* <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
