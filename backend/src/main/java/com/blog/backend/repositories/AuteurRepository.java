package com.blog.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.backend.models.Auteur;

@Repository
public interface AuteurRepository extends JpaRepository<Auteur, Long> {
    Optional<Auteur> findByUsername(String username);
    Optional<Auteur> findByIdUtilisateur(Long id);
}
