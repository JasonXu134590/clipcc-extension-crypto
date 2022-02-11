const { Extension, type, api } = require('clipcc-extension');
const crypto = require('crypto');
global.Buffer = global.Buffer || require('buffer').Buffer;

class CryptoExtension extends Extension {
    md5(str){
        return crypto.createHash('md5').update(str).digest('hex').toUpperCase();
    }
    sha1(str){
        return crypto.createHash('sha1').update(str).digest('hex').toUpperCase();
    }
    sha256(str){
        return crypto.createHash('sha256').update(str).digest('hex').toUpperCase();
    }
    sha512(str){
        return crypto.createHash('sha512').update(str).digest('hex').toUpperCase();
    }
    /*sha224(str){

    }*/
    aesEncrypt(data, key, type) { //aes192
        try{
            const cipher = crypto.createCipher(type, key);
            var crypted = cipher.update(data, 'utf8', 'hex');
            crypted += cipher.final('hex');
            return crypted;
        }catch(err){
            console.error(err);
            return "Failed";
        }
    }
    
    aesDecrypt(encrypted, key, type) {
        try{
            const decipher = crypto.createDecipher(type, key);
            var decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }catch(err){
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
            opcode: 'jasonxu.crypto.aesEny.opcode',
            type: type.BlockType.REPORTER,
            messageId: 'jasonxu.crypto.aesEny', 
            categoryId: 'jasonxu.crypto.crypto',
            function: args => this.aesEncrypt(args.THING,args.KEY,args.TYPE),
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
            function: args => this.aesDecrypt(args.THING,args.KEY,args.TYPE),
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
    }
    
    onUninit(){
        api.removeCategory('jasonxu.crypto.crypto');
    }
}     

module.exports = CryptoExtension;
