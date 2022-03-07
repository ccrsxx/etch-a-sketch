// import { memo } from 'react';

interface SketchPadProps {
  size: number;
  padSize: { gridTemplateColumns: string; gridTemplateRows: string };
  sketchKey: number;
  handleDraw: (click?: boolean) => (e?: React.MouseEvent) => void;
}

export function SketchPad({
  size,
  padSize,
  sketchKey,
  handleDraw
}: SketchPadProps) {
  console.log(sketchKey);
  return (
    <div className='sketchpad' style={padSize} key={sketchKey}>
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

// export const MemoizedSketchPad = memo(SketchPad, (prevProps, nextProps) => {
//   const same =
//     prevProps.size === nextProps.size &&
//     prevProps.isClear === nextProps.isClear;
//   return same;
// });
