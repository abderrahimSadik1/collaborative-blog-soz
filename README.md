# SOZ

Collaborative Blog

## Description

SOZ is an online platform where multiple authors can contribute by publishing articles or posts. It allows users to share their knowledge, experiences, and opinions with a larger community. The platform offers features such as article publishing, author collaboration, and content categorization for better organization.

## Features

- **Read Articles**: Users can browse and read articles available on the web platform.
- **Publish Articles**: Authors can write and publish their own articles.
- **Write a Comment**: Users can leave comments on published articles.
- **Manage Collaboration**: Authors can collaborate with others on articles.
- **Manage Users**: Administrators can manage user accounts on the platform.
- **Manage Articles**: Administrators can manage and oversee all articles on the platform.
- **Authentication**: Users can authenticate themselves through the web application.

## Prerequisites

Ensure the following are installed on your machine:

- JDK 17 (Java Development Kit)
- Node.js and npm (Node Package Manager) version 20
- MySQL

## Setup Instructions

1. **Clone this repository to your local machine:**

    ```bash
    git clone https://github.com/your-user/your-project.git
    cd your-project
    ```

2. **Backend Setup (Spring Boot):**

    - Navigate to the backend directory:

        ```bash
        cd backend
        ```

    - Install the Java Pack extension for Visual Studio Code for better Java development support: [Java Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
    
    - Install the Spring Boot extension pack for enhanced support for Spring Boot: [Spring Boot Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.springboot-pack)

    - Configure the MySQL database in the `application.properties` file:

        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
        spring.datasource.username=your_username
        spring.datasource.password=your_password
        ```

        Ensure to replace these values with your actual MySQL setup.

    - Start the Spring Boot application:

        ```bash
        ./mvnw spring-boot:run
        ```

3. **Frontend Setup (Vite with React):**

    - Navigate to the frontend directory:

        ```bash
        cd frontend
        ```

    - Install npm dependencies:

        ```bash
        npm install
        ```

    - Run the frontend application in development mode:

        ```bash
        npm run dev
        ```

## Contribution

To contribute to this project, follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
