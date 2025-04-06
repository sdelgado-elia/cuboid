package com.cuboid.backend.controller;

import com.cuboid.backend.model.User;
import com.cuboid.backend.service.UserService;
import com.cuboid.backend.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

}
