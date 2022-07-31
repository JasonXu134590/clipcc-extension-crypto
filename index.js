const { Extension, type, api } = require('clipcc-extension');
const crypto = require('crypto');
global.Buffer = global.Buffer || require('buffer').Buffer;


class CryptoExtension extends Extension {
    RSAgetSign(params, privatePem, type) {
        //RSA-SHA1
        let _privatePem = '-----BEGIN PRIVATE KEY-----\n' + privatePem + '\n-----END PRIVATE KEY-----';
        try {
            var sign = crypto.createSign(type);
            sign.update(params);
            sign = sign.sign(_privatePem, 'base64');
            return sign;
        } catch (err) {
            console.log('err', err);
            return NaN;
        }
    }

    RSAverifySign(params, sign, publicPem, type) {
        let _publicPem = '-----BEGIN PUBLIC KEY-----\n' + publicPem + '\n-----END PUBLIC KEY-----';
        try {
            var verify = crypto.createVerify(type);
            verify.update(params);
            return verify.verify(_publicPem.toString(), sign, 'base64')

        } catch (err) {
            console.log('veriSign err', err);
            return NaN;
        }
    }

    RSApublicEncrypt(data, publicPem) {
        try{
            let _publicPem = '-----BEGIN PUBLIC KEY-----\n' + publicPem + '\n-----END PUBLIC KEY-----';
            let encodeData = crypto.publicEncrypt(_publicPem, Buffer.from(data)).toString('base64');
            return encodeData;
        }catch(err){
            console.log('err',err);
            return 'failed';
        }
    }

    RSAprivateDecrypt(encodeData, privatePem) {
        try{
            let _privatePem = '-----BEGIN PRIVATE KEY-----\n' + privatePem + '\n-----END PRIVATE KEY-----';
            let decodeData = crypto.privateDecrypt(_privatePem, Buffer.from(encodeData.toString('base64'), 'base64'));
            return decodeData;
        }catch(err){
            console.log('err',err);
            return 'failed'
        }
    }

    RSAprivateEncrypt(data, privatePem) {
        try{
            let _privatePem = '-----BEGIN PRIVATE KEY-----\n' + privatePem + '\n-----END PRIVATE KEY-----';
            let encodeData = crypto.privateEncrypt(_privatePem, Buffer.from(data)).toString('base64');
            return encodeData;
        }catch(err){
            console.log('err',err);
            return 'failed'
        }
    }

    RSApublicDecrypt(encodeData, publicPem) {
        try{
            let _publicPem = '-----BEGIN PUBLIC KEY-----\n' + publicPem + '\n-----END PUBLIC KEY-----';
            let decodeData = crypto.publicDecrypt(_publicPem, Buffer.from(encodeData.toString('base64'), 'base64'));
            return decodeData;
        }catch(err){
            console.log('err',err);
            return 'failed'
        }
    }

    md5(str) {
        return crypto.createHash('md5').update(str).digest('hex').toUpperCase();
    }
    sha1(str) {
        return crypto.createHash('sha1').update(str).digest('hex').toUpperCase();
    }
    sha256(str) {
        return crypto.createHash('sha256').update(str).digest('hex').toUpperCase();
    }
    sha512(str) {
        return crypto.createHash('sha512').update(str).digest('hex').toUpperCase();
    }
    base64Encrypt(str) {
        const encodedData = Buffer.from(str, 'utf-8').toString('base64');
        return encodedData;
    }
    base64Decrypt(str) {
        const decodedData = Buffer.from(str, 'base64').toString('utf8');
        return decodedData;
    }
    desEncrypt(data, key, type) {
        try {
            const cipher = crypto.createCipher(type, key)
            var crypted = cipher.update(data, 'utf8', 'base64');
            crypted += cipher.final('base64');
            return crypted;
        } catch (err) {
            console.log(err);
        }
    }
    desDecrypt(encrypted, key, type) {
        try {
            const decipher = crypto.createDecipher(type, key);
            var decrypted = decipher.update(encrypted, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (err) {
            return "Failed";
        }
    }
    aesEncrypt(data, key, type) { //aes192
        try {
            const cipher = crypto.createCipher(type, key);
            var crypted = cipher.update(data, 'utf8', 'hex');
            crypted += cipher.final('hex');
            return crypted;
        } catch (err) {
            console.error(err);
            return "Failed";
        }
    }

    aesDecrypt(encrypted, key, type) {
        try {
            const decipher = crypto.createDecipher(type, key);
            var decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (err) {
            return "Failed";
        }
    }

    onInit() {

        api.addCategory({
            categoryId: 'jasonxu.crypto.crypto',
            messageId: 'jasonxu.crypto.crypto.messageid',
            color: '#1C651C'
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.md5.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.md5',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.md5(args.THING),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'ClipTeam yyds!'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.sha1.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.sha1',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.sha1(args.THING),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'ClipTeam yyds!'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.sha256.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.sha256',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.sha256(args.THING),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'ClipTeam yyds!'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.sha512.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.sha512',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.sha512(args.THING),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'ClipTeam yyds!'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.EnyBase64.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.EnyBase64',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.base64Encrypt(args.THING),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'ClipTeam yyds!'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.DeyBase64.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.DeyBase64',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.base64Decrypt(args.THING),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'Q2xpcFRlYW0geXlkcyE='
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.aesEny.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.aesEny',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.aesEncrypt(args.THING, args.KEY, args.TYPE),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'ClipTeam yyds!'
                },
                KEY: {
                    type: type.ParameterType.STRING,
                    default: '1234567890'
                },
                TYPE: {
                    type: type.ParameterType.STRING,
                    default: 'aes192'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.aesDey.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.aesDey',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.aesDecrypt(args.THING, args.KEY, args.TYPE),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'af97c4c57e8332f18fec92bcb703fed5'
                },
                KEY: {
                    type: type.ParameterType.STRING,
                    default: '1234567890'
                },
                TYPE: {
                    type: type.ParameterType.STRING,
                    default: 'aes192'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.desEny.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.desEny',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.desEncrypt(args.THING, args.KEY, args.TYPE),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'ClipTeam yyds!'
                },
                KEY: {
                    type: type.ParameterType.STRING,
                    default: '1234567890'
                },
                TYPE: {
                    type: type.ParameterType.STRING,
                    default: 'des-cbc'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.desDey.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.desDey',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.desDecrypt(args.THING, args.KEY, args.TYPE),
            param: {
                THING: {
                    type: type.ParameterType.STRING,
                    default: 'PAxd/d9nraEJejZbN9Z0Nw=='
                },
                KEY: {
                    type: type.ParameterType.STRING,
                    default: '1234567890'
                },
                TYPE: {
                    type: type.ParameterType.STRING,
                    default: 'des-cbc'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.rsaSign.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.rsaSign',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.RSAgetSign(args.DATA, args.PRIVATE, args.TYPE),
            param: {
                DATA: {
                    type: type.ParameterType.STRING,
                    default: '123456'
                }, PRIVATE: {
                    type: type.ParameterType.STRING,
                    default: 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKExgWbsuBiDmAq0zATd/B1zEDyfJPSeIt4qwM/HIt028ArYxNfZJeeP/+CSbR8UQ3t00aMfR8u2mTQ/vxlONLE9nhwAi+Ql8u8EL5W4DIj7E6REtx5QFec6CG1BGDOx7DwqgFpQoB/3t8QSq1fl/Vb1HFwtIWkNg51PAQTwmqa1AgMBAAECgYASB/qkq8gwHdBNKkpEJRzFopBnZ5n3rxTRa1DkLS9uNW4GmJb0WjsOOyJxWY/RUS/3SGsG50HdvNBIcvUKfKASIYRuyWb/jlgWF3zF6g8y20oHVJ6+yIs1aBy9tmRRW1iBPRm613Dn0Fsiz4tbEDkCO6yxjAtuLziP/jnAZcpRZQJBAO2ENdLMibwxVzrvnw1ev9jzKp53idhP5ATK+IEawKGeDuf6YAICcZ6McCNqh+T5KQlygDyUk1TZubJNrG9JlEcCQQCtvMqQBTreQzOUfXqZ4NeJzxboR6Hm7L2ivqHK2WK7mAM6zp0iT6AgbPjWxK9VWJm688/4nhPSVryUJ28CfxcjAkA3t8Igl1bgTPrXmorHSijbLgAbeJNfqS4maa7uKmZyA3Afvz5yejxJI0zTIhSLBGA6FSA8FeaSCxli2JHQ8YPVAkBjKaR8O1/0SGsCT/RQK/MZ5yduAKS6B1ndr+zsuNMPu53sTM2HLed5WnlVLAHfNqjX+h00DBXIMlWEQlWsGRn9AkBe7I+TPIAgTVyZ6n+SHidD2QB0tZTpW8DuSgg8JXV8XV8T01wtRe92vbtIflrS2V1LwlucYSLe1w+5cldHHs34'
                }, TYPE: {
                    type: type.ParameterType.STRING,
                    default: 'RSA-SHA1'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.rsaVerifySign.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.rsaVerifySign',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.RSAverifySign(args.DATA, args.SIGN, args.PUBLIC, args.TYPE),
            param: {
                DATA: {
                    type: type.ParameterType.STRING,
                    default: '123456'
                }, PUBLIC: {
                    type: type.ParameterType.STRING,
                    default: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChMYFm7LgYg5gKtMwE3fwdcxA8nyT0niLeKsDPxyLdNvAK2MTX2SXnj//gkm0fFEN7dNGjH0fLtpk0P78ZTjSxPZ4cAIvkJfLvBC+VuAyI+xOkRLceUBXnOghtQRgzsew8KoBaUKAf97fEEqtX5f1W9RxcLSFpDYOdTwEE8JqmtQIDAQAB'
                }, TYPE: {
                    type: type.ParameterType.STRING,
                    default: 'RSA-SHA1'
                }, SIGN: {
                    type: type.ParameterType.STRING,
                    default: 'MdVbJHXM/dzZtOBIu0/Ok7DC1piFDFomnuqODGDVfckZB0f0+LQ7rj9pImGcECEVx1p9O7aTgA675NTfCblqaXw878WldlAYhQARxKTbo2KwksBDOWRhGPNSUrB6ICtT9hM9KelVMZLuXtJatDBawkMuOH9B/0Ywq3FWEmMS1u0='
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.rsaPublicEncrypt.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.rsaPublicEncrypt',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.RSApublicEncrypt(args.DATA, args.PUBLIC),
            param: {
                PUBLIC: {
                    type: type.ParameterType.STRING,
                    default: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChMYFm7LgYg5gKtMwE3fwdcxA8nyT0niLeKsDPxyLdNvAK2MTX2SXnj//gkm0fFEN7dNGjH0fLtpk0P78ZTjSxPZ4cAIvkJfLvBC+VuAyI+xOkRLceUBXnOghtQRgzsew8KoBaUKAf97fEEqtX5f1W9RxcLSFpDYOdTwEE8JqmtQIDAQAB'
                }, DATA: {
                    type: type.ParameterType.STRING,
                    default: 'ClipCC YYDS!'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.rsaPublicDecrypt.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.rsaPublicDecrypt',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.RSApublicDecrypt(args.DATA, args.PUBLIC),
            param: {
                PUBLIC: {
                    type: type.ParameterType.STRING,
                    default: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChMYFm7LgYg5gKtMwE3fwdcxA8nyT0niLeKsDPxyLdNvAK2MTX2SXnj//gkm0fFEN7dNGjH0fLtpk0P78ZTjSxPZ4cAIvkJfLvBC+VuAyI+xOkRLceUBXnOghtQRgzsew8KoBaUKAf97fEEqtX5f1W9RxcLSFpDYOdTwEE8JqmtQIDAQAB'
                }, DATA: {
                    type: type.ParameterType.STRING,
                    default: 'MNHoDOYlA7nIdgbcxAgD2mOV3D/BfnCZubsuQVncPowKlOu9NNUl0p2LJgC6IU37HtZNhqLy80Rh+V/N80Grp7UajBzM9vtsdVkKZ0s/Kc/bo/jr3A4Isyd/x07drcUL87OgObAKzdICM+UbcFD8PiQqTfB84gp8cmudZzyAoQ0='
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.rsaPrivateEncrypt.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.rsaPrivateEncrypt',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.RSAprivateEncrypt(args.DATA, args.PRIVATE),
            param: {
                DATA: {
                    type: type.ParameterType.STRING,
                    default: 'ClipCC YYDS!'
                }, PRIVATE: {
                    type: type.ParameterType.STRING,
                    default: 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKExgWbsuBiDmAq0zATd/B1zEDyfJPSeIt4qwM/HIt028ArYxNfZJeeP/+CSbR8UQ3t00aMfR8u2mTQ/vxlONLE9nhwAi+Ql8u8EL5W4DIj7E6REtx5QFec6CG1BGDOx7DwqgFpQoB/3t8QSq1fl/Vb1HFwtIWkNg51PAQTwmqa1AgMBAAECgYASB/qkq8gwHdBNKkpEJRzFopBnZ5n3rxTRa1DkLS9uNW4GmJb0WjsOOyJxWY/RUS/3SGsG50HdvNBIcvUKfKASIYRuyWb/jlgWF3zF6g8y20oHVJ6+yIs1aBy9tmRRW1iBPRm613Dn0Fsiz4tbEDkCO6yxjAtuLziP/jnAZcpRZQJBAO2ENdLMibwxVzrvnw1ev9jzKp53idhP5ATK+IEawKGeDuf6YAICcZ6McCNqh+T5KQlygDyUk1TZubJNrG9JlEcCQQCtvMqQBTreQzOUfXqZ4NeJzxboR6Hm7L2ivqHK2WK7mAM6zp0iT6AgbPjWxK9VWJm688/4nhPSVryUJ28CfxcjAkA3t8Igl1bgTPrXmorHSijbLgAbeJNfqS4maa7uKmZyA3Afvz5yejxJI0zTIhSLBGA6FSA8FeaSCxli2JHQ8YPVAkBjKaR8O1/0SGsCT/RQK/MZ5yduAKS6B1ndr+zsuNMPu53sTM2HLed5WnlVLAHfNqjX+h00DBXIMlWEQlWsGRn9AkBe7I+TPIAgTVyZ6n+SHidD2QB0tZTpW8DuSgg8JXV8XV8T01wtRe92vbtIflrS2V1LwlucYSLe1w+5cldHHs34'
                }
            }
        });

        api.addBlock({
            opcode: 'jasonxu.crypto.rsaPrivateDecrypt.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.rsaPrivateDecrypt',
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.RSAprivateDecrypt(args.DATA, args.PRIVATE),
            param: {
                DATA: {
                    type: type.ParameterType.STRING,
                    default: 'MNHoDOYlA7nIdgbcxAgD2mOV3D/BfnCZubsuQVncPowKlOu9NNUl0p2LJgC6IU37HtZNhqLy80Rh+V/N80Grp7UajBzM9vtsdVkKZ0s/Kc/bo/jr3A4Isyd/x07drcUL87OgObAKzdICM+UbcFD8PiQqTfB84gp8cmudZzyAoQ0='
                }, PRIVATE: {
                    type: type.ParameterType.STRING,
                    default: 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKExgWbsuBiDmAq0zATd/B1zEDyfJPSeIt4qwM/HIt028ArYxNfZJeeP/+CSbR8UQ3t00aMfR8u2mTQ/vxlONLE9nhwAi+Ql8u8EL5W4DIj7E6REtx5QFec6CG1BGDOx7DwqgFpQoB/3t8QSq1fl/Vb1HFwtIWkNg51PAQTwmqa1AgMBAAECgYASB/qkq8gwHdBNKkpEJRzFopBnZ5n3rxTRa1DkLS9uNW4GmJb0WjsOOyJxWY/RUS/3SGsG50HdvNBIcvUKfKASIYRuyWb/jlgWF3zF6g8y20oHVJ6+yIs1aBy9tmRRW1iBPRm613Dn0Fsiz4tbEDkCO6yxjAtuLziP/jnAZcpRZQJBAO2ENdLMibwxVzrvnw1ev9jzKp53idhP5ATK+IEawKGeDuf6YAICcZ6McCNqh+T5KQlygDyUk1TZubJNrG9JlEcCQQCtvMqQBTreQzOUfXqZ4NeJzxboR6Hm7L2ivqHK2WK7mAM6zp0iT6AgbPjWxK9VWJm688/4nhPSVryUJ28CfxcjAkA3t8Igl1bgTPrXmorHSijbLgAbeJNfqS4maa7uKmZyA3Afvz5yejxJI0zTIhSLBGA6FSA8FeaSCxli2JHQ8YPVAkBjKaR8O1/0SGsCT/RQK/MZ5yduAKS6B1ndr+zsuNMPu53sTM2HLed5WnlVLAHfNqjX+h00DBXIMlWEQlWsGRn9AkBe7I+TPIAgTVyZ6n+SHidD2QB0tZTpW8DuSgg8JXV8XV8T01wtRe92vbtIflrS2V1LwlucYSLe1w+5cldHHs34'
                }
            }
        });
    }

    onUninit() {
        api.removeCategory('jasonxu.crypto.crypto');
    }
}

module.exports = CryptoExtension;