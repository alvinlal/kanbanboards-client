import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import BaseLayout from './components/Layouts/BaseLayout';
import Board from './pages/Board/Board';
import Home from './pages/Home/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import Redirect from './pages/Auth/Google/Redirect';
import LoginPage from './pages/Auth/Login/LoginPage';
import SignupPage from './pages/Auth/SignUp/SignupPage';
import IsAuthenticated from './guards/IsAuthenticated.guard';
import IsLoggedIn from './guards/IsLoggedIn.guard';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/google/redirect" element={<Redirect />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/board/:boardId"
              element={
                <IsAuthenticated>
                  <Board />
                </IsAuthenticated>
              }
            />
            <Route
              path="/login"
              element={
                <IsLoggedIn>
                  <LoginPage />
                </IsLoggedIn>
              }
            />
            <Route
              path="/signup"
              element={
                <IsLoggedIn>
                  <SignupPage />
                </IsLoggedIn>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
