package com.blog.backend.services;

import com.blog.backend.config.JwtService;
import com.blog.backend.models.Auteur;
import com.blog.backend.models.AuthenticationResponse;
import com.blog.backend.models.Role;
import com.blog.backend.repositories.AuteurRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuteurRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(AuteurRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(Auteur request) {

        // check if user already exist. if exist then authenticate the user
        if (repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthenticationResponse(null, "User already exist", null);
        }

        Auteur user = new Auteur();
        user.setUsername(request.getUsername());
        user.setNomComplet(request.getNomComplet());
        user.setEmail(request.getEmail());
        user.setMotDePasse(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user = repository.save(user);

        return new AuthenticationResponse(jwtService.generateToken(user), "User registration was successful",
                user.getRole());

    }

    public AuthenticationResponse authenticate(Auteur request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        Auteur user = repository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token, "User login was successful", user.getRole());

    }

}