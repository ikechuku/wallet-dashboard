import React from 'react';

export default ({
  color = '#fff',
  fill = '#ff276a',
  width = '15',
  height = '15',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18 18"
  >
    <g
      id="Group_4833"
      data-name="Group 4833"
      transform="translate(-51.449 -28.938)"
    >
      <path
        id="Path_12218"
        data-name="Path 12218"
        d="M9,0A9,9,0,1,1,0,9,9,9,0,0,1,9,0Z"
        transform="translate(51.449 28.938)"
        fill={fill}
      />
      <path
        id="Path_12345"
        data-name="Path 12345"
        d="M420.372,300.218a.7.7,0,0,1-.99.01l-.01-.01-2.493-2.565a.73.73,0,0,1,0-1.025.7.7,0,0,1,.99-.01l.01.01,1.979,2.049,4.471-4.564a.7.7,0,0,1,.99-.01l.01.01a.73.73,0,0,1,0,1.025Z"
        transform="translate(-360.22 -258.965)"
        fill={color}
        fillRule="evenodd"
      />
    </g>
  </svg>
);
