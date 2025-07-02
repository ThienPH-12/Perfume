/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.Perfume.service;

import com.example.Perfume.api.bean.req.RegisterReq;
import com.example.Perfume.jpa.entity.User;
import com.example.Perfume.jpa.repository.UserRepository;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;
import com.example.Perfume.jpa.entity.ConfirmationToken;
import com.example.Perfume.config.EmailConfig; // Import EmailConfig
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.List;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 *
 * @author badao
 */
@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailConfig emailConfig; // Use EmailConfig bean

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Value("${frontend.base-url}")
    private String frontendBaseUrl;
    
    public void sendActivationEmail(User user) {
        String token =generateConfirmationToken(user);
        // String link = "http://localhost:3000/user/activateUser?token=" + token; // Updated route dev env
        String link = frontendBaseUrl + "/user/activateUser?token=" + token; // Updated route public
        // Use EmailConfig's JavaMailSender
        JavaMailSender javaMailSender = emailConfig.getJavaMailSender();
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(buildEmail(user.getUsername(), link), true); // Set email content as HTML
            helper.setTo(user.getEmail());
            helper.setSubject("Xác nhận email của bạn đến ShineAura");
            helper.setFrom("ShineAura@gmail.com");
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            logger.error("Failed to send email", e);
            throw new RuntimeException("Failed to send email");
        }
//        logger.info("Activation email sent to {}", user.getEmail());
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n"
                + "\n"
                + "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n"
                + "\n"
                + "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
                + "    <tbody><tr>\n"
                + "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n"
                + "        \n"
                + "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
                + "          <tbody><tr>\n"
                + "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n"
                + "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                + "                  <tbody><tr>\n"
                + "                    <td style=\"padding-left:10px\">\n"
                + "                  \n"
                + "                    </td>\n"
                + "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n"
                + "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Xác nhận email của bạn</span>\n"
                + "                    </td>\n"
                + "                  </tr>\n"
                + "                </tbody></table>\n"
                + "              </a>\n"
                + "            </td>\n"
                + "          </tr>\n"
                + "        </tbody></table>\n"
                + "        \n"
                + "      </td>\n"
                + "    </tr>\n"
                + "  </tbody></table>\n"
                + "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                + "    <tbody><tr>\n"
                + "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n"
                + "      <td>\n"
                + "        \n"
                + "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                + "                  <tbody><tr>\n"
                + "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n"
                + "                  </tr>\n"
                + "                </tbody></table>\n"
                + "        \n"
                + "      </td>\n"
                + "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n"
                + "    </tr>\n"
                + "  </tbody></table>\n"
                + "\n"
                + "\n"
                + "\n"
                + "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
                + "    <tbody><tr>\n"
                + "      <td height=\"30\"><br></td>\n"
                + "    </tr>\n"
                + "    <tr>\n"
                + "      <td width=\"10\" valign=\"middle\"><br></td>\n"
                + "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n"
                + "        \n"
                + "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Xin chào " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Cảm ơn bạn đã đăng ký. Vui lòng nhấp vào liên kết bên dưới để kích hoạt tài khoản của bạn: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Kích hoạt ngay</a> </p></blockquote>\n Liên kết sẽ hết hạn sau 15 phút. <p>Trân trọng,</p><p>Nhóm ShineAura</p>"
                + "        \n"
                + "      </td>\n"
                + "      <td width=\"10\" valign=\"middle\"><br></td>\n"
                + "    </tr>\n"
                + "    <tr>\n"
                + "      <td height=\"30\"><br></td>\n"
                + "    </tr>\n"
                + "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n"
                + "\n"
                + "</div></div>";
    }

    private String generateConfirmationToken(User user) {
        ConfirmationToken confirmationToken = new ConfirmationToken(
                java.util.UUID.randomUUID().toString(),
                user.getUserId(),
                new Date(System.currentTimeMillis()), // Use java.util.Date
                new Date(System.currentTimeMillis() + 15 * 60 * 1000) // Use java.util.Date for expiration
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        return confirmationToken.getToken();
    }

    public String activateUser(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new RuntimeException("Email đã được xác nhận");
        }

        if (confirmationToken.getExpiresAt().before(new Date())) { // Compare using java.util.Date
            throw new RuntimeException("Link này đã hết hạn");
        }

        confirmationTokenService.setConfirmedAt(token);
        User user = userRepository.findById(confirmationToken.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActivation("Activated");
        userRepository.save(user);

        logger.info("User with email {} activated successfully.", user.getEmail());
        return "User activated successfully";
    }

    public String register(RegisterReq req) {
        if (!isValidEmail(req.getEmail())) {
            throw new RuntimeException("Email không phù hợp");
        }

        if (!CheckRegister(req)) {
            throw new RuntimeException("Tên hoặc email đã tồn tại!");
        }

        User user = new User();
        user.setUserName(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword())); // Encode password
        user.setEmail(req.getEmail());
        user.setGender(req.getGender());
        user.setAuthority("0"); // Default authority
        user.setCreateDateTime(new Date(System.currentTimeMillis()));
        user.setCreateUserId("system");
        user.setActivation("Pending"); // Set activation to pending

        userRepository.save(user);

        // Retrieve the saved user to get the ID using findByEmail
        User savedUser = userRepository.findByEmail(req.getEmail());

        // Reuse sendActivationEmail method
        sendActivationEmail(user);

        return "Registration successful. Activation email sent.";
    }

    public User findByUsername(String username) {
         User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!username.equals(userContext.getUsername())&&!"1".equals(userContext.getAuthority()) ) {
            throw new RuntimeException("Permission denied:Không được truy cập vào thông tin của người khác.");
        }
        return userRepository.findByUserName(username);
    }

    public boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return Pattern.compile(emailRegex).matcher(email).matches();
    }

    public boolean CheckRegister(RegisterReq req) {
        if (!isValidEmail(req.getEmail())) {
            throw new RuntimeException("Email không phù hợp: " + req.getEmail());
        }
        if (userRepository.existsByUserName(req.getUsername())) {
            throw new RuntimeException("Tên đã tồn tại: " + req.getUsername());
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email đã tồn tại: " + req.getEmail());
        }
        return true;
    }

    public void resendActivationEmail(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new RuntimeException("Dữ liệu không hợp lệ."));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new RuntimeException("Email đã được xác nhận.");
        }

        // Delete the old token by its ID
        confirmationTokenService.deleteTokenById(confirmationToken.getId());

        // Retrieve the user by UserId
        User user = userRepository.findById(confirmationToken.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng."));

        if ("Activated".equals(user.getActivation())) {
            throw new RuntimeException("Người dùng đã được kích hoạt.");
        }

        // Generate a new token and send the activation email
        sendActivationEmail(user);
    }

    public List<User> UserList() {
         User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!"1".equals(userContext.getAuthority())) {
            throw new RuntimeException("Permission denied: Only users with Authority = 1 can get User List.");
        }
        return userRepository.findAll();
    }
}
