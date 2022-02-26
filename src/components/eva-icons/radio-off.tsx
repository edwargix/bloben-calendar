import React from 'react';

const RadioOff = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`bi bi-circle-fill ${props.className}`}
    fill={props.fill ? props.fill : 'currentColor'}
  >
    <g data-name="Layer 2">
      <g data-name="radio-button-off">
        <rect width="24" height="24" opacity="0" />
        <path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm0-18a8 8 0 1 0 8 8 8 8 0 0 0-8-8z" />
      </g>
    </g>
  </svg>
);

export default RadioOff;
