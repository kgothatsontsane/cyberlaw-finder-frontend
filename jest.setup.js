import '@testing-library/jest-dom';

// Mock canvas for JSDOM test environment
HTMLCanvasElement.prototype.getContext = () => null;

// Provide a very basic canvas context mock
const mockCtx = {
  clearRect: () => {},
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  stroke: () => {},
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
};

HTMLCanvasElement.prototype.getContext = function () {
  return mockCtx;
};
