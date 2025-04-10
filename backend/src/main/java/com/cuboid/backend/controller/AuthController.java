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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

    // @PostMapping("/register")
    // public User crearUser(@RequestBody User usuario) {
    //     usuario.setPassword(passwordService.encodePassword(usuario.getPassword()));
    //     usuario.setRole("USER");
    //     System.out.println(usuario.getRole());
    //     try {
    //         return usuarioService.crearUser(usuario);
    //     } catch (RuntimeException e) {
    //         // Logueás el error, pero lo relanzas para que lo maneje el GlobalExceptionHandler
    //         System.err.println("Error al crear usuario: " + e.getMessage());
    //         throw e;
    //     }
        
    // }

    @PostMapping("/register")
    public ResponseEntity<?> crearUser(@RequestBody @Valid User usuario) {
        try {
            usuario.setPassword(passwordService.encodePassword(usuario.getPassword()));
            usuario.setRole("USER");
            User createdUser = usuarioService.crearUser(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (RuntimeException e) {
            // Se podría mejorar el manejo de errores aquí para retornar una respuesta adecuada.
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(e.getMessage());
        }
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
