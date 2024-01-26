# Use the official Docker Hub Postgres image
FROM postgres:latest

# Set environment variables
ENV POSTGRES_USER momo
ENV POSTGRES_PASSWORD momostock
ENV POSTGRES_DB momostock

# Copy the init-db script into the Docker image
COPY init-db.sh /docker-entrypoint-initdb.d/

# Make the script executable
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh