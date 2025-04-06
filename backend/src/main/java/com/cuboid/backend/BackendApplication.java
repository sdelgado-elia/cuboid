package com.cuboid.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.cuboid.backend.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;


@SpringBootApplication
public class BackendApplication {

    @Autowired
    private UserService usuarioService;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("*");
            }
        };
    }

    @Bean
    public CommandLineRunner init(UserService userService) {
        //Comnados que se ejecutan al iniciar el servidor
        return args -> {
            System.out.println("🚀 Servidor iniciado. Ejecutando lógica de arranque...");
            // Crear usuario admin si no existe
            usuarioService.crearAdmin();
        };
    }
	
}
