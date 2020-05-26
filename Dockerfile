FROM python:3.8-slim

COPY ./app/requirements.txt ./requirements.txt

RUN ["pip", "install", "-r", "requirements.txt"]

COPY ./app /app

WORKDIR /app

CMD gunicorn -w 4 --bind 0.0.0.0:$PORT
