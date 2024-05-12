package com.blog.backend.services;

import com.blog.backend.models.Categorie;
import com.blog.backend.repositories.CategorieRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategorieService {

    private final CategorieRepository categorieRepository;


    public CategorieService(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    public List<Categorie> findAllCategories() {
        return categorieRepository.findAll();
    }
}
