import { useState, useEffect } from 'react';
import { Header, Controls, SketchPad, Footer } from './components';

export default function App() {
  const [color, setColor] = useState('#333333');
  const [size, setSize] = useState(16);
  const [pads, setPads] = useState<boolean[]>([]);
  const [mode, setMode] = useState('color');
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    setPads(Array(size ** 2).fill(false));
  }, [size]);

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleSlider = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSize(+value);
  };

  const handleColor = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(value);
  };

  const handleMode = (newMode: string) => () =>
    mode !== newMode ? setMode(newMode) : undefined;

  const handleDraw = (i: number) => (e: any) => {
    console.log(e);
    // if (!isMouseDown) return;
    pads[i] = !pads[i];
    setPads([...pads]);
  };

  const padSize = {
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`
  };

  return (
    <div className='App'>
      <Header />
      <main>
        <Controls
          color={color}
          size={size}
          mode={mode}
          handleMode={handleMode}
          handleSlider={handleSlider}
          handleColor={handleColor}
        />
        <SketchPad
          size={size}
          pads={pads}
          padSize={padSize}
          handleDraw={handleDraw}
        />
      </main>
      <Footer />
    </div>
  );
}
