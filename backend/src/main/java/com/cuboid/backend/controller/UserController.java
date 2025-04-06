package com.cuboid.backend.controller;

import com.cuboid.backend.model.User;
import com.cuboid.backend.dto.PasswordResetDTO;
import com.cuboid.backend.service.UserService;
import com.cuboid.backend.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {

    @Autowired
    private UserService usuarioService;
    @Autowired
    private PasswordService passwordService;  

    @PostMapping("/register")
    public User crearUser(@RequestBody User usuario) {
        usuario.setPassword(passwordService.encodePassword(usuario.getPassword()));
        usuario.setRole("USER");
        System.out.println(usuario.getRole());
        return usuarioService.crearUser(usuario);
    }
//    Schema for posting new users: 
// {
//   "username": "juan123456",
//   "password": "password123",
//   "email": "juan@example.com",
//   "role": "USER"
// }
    @PostMapping("/resetpwd")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDTO data, Authentication authentication) {
        String currentUsername = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        usuarioService.resetPassword(data.getUsername(), data.getOldpassword(), data.getNewpassword(), currentUsername, isAdmin);
        return ResponseEntity.ok("✅ Contraseña actualizada");
    };

};
