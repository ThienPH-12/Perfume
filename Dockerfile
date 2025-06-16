FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM maven:3.8.5-openjdk-17-slim
COPY --from=build /target/Perfume-0.0.1-SNAPSHOT.jar Perfume.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","Perfume.jar"]
