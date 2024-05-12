package com.dto;

public class AuteurDTO {
    private Long idUtilisateur;
    private String username;
    private String nomComplet;
    
    public AuteurDTO(Long idUtilisateur, String username, String nomComplet) {
        this.idUtilisateur = idUtilisateur;
        this.username = username;
        this.nomComplet = nomComplet;
    }

    public Long getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(Long idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNomComplet() {
        return nomComplet;
    }

    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
    }
    

}
