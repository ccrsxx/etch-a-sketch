interface ControlProps {
  color: string;
  size: number;
  mode: string;
  isBordered: boolean;
  toggleClear: () => void;
  toggleBorder: () => void;
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
  isBordered,
  toggleBorder,
  toggleClear,
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
      <button type='button' onClick={toggleClear}>
        Clear
      </button>
      <div className='switch-holder'>
        <div className='switch-label'>
          <span>Border</span>
        </div>
        <div className='switch-toggle'>
          <input
            type='checkbox'
            id='bluetooth'
            defaultChecked={isBordered}
            onClick={toggleBorder}
          />
          <label htmlFor='bluetooth' />
        </div>
      </div>
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
