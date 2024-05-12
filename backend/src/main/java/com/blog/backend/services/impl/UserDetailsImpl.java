package com.blog.backend.services.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.blog.backend.repositories.AuteurRepository;

@Service
public class UserDetailsImpl implements UserDetailsService {

    private final AuteurRepository auteurRepository;

    public UserDetailsImpl(AuteurRepository auteurRepository) {
        this.auteurRepository = auteurRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return auteurRepository.findByUsername(email)
                .orElseThrow(() -> new UsernameNotFoundException("email not found"));
    }

}
