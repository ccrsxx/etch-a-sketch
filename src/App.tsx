import { useState, useRef, useEffect } from 'react';
import { Header, Controls, SketchPad, Footer } from './components';

export default function App() {
  const [color, setColor] = useState('#333333');
  const [size, setSize] = useState(16);
  const [mode, setMode] = useState('color');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isBordered, setIsBordered] = useState(true);
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
    const border = isBordered ? '1px solid lightgray' : 'none';
    document.documentElement.style.setProperty('--border', border);
  }, [isBordered]);

  useEffect(() => {
    document.documentElement.style.setProperty('--slider-thumb', color);
  }, [color]);

  const handleSlider = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    toggleClear();
    setSize(+value);
  };

  const handleColor = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(value);
  };

  const handleMode = (newMode: string) => () =>
    mode !== newMode ? setMode(newMode) : undefined;

  const handleDraw = (click?: boolean) => (e: React.MouseEvent) => {
    if (!isMouseDown && !click) return;

    const cell = e.target as HTMLDivElement;

    if (mode === 'color') {
      cell.style.backgroundColor = color;
    } else if (mode === 'rainbow') {
      cell.style.backgroundColor = `#${(
        ((1 << 24) * Math.random()) |
        0
      ).toString(16)}`;
    } else if (mode === 'eraser') {
      cell.style.backgroundColor = '#fafafa';
    }
  };

  const toggleClear = () => setIsClear(true);

  const toggleBorder = () => {
    setIsBordered(!isBordered);
  };

  return (
    <div className='App'>
      <Header />
      <main>
        <Controls
          color={color}
          size={size}
          mode={mode}
          isBordered={isBordered}
          toggleClear={toggleClear}
          toggleBorder={toggleBorder}
          handleMode={handleMode}
          handleSlider={handleSlider}
          handleColor={handleColor}
        />
        <SketchPad
          size={size}
          sketchKey={sketchKey.current}
          handleDraw={handleDraw}
        />
      </main>
      <Footer />
    </div>
  );
}
