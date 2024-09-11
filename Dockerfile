# Use a imagem base do Maven para construir o aplicativo
#FROM maven:3.8.5-openjdk-17 AS build
#
## Set the working directory
#WORKDIR /app
#
## Copy the pom.xml and other Maven files
#COPY pom.xml .
#COPY src ./src
#
## Build the application and skip tests
#RUN mvn clean install -DskipTests
#
## Use the same image to run the application
FROM maven:3.8.5-openjdk-17

# Set the working directory
WORKDIR /app

# Copy the pom.xml and source code from the build stage
COPY pom.xml .

# Download dependencies (cache them in the image layer)
RUN mvn dependency:go-offline -B

COPY src ./src

# Expose port 8080
EXPOSE 8080

# Command to run the application in development mode
CMD ["mvn", "spring-boot:run"]