package com.example.attendance.service;

import com.example.attendance.model.User;
import com.example.attendance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder; // Ensure this is correctly set

    public boolean authenticateUser(String userid, String password) {
        Optional<User> userOptional = userRepository.findByUsername(userid);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // ✅ Fix password comparison
            return passwordEncoder.matches(password, user.getPassword());
        }

        return false; // User not found
    }
}
