package com.blog.backend.services;

import com.blog.backend.models.Article;
import com.blog.backend.models.Commentaire;
import com.blog.backend.repositories.ArticleRepository;
import com.blog.backend.repositories.CommentaireRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentaireService {

    private final ArticleRepository articleRepository;
    private final CommentaireRepository commentaireRepository;

    public CommentaireService(CommentaireRepository commentaireRepository, ArticleRepository articleRepository) {
        this.commentaireRepository = commentaireRepository;
        this.articleRepository = articleRepository;
    }

    public List<Commentaire> findCommentsByArticle(Long articleId) {
        Optional<Article> article = articleRepository.findByIdArticle(articleId);
        return commentaireRepository.findByArticle(article);
    }

    public Commentaire saveComment(Commentaire commentaire) {

        return commentaireRepository.save(commentaire);
    }
}
