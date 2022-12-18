FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y \
    python3-pip
RUN pip install fastapi
RUN pip install websockets uvicorn
ENV TERM xterm-256color
COPY . .
#CMD ["bash", "-i"]
CMD ["uvicorn", "points_backend:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
