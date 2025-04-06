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
@RequestMapping("/api/auth")
public class AuthController {

    private final CustomUserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private UserService usuarioService;
        @Autowired
    private PasswordService passwordService;  
    @Autowired
    public AuthController(CustomUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil, AuthenticationManager authenticationManager) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public User crearUser(@RequestBody User usuario) {
        usuario.setPassword(passwordService.encodePassword(usuario.getPassword()));
        usuario.setRole("USER");
        System.out.println(usuario.getRole());
        return usuarioService.crearUser(usuario);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        System.out.println("INTENTANDO LOGIN");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtTokenUtil.generateToken(userDetails);
    }
}
