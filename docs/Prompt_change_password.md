[media pointer="file-service://file-HFQkRp8V4eKT5JrUt3aHST"]

1. Vérificationd es API routes et Backend

- swagger voir screen
- mon apiRoutes.jsx:
  export const API_ROUTES = {
  // ─── AUTHENTIFICATION ─────────────────────────────────────────────────────
  AUTH: {
  SIGNIN: getApiUrl(AUTH_HOST, "/auth/signin"),
  SIGNUP: getApiUrl(AUTH_HOST, "/auth/signup"),
  VALIDATE: getApiUrl(AUTH_HOST, "/auth/validate"),
  VERIFY_EMAIL: (email) =>
  getApiUrl(
  AUTH_HOST,
  `/auth/verify-email?email=${encodeURIComponent(email)}`
  ),
  //optionnel dans mon frontend
  VALIDATE_EMAIL: (email) =>
  getApiUrl(
  AUTH_HOST,
  `/auth/validate-email?email=${encodeURIComponent(email)}`
  ),
  //optionnel dans mon frontend
  VALIDATE_ACCOUNT: (email) =>
  getApiUrl(
  AUTH_HOST,
  `/auth/validate-account?email=${encodeURIComponent(email)}`
  ),
  PASSWORD_FORGOT_BY_ID: (userId) =>
  getApiUrl(AUTH_HOST, `/auth/password-forgot/${userId}`),
  PASSWORD_FORGOT: (email) =>
  getApiUrl(
  AUTH_HOST,
  `/auth/password-forgot?email=${encodeURIComponent(email)}`
  ),
  },

---

LE BE:
package com.cyna.auth_users.auth.config;

import com.cyna.auth_users.auth.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

## }

package com.cyna.auth_users.auth.config;

import com.cyna.auth_users.auth.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal( HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

## }

package com.cyna.auth_users.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("✅ SecurityFilterChain applied");

        return http
                .cors() // DOIT être activé
                .and()
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/auth-users/**").permitAll() //rendre les images de auth accessibles
                        .requestMatchers("/api-docs", "/swagger-ui/**", "/swagger-ui-custom.html").permitAll()
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        System.out.println("✅ CORS config active");

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173")); // ✅ frontend React
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

## }

package com.cyna.auth_users.auth.controller;

import com.cyna.auth*users.auth.dto.*;
import com.cyna.auth*users.auth.service.AuthService;
import com.cyna.auth_users.users.dto.UpdateUserDto;
import com.cyna.auth_users.users.dto.UserDto;
import com.cyna.auth_users.users.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth/")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody CreateUserDto userDto) {
        return ResponseEntity.ok(authService.register(userDto));
    }

    @PostMapping("/validate")
    public  ResponseEntity<ValidationResult> validate(@Valid @RequestBody TokenValidationRequest request) {
        return ResponseEntity.ok(authService.validate(request.getToken()));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("email") String email) {
        return ResponseEntity.ok(authService.verifyEmail(email));
    }

    @GetMapping("/validate-email")
    public ResponseEntity<String> validateEmail(@RequestParam("email") String email) {
        return ResponseEntity.ok(authService.validateEmail(email));
    }

    @GetMapping("/validate-account")
    public ResponseEntity<String> validateAccount(@RequestParam("email") String email) {
        return ResponseEntity.ok(authService.validateAccount(email));
    }

    @GetMapping(value = "/password-forgot")
    public ResponseEntity<String> passwordForgot(@RequestParam("email") String email) {
        return ResponseEntity.ok(userService.passwordForget(email));
    }

    @PostMapping("/password-forgot/{userId}")
    public ResponseEntity<String> passwordForgot(@Valid @PathVariable("userId") long userId, @RequestBody UpdateUserDto user) {
        return ResponseEntity.ok(userService.update(userId, user));
    }

}

---

package com.cyna.auth_users.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Gestion des erreurs de validation (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, Object> errors = new HashMap<>();
        errors.put("status", ex.getStatusCode());
        errors.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase());

        // Récupération des messages d'erreur pour chaque champ invalide
        Map<String, String> fieldErrors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            fieldErrors.put(fieldName, errorMessage);
        });
        errors.put("message", "Erreur de validation");
        errors.put("errors", fieldErrors);
        return new ResponseEntity<>(errors, ex.getStatusCode());
    }

    // Gestion générique des autres exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllExceptions(Exception ex) {
        Map<String, Object> errors = new HashMap<>();
        errors.put("status", ex instanceof ResponseStatusException ? ((ResponseStatusException) ex).getStatusCode() : HttpStatus.BAD_REQUEST);
        errors.put("error", HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        errors.put("message", ex.getMessage());

        return new ResponseEntity<>(errors, ex instanceof ResponseStatusException ? ((ResponseStatusException) ex).getStatusCode() : HttpStatus.BAD_REQUEST);
    }

## }

package com.cyna.auth_users.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {
private String token;

## }

package com.cyna.auth_users.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateUserDto {

    @NotBlank(message = "Le prenom ne peut être vide")
    @NotNull(message = "Le prenom est obligatoire")
    private String firstname;

    @NotBlank(message = "Le nom de famille ne peut être vide")
    @NotNull(message = "Le nom de famille est obligatoire")
    private String lastname;

    @NotBlank(message = "Email cannot be blank")
    @NotNull(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = " Le role ne peut être vide")
    @NotNull(message = " Le role est obligatoire")
    private String role;

    @NotBlank(message = "Le mot de passe ne peut être vide")
    @NotNull(message = "Le mot de passe est obligatoire")
    private String password;

## }

package com.cyna.auth_users.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "L'email est obligatoire")
    @Email(message ="Email should be valid")
    private String email;

    @NotNull(message = "Le mot de passe est obligatoire")
    private String password;

}

---

package com.cyna.auth_users.auth.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TokenValidationRequest {
@NotNull(message = "Le token en vide")
private String token;
}

---

package com.cyna.auth_users.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ValidationResult {
private boolean valid;
private String username;
private Date expiration;
private String message;
}

---

package com.cyna.auth_users.auth.service;

import com.cyna.auth_users.auth.dto.AuthResponse;
import com.cyna.auth_users.auth.dto.CreateUserDto;
import com.cyna.auth_users.auth.dto.LoginRequest;
import com.cyna.auth_users.auth.dto.ValidationResult;
import com.cyna.auth_users.users.models.ROLE;
import com.cyna.auth_users.users.models.User;
import com.cyna.auth_users.users.repositories.UserRepository;
import com.cyna.auth_users.users.service.IEmailService;
import com.cyna.auth_users.users.service.MailerSendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
private final UserRepository repository;
private final JwtService jwtService;
private final PasswordEncoder passwordEncoder;
private final AuthenticationManager authenticationManager;
private final UserDetailsService userDetailsService;
//private final MailerSendService mailerSendService;
private final IEmailService mailerSendService;

    @Value("${mailerSend.super_admin}")
    private String superAdminEmail;

    @Value("${endpoints.validate_email}")
    private String validateEmailEndpoint;

    @Value("${endpoints.validate_account}")
    private String validateAccountEndpoint;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = repository.findByEmail(request.getEmail()).orElseThrow();

        if (user.getRoles().equals(ROLE.ADMIN) && Boolean.FALSE.equals(user.getEnabled()))
            throw new ResponseStatusException(HttpStatusCode.valueOf(HttpStatus.SC_FORBIDDEN), "Account not activate");

        return AuthResponse.builder()
                .token(jwtService.generateToken(user))
                .build();
    }

    public ValidationResult validate(String token) {
        try {
            String username = jwtService.extractUsername(token);
            if (username == null) {
                return ValidationResult.builder().valid(false).message("User not found").build();
            }
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(token, userDetails)) {
                Date expiration = jwtService.extractExpiration(token);
                return ValidationResult.builder()
                        .valid(true)
                        .username(username)
                        .expiration(expiration)
                        .message("valid token")
                        .build();
            }
            return ValidationResult.builder().valid(false).message("Invalid token").build();
        }catch (Exception e) {
            log.error("Error while validated token", e);
            return ValidationResult.builder().valid(false).message("Invalid token").build();
        }
    }

    public void logout(String token) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(token, null));
    }


    public Object register(CreateUserDto request) {
        //Pour les comptes Admins, un mail de validation de création de compte est envoyé au super ADMIN, la validation des emails
        if (ROLE.valueOf(request.getRole()).equals(ROLE.ADMIN)) {
            try {
                mailerSendService.sendEmail(superAdminEmail, validateAccountEndpoint+"?email="+request.getEmail(), "validate.account", request.getLastname() + " " + request.getFirstname());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(ROLE.valueOf(request.getRole()))
                .enabled(!(ROLE.valueOf(request.getRole()).equals(ROLE.ADMIN)))
                .emailVerified(false)
                .build();
        repository.save(user);

        if (ROLE.valueOf(request.getRole()).equals(ROLE.ADMIN))
            return "Your admin account has been created. An email has been sent to the Super Admin for validation";


        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public String validateEmail(String email) {

        User user = repository.findByEmail(email).orElseThrow();
        user.setEmailVerified(true);
        repository.save(user);

        return "Email verified";
    }

    public String validateAccount(String email) {
        User user = repository.findByEmail(email).orElseThrow();
        user.setEnabled(true);
        repository.save(user);

        return "Account linked to "+email+" has been activated";
    }

    public String verifyEmail(String email) {
        try {
            mailerSendService.sendEmail(email, validateEmailEndpoint+"?email="+email, "validate.email");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "Email Sent";
    }

## }

package com.cyna.auth_users.auth.service;
import com.cyna.auth_users.users.repositories.UserRepository;
import com.cyna.auth_users.users.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByEmail(username)
                .map(this::mapToUserDetails) // convertit User en UserDetails
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private UserDetails mapToUserDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRoles().toString())
                .build();
    }

## }

package com.cyna.auth_users.auth.service;

import com.cyna.auth_users.users.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
@Value("${jwt.secret}")
private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public String generateToken(User userDetails) {
        return buildToken(new HashMap<>(), userDetails, jwtExpiration);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            User userDetails,
            long expiration
    ) {



        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setId(userDetails.getId().toString())
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

## }

package com.cyna.auth_users;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthUsersApplication {

    public static void main(String[] args) {
    	SpringApplication.run(AuthUsersApplication.class, args);
    }

## }

applicatio.yaml:
spring:
application:
name: auth-users
config:
import: configserver:${URL-CONFIG-SERVER:http://localhost:8888}
profiles:
active: ${PROFILE:local}

endpoints:
validate_email: ${FRONT_END_URL:http://localhost:8080/}api/v1/auth/validate-email
validate_account: ${FRONT_END_URL:http://localhost:8080/}api/v1/auth/validate-account
password_forgot: ${FRONT_END_URL:http://localhost:8080/}api/v1/auth/password-forgot

mailerSend:
from: ${...}
support_email: ${...}
super_admin: ${...}
token: ${....}
templates:
generic_template: "..."
generic_template_with_button: "..."
email_verified: "..."
