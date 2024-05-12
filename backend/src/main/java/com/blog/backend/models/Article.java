package com.blog.backend.models;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // id_de_la_table_articles
    private Long idArticle;

    private String titre;

    @Lob
    private byte[] picture;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    private Date datePublication;

    @ManyToOne
    private Categorie categorie;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Auteur> auteurs;

}
