package com.geekcode.react.util;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Random;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;

@Component
public class TokenUtil {
	
	final static String randomCarts = "abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789";
	final static String publicKey="c40727c66d04b725818d4579040bcc69d5cfd9b430889a1af92f02e2cdb1bde2";
	static Random random = new Random();
	
	public static void main(String[] args) throws Exception {
		int i = 10000;
		while(i-->0){
			String u1 = next(10);
			String token = getToken(u1);
			String u2 = getUser(token);
			System.out.println(u1.equals(u2));
		}
	}
	
	public static String getUser(String token) throws Exception{
		if(token == null){ return null; }
		String profix = token.substring(0, 10);
		String[] tokens = token.split("-");
		String user = decryptor(tokens[0].substring(10));
		MessageDigest digest = DigestUtils.getSha256Digest();
		digest.update(publicKey.getBytes());
		digest.update(user.getBytes());
		digest.update(profix.getBytes());
		String token2 = profix + encrypt(user) + "-" + DigestUtils.sha1Hex(digest.digest());
		if(token2.equals(token)){
			return user;
		}
		return null;
	}
	
	public static String getToken(String user) throws Exception{
		if(user == null){ return null; }
		String profix = next(10);
		MessageDigest digest = DigestUtils.getSha256Digest();
		digest.update(publicKey.getBytes());
		digest.update(user.getBytes());
		digest.update(profix.getBytes());
		return profix + encrypt(user) + "-" + DigestUtils.sha1Hex(digest.digest());
	}
    public static String encrypt(String data) throws Exception {  //对string进行BASE64Encoder转换
        byte[] bt = encryptByKey(data.getBytes(), publicKey);
        return Base64.getEncoder().encodeToString(bt);
    }
    public static String decryptor(String data) throws Exception {  //对string进行BASE64Encoder转换
        byte[] bt = decrypt(Base64.getDecoder().decode(data), publicKey);
        String strs = new String(bt);
        return strs;
    }
    private static byte[] encryptByKey(byte[] datasource, String key) throws Exception {
    	SecureRandom random = new SecureRandom();
        DESKeySpec desKey = new DESKeySpec(key.getBytes());
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey securekey = keyFactory.generateSecret(desKey);
        Cipher cipher = Cipher.getInstance("DES");
        cipher.init(Cipher.ENCRYPT_MODE, securekey, random);
        return cipher.doFinal(datasource);
    }
    private static byte[] decrypt(byte[] src, String key) throws Exception {
        SecureRandom random = new SecureRandom();
        DESKeySpec desKey = new DESKeySpec(key.getBytes());
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey securekey = keyFactory.generateSecret(desKey);
        Cipher cipher = Cipher.getInstance("DES");
        cipher.init(Cipher.DECRYPT_MODE, securekey, random);
        return cipher.doFinal(src);
    }
    public static String next(int size) {
    	StringBuilder builder = new StringBuilder();
    	while (size-->0) {
    		builder.append(randomCarts.charAt(random.nextInt(randomCarts.length())));
		}
        return builder.toString();
    }
}
