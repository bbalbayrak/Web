import React, { useState } from 'react';
import './Chart.css';

const Line = ({ x1, y1, x2, y2, color }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
);

const Circle = ({ cx, cy, r, fill, onMouseEnter, onMouseLeave }) => (
  <circle cx={cx} cy={cy} r={r} fill={fill} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
);

const Chart = () => {
  const data = [
    { name: 'Pazartesi', iş: 150, iptalEdilenİş: 50 },
    { name: 'Salı', iş: 200, iptalEdilenİş: 50 },
    { name: 'Çarşamba', iş: 100, iptalEdilenİş: 50 },
    { name: 'Perşembe', iş: 250, iptalEdilenİş: 50 },
    { name: 'Cuma', iş: 175, iptalEdilenİş: 50 },
    { name: 'Cumartesi', iş: 50, iptalEdilenİş: 50 },
    { name: 'Pazar', iş: 75, iptalEdilenİş: 50 },
  ];

  const [hoverData, setHoverData] = useState(null);

  const width = 600;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const maxValue = Math.max(...data.map(d => Math.max(d.iş, d.iptalEdilenİş)));
  const scaleY = value => (chartHeight * (1 - value / maxValue)) + margin.top;
  const scaleX = (value, length) => (chartWidth * (value / length)) + margin.left;

  return (
    <div className="chart" style={{ position: 'relative' }}>
      <svg width={width} height={height}>
        {data.map((d, i) => {
          const x1 = scaleX(i, data.length);
          const x2 = scaleX(i + 1, data.length);
          const y1İş = scaleY(d.iş);
          const y1İptal = scaleY(d.iptalEdilenİş);

          if (i < data.length - 1) {
            const y2İş = scaleY(data[i + 1].iş);
            const y2İptal = scaleY(data[i + 1].iptalEdilenİş);

            return (
              <g key={i}>
                <Line x1={x1} y1={y1İş} x2={x2} y2={y2İş} color="blue" />
                <Line x1={x1} y1={y1İptal} x2={x2} y2={y2İptal} color="red" />
              </g>
            );
          }

          return null;
        })}

        {data.map((d, i) => {
          const x = scaleX(i, data.length);
          const yİş = scaleY(d.iş);
          const yİptal = scaleY(d.iptalEdilenİş);

          return (
            <g key={i}>
              <Circle
                cx={x}
                cy={yİş}
                r={4}
                fill="blue"
                onMouseEnter={() =>
                  setHoverData({ x, y: yİş, label: 'İş', value: d.iş })
                }
                onMouseLeave={() => setHoverData(null)}
              />
              <Circle
                cx={x}
                cy={yİptal}
                r={4}
                fill="red"
                onMouseEnter={() =>
                  setHoverData({
                    x,
                    y: yİptal,
                    label: 'İptal Edilen İş',
                    value: d.iptalEdilenİş,
                  })
                }
                onMouseLeave={() => setHoverData(null)}
              />
            </g>
          );
        })}

        {Array.from({ length: 5 }).map((_, i) => {
          const value = maxValue * (i + 1) / 5;
          const y = scaleY(value);
          return (
            <text key={i} x={margin.left - 15} y={y} textAnchor="end" dominantBaseline="central">
              {Math.round(value)}
            </text>
          );
        })}

        {data.map((d, i) => {
          const x = scaleX(i, data.length);
          return (
            <text key={i} x={x} y={height - margin.bottom + 20} textAnchor="middle" dominantBaseline="hanging">
              {d.name}
            </text>
          );
        })}
      </svg>

      {hoverData && (
        <div
          className="chart-tooltip"
          style={{
            left: hoverData.x + 10,
            top: hoverData.y - 25,
          }}
        >
          <div>{hoverData.label}</div>
          <div>Değer: {hoverData.value}</div>
        </div>
      )}
    </div>
  );
};

export default Chart;
