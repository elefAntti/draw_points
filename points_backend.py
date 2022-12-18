import json
import math
import asyncio

from fastapi import FastAPI
#from fastapi.responses import HTMLResponse
#from fastapi.staticfiles import StaticFiles
#from fastapi.templating import Jinja2Templates
from starlette.websockets import WebSocket

app = FastAPI()
#app.mount("/static", StaticFiles(directory="static"), name="static")
#templates = Jinja2Templates(directory="templates")

@app.websocket("/")
async def get_index(websocket: WebSocket):
    await websocket.accept()
    while True:
        points = []
        for t in range(0, 360, 10):
            x = 16 * math.sin(t)**3
            y = 13 * math.cos(t) - 5 * math.cos(2*t) - 2 * math.cos(3*t) - math.cos(4*t)
            points.append(x)
            points.append(y)
        await websocket.send_text(json.dumps(points))
        await asyncio.sleep(0.1)
