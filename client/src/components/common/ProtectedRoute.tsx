import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error('Please login to access this page');
    } else if (!loading && adminOnly && user?.role !== 'admin') {
      toast.error('Access denied. Admin only area.');
    }
  }, [loading, isAuthenticated, adminOnly, user]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if user is not admin but trying to access admin routes
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
