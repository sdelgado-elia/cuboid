package com.cuboid.backend.controller;

import com.cuboid.backend.model.User;
import com.cuboid.backend.service.CustomUserDetailsService;
import com.cuboid.backend.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.cuboid.backend.service.UserService;
import com.cuboid.backend.service.PasswordService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final CustomUserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private UserService usuarioService;
    @Autowired
    private PasswordService passwordService;  
    @Autowired
    public AdminController(CustomUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil, AuthenticationManager authenticationManager) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public User crearUser(@RequestBody User usuario) {
        usuario.setPassword(passwordService.encodePassword(usuario.getPassword()));
        return usuarioService.crearUser(usuario);
    }

    @GetMapping("/status")
    public void status() {
       System.out.println("Logueado como ADMIN");
    }

}
