package com.blog.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.backend.models.Auteur;
import com.blog.backend.repositories.AuteurRepository;
import com.dto.AuteurDTO;

@Service
public class AuteurService {

    @Autowired
    private AuteurRepository auteurRepository;

    public AuteurDTO getAuteurById(Long id) {
        Optional<Auteur> auteurOptional = auteurRepository.findById(id);
        if (auteurOptional.isPresent()) {
            Auteur auteur = auteurOptional.get();
            return new AuteurDTO(auteur.getIdUtilisateur(), auteur.getUsername(), auteur.getNomComplet());
        } else {
            return null;
        }
    }

    public AuteurDTO getAuteurByUsername(String username) {
        Optional<Auteur> auteurOptional = auteurRepository.findByUsername(username);
        if (auteurOptional.isPresent()) {
            Auteur auteur = auteurOptional.get();
            return new AuteurDTO(auteur.getIdUtilisateur(), auteur.getUsername(), auteur.getNomComplet());
        } else {
            return null;
        }
    }

    public Auteur updateAuteur(Long id, Auteur updatedAuteur) {
        Auteur existingAuteur = auteurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auteur not found with id: " + id));
        existingAuteur.setNomComplet(updatedAuteur.getNomComplet());
        existingAuteur.setEmail(updatedAuteur.getEmail());
        existingAuteur.setRole(updatedAuteur.getRole());

        // Save the updatedAuteur
        return auteurRepository.save(existingAuteur);
    }

    public void deleteAuteur(Long id) {
        auteurRepository.deleteById(id);
    }

    public List<Auteur> getAll() {
        List<Auteur> auteurs = auteurRepository.findAll();
        return auteurs;
    }
}
