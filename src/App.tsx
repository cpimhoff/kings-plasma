import { BrowserRouter, Route, Routes } from 'react-router';
import { Home, NotFound, RootErrorBoundary } from './page';
import Game from '@/page/Game/Game';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
          errorElement={<RootErrorBoundary />}
        />
        <Route
          path="/play"
          element={<Game />}
          errorElement={<RootErrorBoundary />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
