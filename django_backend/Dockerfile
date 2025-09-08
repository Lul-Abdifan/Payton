FROM python:3.11-slim

# Install system dependencies required by Pillow and psycopg
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install dependencies
COPY requirements/base.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project into the container
COPY . /app

# Default command: run the ASGI server. Override in compose for worker/beat.
CMD ["uvicorn", "django_backend.config.asgi:application", "--host", "0.0.0.0", "--port", "8000"]


