import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import BaseLayout from './components/Layouts/BaseLayout';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import Redirect from './pages/Auth/Google/Redirect';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/google/redirect" element={<Redirect />} />
          <Route element={<BaseLayout />}>
            <Route path="/board" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
