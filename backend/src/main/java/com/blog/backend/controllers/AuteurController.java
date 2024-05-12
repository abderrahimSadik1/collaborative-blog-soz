package com.blog.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.backend.models.Auteur;
import com.blog.backend.services.AuteurService;
import com.dto.AuteurDTO;

import java.util.List;

@RestController
@RequestMapping("/auteurs")
public class AuteurController {

    @Autowired
    private AuteurService auteurService;

    @GetMapping("/{username}")
    public ResponseEntity<AuteurDTO> getAuteurByUsername(@PathVariable String username) {
        AuteurDTO auteurDTO = auteurService.getAuteurByUsername(username);
        return ResponseEntity.ok(auteurDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable Long id, Authentication authentication) {
        auteurService.deleteAuteur(id);
        return ResponseEntity.ok("Article deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Auteur> updateAuteur(@PathVariable Long id, @RequestBody Auteur updatedAuteur) {
        Auteur auteur = auteurService.updateAuteur(id, updatedAuteur);
        return ResponseEntity.ok(auteur);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Auteur>> getAuteur() {
        List<Auteur> auteur = auteurService.getAll();
        return ResponseEntity.ok(auteur);
    }

}