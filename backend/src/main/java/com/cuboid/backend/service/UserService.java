package com.cuboid.backend.service;

import com.cuboid.backend.model.User;
import com.cuboid.backend.service.PasswordService;
import com.cuboid.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository usuarioRepository;
    @Autowired
    private PasswordService passwordService; // Inyectar PasswordService
    @Autowired
    private PasswordEncoder passwordEncoder;

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

    public void resetPassword(String targetUsername, String oldPassword, String newPassword, String currentUsername, boolean isAdmin) {
        User userInDb = usuarioRepository.findByUsername(targetUsername)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Si no soy admin y quiero cambiar la contraseña de otro usuario
        if (!isAdmin && !currentUsername.equals(targetUsername)) {
            System.out.println(isAdmin);
            throw new RuntimeException("🚫 No autorizado para cambiar la contraseña de otro usuario");
        }

        // Si no soy admin, debo verificar la contraseña actual
        if (!isAdmin) {
            if (!passwordEncoder.matches(oldPassword, userInDb.getPassword())) {
                throw new RuntimeException("❌ La contraseña actual es incorrecta");
            }
        }

        // Establecer la nueva contraseña cifrada
        userInDb.setPassword(passwordEncoder.encode(newPassword));
        usuarioRepository.save(userInDb);

        System.out.println("🔐 Contraseña actualizada para el usuario: " + userInDb.getUsername());
    }
    
}
