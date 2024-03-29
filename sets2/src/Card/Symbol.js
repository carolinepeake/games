import React, {useState, useEffect} from 'react';

type SymbolProps = {
  shading: string;
  shape: string;
  color: string;
};

export const Symbol = ({ color, shading, shape }: SymbolProps) => {

  const [path, setPath] = useState('');

  const getSVGPath = (shape) => {
    switch(shape) {
      case 'diamond' :
        return "M1,34 24,-5 47,34 24,73z";
      case 'squiggle' :
        return "M31,1 c-0.5,0.3 -2.7,2.5 -5,5 -4.7,5.4 -7.8,12 -11.6,17.8 C7.3,33 3.47,41.8 2.47,49 c-0.16,1.5 -0.22,2.16 -0.22,3.72 0,1.5 -0.05,2.16 -0.22,3.38 C1.76,61.5 3.7,65.7 10,68.3 15.58,70.94 22.9,71.7 29.8,71.16 c2.83 -0.5 5.38 -1.27 7.72 -2.38 1.44 -0.67 2.83 -1.55 3.94 -2.44 0.55 -0.44 1.77 -1.6 2.27 -2.22 3.44 -4 4.22 -9.5 2.16 -15.66 -1 -3 -2.6 -6.2 -8 -15.88 -0.83 -1.5 -1.88 -3.44 -2.33 -4.22 -4.38 -8 -6.38 -12.94 -7 -17.6 -0.11 -0.94 -0.11 -3.22 0 -4 0.27 -1.94 0.83 -3.44 1.77 -5 0.44 -0.72 0.44 -0.77 0.16 -0.61z";
      case 'oval' :
        return "M1,17 C1,-16 47,-16 47,17 V51 C47,84 1,84 1,51z";
      default :
        console.log('error finding shape path data. the shape is: ', shape);
        return;
    }
  };

  useEffect(() => {
    let SVGpath = getSVGPath(shape);
    setPath(SVGpath);
  }, [shape])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 48 68"
      // default
      x="0"
      y="0"
      width="80%"
      height="100%"
      stroke={color}
      strokeWidth={2}
    >

       <defs>
        <pattern
          id="pattern-banded"
          width="8"
          height="8"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            stroke="white"
            strokeWidth={6}
            x1="0"
            y1="0"
            x2="8"
            y2="0"
          />
        </pattern>
        <mask
          id="mask-banded"
        >
          <rect
            x="-10"
            y="-14"
            width="60"
            height="100"
            fill="url(#pattern-banded)"
            maskContentUnits="objectBoundingBox"
          />
        </mask>
      </defs>

      <path
        d={path}
        fill={ shading === 'open' ? 'none' : `${color}`}
        mask={ shading === 'banded' ? 'url(#mask-banded)' : ''}
        paintOrder="fill"
      />
      <path
        d={path}
        fill="none"
      />

    </svg>
  );
};
