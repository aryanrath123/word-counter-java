# Use an official JDK runtime as a parent image
FROM eclipse-temurin:17-jdk

# Set the working directory
WORKDIR /app

# Copy the jar file
COPY target/*.jar app.jar

# Run the jar file
CMD ["java", "-jar", "app.jar"]
