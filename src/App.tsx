import { BrowserRouter, Route, Routes } from 'react-router';
import { Home, NotFound, RootErrorBoundary } from './page';
import Play from '@/page/Play/Play';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<RootErrorBoundary />} />
        <Route path="/play" element={<Play />} errorElement={<RootErrorBoundary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
