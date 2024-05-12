[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/ukcTjO0P)

# SOZ

Blog Collaboratif 

## Description

SOZ est une plateforme en ligne où plusieurs auteurs peuvent contribuer en publiant
des articles ou des posts. Il offre la possibilité aux utilisateurs de partager 
leurs connaissances, leurs expériences et leurs opinions avec une communauté
plus large. Les fonctionnalités incluent la publication d'articles, la
collaboration entre auteurs et la catégorisation des contenus pour une meilleure organisation.

## Fonctionnalités

-	Lire des articles: Ce cas d'utilisation permet à l'utilisateur de lire des articles sur l'application Web.
-	Publier des articles: Ce cas d'utilisation permet à l'utilisateur de publier des articles sur l'application Web.
-	Écrire un commentaire: Ce cas d'utilisation permet à l'utilisateur d'écrire un commentaire sur un article.
-	Gérer une collaboration: Ce cas d'utilisation permet à l'utilisateur de gérer une collaboration sur un article.
-	Gérer les utilisateurs: Ce cas d'utilisation permet à l'administrateur de gérer les utilisateurs de l'application Web.
-	Gérer les articles: Ce cas d'utilisation permet à l'administrateur de gérer les articles de l'application Web.
-	S'authentifier: Ce cas d'utilisation permet à l'utilisateur de s'authentifier sur l'application Web.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- JDK 17 (Java Development Kit)
- Node.js et npm n (Node Package Manager) "version 20"
- MySQL

## Configuration

1. **Cloner ce dépôt sur votre machine locale:**

    git clone https://github.com/your-user/your-project.git
    cd your-project

2. **Backend (Spring Boot):**

    - Accéder au répertoire backend:
        cd backend

    - Installer l'extension Java Pack dans Visual Studio Code pour un meilleur support du développement Java: [Java Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
    - Installer le pack d'extension Spring Boot dans Visual Studio Code pour un support supplémentaire de Spring Boot: [Spring Boot Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.springboot-pack)

    - Configurer la base de données MySQL dans le fichier `application.properties` :

        - spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
        - spring.datasource.username=your_username
        - spring.datasource.password=your_password

        Assurez-vous de remplacer ces valeurs par votre configuration MySQL.

    - Lancer l'application Spring Boot:
      
        ./mvnw spring-boot:run

3. **Frontend (Vite avec React):**

    - Accéder au répertoire frontend:

        cd frontend

    - Installer les dépendances npm:

        npm install

    - Démarrer l'application frontend en mode développement:

        npm run dev

## Contribution

Pour contribuer à ce projet, suivez ces étapes :

1. Fork du projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request
