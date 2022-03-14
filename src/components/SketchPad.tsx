interface SketchPadProps {
  size: number;
  sketchKey: number;
  handleDraw: (click?: boolean) => (e: React.MouseEvent) => void;
}

export function SketchPad({ size, sketchKey, handleDraw }: SketchPadProps) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`
      }}
      className='sketchpad'
      key={sketchKey}
    >
      {[...Array(size ** 2)].map((_, i) => (
        <div
          className='cell-pad'
          onClick={handleDraw(true)}
          onMouseOver={handleDraw(false)}
          key={i}
        />
      ))}
    </div>
  );
}
