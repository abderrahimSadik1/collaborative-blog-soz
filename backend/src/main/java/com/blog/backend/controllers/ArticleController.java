package com.blog.backend.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import com.blog.backend.models.Article;
import com.blog.backend.models.Auteur;
import com.blog.backend.services.ArticleService;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/add/{id}/{idUtilisateur}")
    public ResponseEntity<Article> addAuteur(@PathVariable Long id, @PathVariable Long idUtilisateur) {
        Article article = articleService.addAuteurs(id, idUtilisateur);
        return ResponseEntity.ok(article);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable Long id, Authentication authentication) {
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .anyMatch("ADMIN"::equals);
            articleService.deleteArticle(id, authentication.getName(), isAdmin);
            return ResponseEntity.ok("Article deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete article.");
        }
    }

    @PostMapping("/new")
    public ResponseEntity<?> createArticle(@RequestBody Article article, Authentication authentication) {
        // Get authenticated user
        Auteur authenticatedAuteur = (Auteur) authentication.getPrincipal();
        article.getAuteurs().add(authenticatedAuteur);
        article.setDatePublication(new java.sql.Date(new Date().getTime()));
        Article createdArticle = articleService.saveArticle(article);

        return ResponseEntity.ok(createdArticle);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllArticles(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch("ADMIN"::equals);
        if (isAdmin) {
            List<Article> articles = articleService.findAllArticles();
            if (articles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return ResponseEntity.ok(articles);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article articleDetails,
            Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch("ADMIN"::equals);
        Article updatedArticle = articleService.updateArticle(id, articleDetails, authentication.getName(), isAdmin);
        return ResponseEntity.ok(updatedArticle);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Optional<Article> article = articleService.findArticleById(id);
        if (article.isPresent()) {
            return ResponseEntity.ok(article.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
