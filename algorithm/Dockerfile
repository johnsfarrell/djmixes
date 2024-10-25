FROM python:3.11.4-slim

RUN apt-get update && apt-get install -y \
    libsndfile1 \
    libgomp1 \
    git \ 
    ffmpeg 

WORKDIR /app

COPY . /app

RUN mkdir -p /tmp /var/tmp /usr/tmp /app
RUN chmod 777 /tmp /var/tmp /usr/tmp /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

ENV FLASK_APP=api.py
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["flask", "run"]
