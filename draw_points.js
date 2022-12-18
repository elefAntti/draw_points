const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

// Set up WebSocket connection
const ws = new WebSocket("ws://localhost:8080");
ws.onmessage = function(event) {
  const points = JSON.parse(event.data);
  drawPoints(points);
};

// Set up vertex buffer for drawing points
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// Set up vertex shader
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position/40.0 + 0.5, 0, 1);
    gl_PointSize = 10.0;
  }
`;
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

// Set up fragment shader
const fragmentShaderSource = `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }
`;
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Create and link program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// Look up attribute location
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

// Set up viewport
gl.viewport(0, 0, canvas.width, canvas.height);

// Set up clear color
gl.clearColor(0, 0, 0, 0);

// Draw points
function drawPoints(points) {
  // Clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Bind vertex buffer and set attribute data
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // Draw points
  gl.drawArrays(gl.POINTS, 0, points.length / 2);
}
