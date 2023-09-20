import CanvasShoe  from './canvas/shoeCanvas';
import CanvasTshirt  from './canvas/TshirtCanvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import { useSnapshot } from 'valtio';
import state from './store';



const App = () => {
  const snap = useSnapshot(state);
  return (
    <main className='app transition-all ease-in'>
      <Home />
      {snap.product ? <CanvasTshirt /> : <CanvasShoe />}
      <Customizer />
    </main>
  );
}

export default App;
