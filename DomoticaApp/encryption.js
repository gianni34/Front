
var CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Utf8.parse('1234567890123456');

export default class Encryption {

    static encrypt(msgString) {
        // msgString is expected to be Utf8 encoded
        //var iv = CryptoJS.lib.WordArray.random(16);
        var encrypted = CryptoJS.AES.encrypt(msgString, '134679');
        //return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
        return encrypted;
    }

    static decrypt(ciphertextStr) {
        //var ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);

        // split IV and ciphertext
        /*var iv = ciphertext.clone();
        iv.sigBytes = 16;
        iv.clamp();
        ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
        ciphertext.sigBytes -= 16;*/

        // decryption
        var decrypted = CryptoJS.AES.decrypt(ciphertextStr.toString(), '134679');
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}