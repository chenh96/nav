package tech.chenh.nav.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.apache.commons.codec.digest.Md5Crypt;

import java.util.Date;

public class Security {

    private static final int EXPIRE_DAYS = 30;
    private static final String CLAIM_KEY = "username";
    private static final String ALGORITHM_SECRET = "nav#ALGORITHM@2021";

    public static String createToken(String username) {
        return JWT.create()
            .withClaim(CLAIM_KEY, username)
            .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRE_DAYS * 24 * 60 * 60 * 1000L))
            .sign(Algorithm.HMAC256(ALGORITHM_SECRET));
    }

    public static String decodeToken(String token) {
        try {
            return JWT.require(Algorithm.HMAC256(ALGORITHM_SECRET)).build().verify(token).getClaim(CLAIM_KEY).asString();
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    public static String encryptPassword(String password, String salt) {
        return Md5Crypt.apr1Crypt(password, salt);
    }

}
