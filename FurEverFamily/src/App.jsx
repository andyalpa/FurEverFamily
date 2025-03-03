import Home from './frontend/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetAdoption from './frontend/pages/PetAdoption';
import Footer from './frontend/components/Footer/Footer';
import NavBar from './frontend/components/NavBar/NavBar';
import Blog from './frontend/pages/Blog';
import BlogDetails from './frontend/pages/BlogDetails';
import PetRecipes from './frontend/pages/PetRecipes';
import RecipeDetails from './frontend/pages/RecipeDetails';
import ProtectedRoute from './frontend/components/ProtectedRoute';
import Dashboard from './frontend/pages/Dashboard';
import { ThemeProvider, useTheme } from './frontend/features/ThemeContext';
import SignUpPage from './frontend/pages/Signup/SignUpPage';
import SignInPage from './frontend/pages/Signin/SignInPage';
import './App.css';

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} text-gray-900 dark:text-gray-500`}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<PetAdoption />} />
          <Route path="/recipes" element={<PetRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          
          <Route path="/signinpage" element={<SignInPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
