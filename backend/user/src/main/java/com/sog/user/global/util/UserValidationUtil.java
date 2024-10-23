package com.sog.user.global.util;

public class UserValidationUtil {

    // Validate userID
    public static boolean validateUserID(String userId) {
        String userIDRegex = "^[a-zA-Z][a-zA-Z0-9]{4,19}$";
        return userId.matches(userIDRegex);
    }

    // Validate password
    public static boolean validatePassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-\\[\\]{};':\"\\\\|,.<>/?]).{8,}$";
        return password.matches(passwordRegex);
    }

    // Validate nickname
    public static boolean validateNickname(String nickname) {
        String nicknameRegex = "^[a-zA-Z0-9가-힣\\-_]{2,15}$";
        return nickname.matches(nicknameRegex);
    }

}
