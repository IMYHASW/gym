package com.gym.utils;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;

import java.security.SecureRandom;
import java.text.ParseException;
import java.util.Arrays;
import java.util.Date;

@Slf4j
public class JwtUtil {


    // 生成随机的 256 位（32 字节）共享密钥
    // SecureRandom random = new SecureRandom();
    // byte[] sharedSecret = new byte[32];
    // random.nextBytes(sharedSecret);
    private static final String sharedSecret = "e406xOm56SEEZPKSnABw1gmVo2EHl668";

    // Token过期时间30分钟
    public static final long EXPIRE_TIME = 30 * 60 * 1000;
    public static String sign(String account) throws JOSEException {

        // 创建 HMAC 签名
        JWSSigner signer = new MACSigner(sharedSecret.getBytes());

        // payload
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject("member") // 主题
                .issuer("http://localhost:8080/api/v2/") // 签发人
                .expirationTime(new Date(new Date().getTime() + EXPIRE_TIME)) // 到期时间
                .claim("account", account)
                .build();

        // JWS 对象
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);

        signedJWT.sign(signer);

        return signedJWT.serialize();
    }

    public static String getAccountByToken(String token) throws ParseException, JOSEException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        return signedJWT.getJWTClaimsSet().getClaim("account").toString();
    }

    public static boolean verify(String token) throws ParseException, JOSEException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(sharedSecret.getBytes());
        return signedJWT.verify(verifier);
    }

}
