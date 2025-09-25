import React from "react";
import "./bg_animation.css"; 

const CyberIntroHUD = () => {
  return (
    <div className="hud-container">
      <svg viewBox="0 0 800 400">
        {/* <defs>
          <pattern
            id="diagonalHatch"
            width="6"
            height="6"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              style={{ stroke: "#00eaff", strokeWidth: 2 }}
            />
          </pattern>
        </defs>

        <circle cx="150" cy="150" r="70" className="glow" />
        <circle cx="150" cy="150" r="50" className="hatch" />

        <circle className="orbit-dot" cx="150" cy="150" />

        <line x1="220" y1="150" x2="700" y2="150" className="glow draw" />
        <line x1="220" y1="140" x2="700" y2="140" className="glow draw" />
        <line x1="220" y1="160" x2="700" y2="160" className="glow draw" />

        <polygon
          points="220,170 260,170 250,185 210,185"
          fill="#00eaff"
          opacity="0.7"
        />
        <polygon
          points="265,170 305,170 295,185 255,185"
          fill="#00eaff"
          opacity="0.7"
        />

        <line x1="220" y1="190" x2="400" y2="190" className="glow" />
        <circle cx="405" cy="190" r="5" fill="#00eaff" />

        {[240, 260, 280, 300, 320, 340, 360, 380].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="185"
            x2={x}
            y2="195"
            stroke="#00eaff"
            strokeWidth="2"
          />
        ))} */}

        <text x="240" y="150" dominantBaseline="middle" className="flicker">
          HACKEATHIC138 ....
        </text>
      </svg>
    </div>
  );
};

export default CyberIntroHUD;
