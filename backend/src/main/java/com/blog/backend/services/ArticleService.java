package com.blog.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blog.backend.models.Article;
import com.blog.backend.models.Auteur;
import com.blog.backend.repositories.ArticleRepository;
import com.blog.backend.repositories.AuteurRepository;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final AuteurRepository auteurRepository;

    public ArticleService(ArticleRepository articleRepository, AuteurRepository auteurRepository) {
        this.articleRepository = articleRepository;
        this.auteurRepository = auteurRepository;
    }

    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    public Article addAuteurs(Long id, Long idAuteur) {
        Article article = articleRepository.findById(id).orElse(null);
        Auteur auteur = auteurRepository.findById(idAuteur).orElse(null);
        article.getAuteurs().add(auteur);
        return articleRepository.save(article);
    }

    public void deleteArticle(Long id, String username, boolean isAdmin) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article != null && article.getAuteurs() != null) {
            for (Auteur auteur : article.getAuteurs()) {
                if ((auteur != null && auteur.getUsername().equals(username)) || isAdmin) {
                    articleRepository.deleteById(id);
                }
            }
        }
    }

    public Article updateArticle(Long id, Article articleDetails, String username, boolean isAdmin) {
        Article article = articleRepository.findById(id).orElse(null);
        if (article != null && article.getAuteurs() != null) {
            for (Auteur auteur : article.getAuteurs()) {
                if ((auteur != null && auteur.getUsername().equals(username)) || isAdmin) {
                    article.setTitre(articleDetails.getTitre());
                    article.setContenu(articleDetails.getContenu());
                    return articleRepository.save(article); // Save the updated article
                }
            }
        }
        return null;
    }

    public Optional<Article> findArticleById(Long id) {
        Optional<Article> article = articleRepository.findById(id);
        return article;
    }

    public List<Article> findAllArticles() {
        return articleRepository.findAll();
    }

}
