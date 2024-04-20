import React, { useState, useEffect, useRef } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import * as d3 from 'd3';

const PriceChart = ({ dataHistory }) => {
  const [chartOptions, setChartOptions] = useState({
    data: dataHistory,
    series: [{ type: 'line', xKey: 'time', yKey: 'priceUsd' }],
  });

  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleLinear([0, dataHistory.length - 1], [40, 640 - 20]);
  const y = d3.scaleLinear(
    d3.extent(dataHistory.map(d => parseFloat(d.priceUsd))),
    [400 - 30, 20]
  );
  const line = d3.line().x((d, i) => x(i)).y(d => y(parseFloat(d.priceUsd)));

  useEffect(() => {
    setChartOptions(prevOptions => ({
      ...prevOptions,
      data: dataHistory,
    }));
  }, [dataHistory]);

  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg width={640} height={400}>
        <g ref={gx} transform={`translate(0,370)`} />
        <g ref={gy} transform={`translate(40,0)`} />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          d={line(dataHistory)}
        />
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          {dataHistory.map((d, i) => (
            <circle className='text-red-900' key={i} cx={x(i)} cy={y(parseFloat(d.priceUsd))} r="2.5" />
          ))}
        </g>
      </svg>
$    </div>
  );
};

export default PriceChart;
