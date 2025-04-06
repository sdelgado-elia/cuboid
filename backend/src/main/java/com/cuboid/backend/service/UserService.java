package com.cuboid.backend.service;

import com.cuboid.backend.model.User;
import com.cuboid.backend.service.PasswordService;
import com.cuboid.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository usuarioRepository;
    @Autowired
    private PasswordService passwordService; // Inyectar PasswordService

    public User crearUser(User usuario) {
        // Lógica adicional como cifrar contraseñas si lo deseas
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya está registrado");
        }
        
        return usuarioRepository.save(usuario);
    }

    public void crearAdmin() {
        // Verifica si el usuario admin ya existe
        if (!usuarioRepository.existsByUsername("admin")) {
            System.out.println("🛠️ Usuario admin creado por primera vez.");
            
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordService.encodePassword("admin"));  // Cifra la contraseña
            admin.setEmail("admin@cuboid.com");
            admin.setRole("ADMIN");
            
            this.crearUser(admin); // Llama al método que crea el usuario
        } else {
            System.out.println("✅ Usuario admin ya existe.");
        }
    }

    
}
