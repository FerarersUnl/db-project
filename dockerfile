# Use an official PostgreSQL runtime as a parent image
FROM postgres:latest

# Set the environment variables for PostgreSQL
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB app

# Copy the SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/