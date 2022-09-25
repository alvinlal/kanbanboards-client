import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './components/Layouts/BaseLayout';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<BaseLayout />}>
          <Route path="/board" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
