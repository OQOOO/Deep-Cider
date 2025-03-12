FROM openjdk:21-jdk-slim

WORKDIR /app

COPY build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

# docker run -d -p 37777:37777 --name cider-coreserver cider-coreserver