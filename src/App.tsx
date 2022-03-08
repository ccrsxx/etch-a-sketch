import { useState, useRef, useEffect } from 'react';
import { Header, Controls, SketchPad, Footer } from './components';

export default function App() {
  const [color, setColor] = useState('#333333');
  const [size, setSize] = useState(16);
  const [mode, setMode] = useState('color');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const sketchKey = useRef(Date.now());

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isClear) {
      setIsClear(false);
      sketchKey.current = Date.now();
    }
  }, [size, isClear]);

  useEffect(() => {
    document.documentElement.style.setProperty('--slider-thumb', color);
  }, [color]);

  const handleSlider = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    clear();
    setSize(+value);
  };

  const handleColor = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(value);
  };

  const handleMode = (newMode: string) => () =>
    mode !== newMode ? setMode(newMode) : undefined;

  const handleDraw =
    (click = false) =>
    (e: React.MouseEvent) => {
      if (!isMouseDown && !click) return;

      const cell = e.target as HTMLDivElement;

      switch (mode) {
        case 'color':
          cell.style.backgroundColor = color;
          break;
        case 'rainbow':
          cell.style.backgroundColor = `#${(
            ((1 << 24) * Math.random()) |
            0
          ).toString(16)}`;
          break;
        default:
          cell.style.backgroundColor = '#fafafa';
          break;
      }
    };

  const clear = () => setIsClear(true);

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
          clear={clear}
          handleMode={handleMode}
          handleSlider={handleSlider}
          handleColor={handleColor}
        />
        <SketchPad
          size={size}
          padSize={padSize}
          sketchKey={sketchKey.current}
          handleDraw={handleDraw}
        />
      </main>
      <Footer />
    </div>
  );
}
