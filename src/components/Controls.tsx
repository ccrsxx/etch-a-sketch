interface ControlProps {
  color: string;
  size: number;
  mode: string;
  clear: () => void;
  handleMode: (mode: string) => () => void;
  handleSlider: ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => void;
  handleColor: ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Controls({
  color,
  size,
  mode,
  clear,
  handleMode,
  handleSlider,
  handleColor
}: ControlProps) {
  return (
    <div className='controls'>
      <input
        className='color-picker'
        type='color'
        value={color}
        onChange={handleColor}
      />
      <button
        style={mode === 'color' ? { backgroundColor: color } : undefined}
        className={mode === 'color' ? 'active' : undefined}
        type='button'
        onClick={handleMode('color')}
      >
        Color
      </button>
      <button
        className={mode === 'rainbow' ? 'active' : undefined}
        type='button'
        onClick={handleMode('rainbow')}
      >
        Rainbow
      </button>
      <button
        className={mode === 'eraser' ? 'active' : undefined}
        type='button'
        onClick={handleMode('eraser')}
      >
        Eraser
      </button>
      <button type='button' onClick={clear}>
        Clear
      </button>
      <label htmlFor='size-slider'>{`${size} x ${size}`}</label>
      <input
        id='size-slider'
        className='size-slider'
        type='range'
        value={size}
        min={1}
        max={64}
        onChange={handleSlider}
      />
    </div>
  );
}
