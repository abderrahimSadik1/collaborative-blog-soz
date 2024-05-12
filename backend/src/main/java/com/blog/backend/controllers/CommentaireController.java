package com.blog.backend.controllers;

import com.blog.backend.models.Auteur;
import com.blog.backend.models.Commentaire;
import com.blog.backend.services.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;


    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<Commentaire>> getCommentsByArticle(@PathVariable Long articleId) {
        return ResponseEntity.ok(commentaireService.findCommentsByArticle(articleId));
    }

    @PostMapping()
    public ResponseEntity<Commentaire> createComment(@RequestBody Commentaire commentaire, Authentication authentication) {
        commentaire.setAuteur((Auteur) authentication.getPrincipal());
        if (commentaire.getDate() == null) {
            commentaire.setDate(new java.sql.Date(new Date().getTime()));
        }
        return ResponseEntity.ok(commentaireService.saveComment(commentaire));
    }
}
