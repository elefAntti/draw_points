# Sending points from Python to Javascript for drawing

This code was largely written by ChatGPT. It forgot to add gl_PointSize and didn't scale the coordinates correctly. On the backend side it used app.get instead of app.websocket, forgot to add `import asyncio``and instead imported a bunch of unneccessary stuff that has been left in the code, but commented out. 

Otherwise it produced a functional program on the first try.
Prompt 1 "Can you write me a JavaScript program that receives list of 2D points over websocket and draws it using WebGL"
Prompt 2 "I saved the file as draw_points.js, can you generate the HTML page to host it?"
Prompt 3 "Could you give me a matching Python backend for it? Maybe using fastapi and sending points in the shape of a heart to the front end?"

I wrote the dockerfile and shellscript by hand. 
