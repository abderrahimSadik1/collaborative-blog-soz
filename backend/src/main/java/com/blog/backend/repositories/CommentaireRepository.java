package com.blog.backend.repositories;

import com.blog.backend.models.Article;
import com.blog.backend.models.Commentaire;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
    List<Commentaire> findByArticle(Optional<Article> article);
}
