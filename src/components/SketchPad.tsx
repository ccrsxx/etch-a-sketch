import { useState } from 'react';

interface SketchPadProps {
  size: number;
  pads: boolean[];
  padSize: { gridTemplateColumns: string; gridTemplateRows: string };
  handleDraw: (i: number) => (e: any) => void;
}

interface CellPadProps {
  cellStatus: boolean;
  flip: (e: any) => void;
}

function CellPad({ cellStatus, flip }: CellPadProps) {
  return (
    <div
      className='cell-pad'
      style={cellStatus ? { backgroundColor: 'black' } : undefined}
      onClick={flip}
    />
  );
}

export function SketchPad({ size, pads, padSize, handleDraw }: SketchPadProps) {
  return (
    <div className='sketchpad' style={padSize}>
      {[...Array(size ** 2)].map((_, i) => (
        <CellPad key={i} cellStatus={pads[i]} flip={handleDraw(i)} />
      ))}
    </div>
  );
}
