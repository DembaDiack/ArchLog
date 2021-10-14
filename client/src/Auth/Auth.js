import {AES} from "crypto-js";
import crypto from 'crypto-js';
import axios from "axios"
import Cookies from "universal-cookie";
const masterToken = "194be39923a6074ca705086f2f910a24";
class Auth
{
    
    constructor()
    {
        this.cookies = new Cookies();
        this.passPhrase = "ilikecookies";
        this.email = this.cookies.get("email");
        this.connected = false;
        this.userLevel = 1;
        return this;
    }
    isConnected()
    {
        return (this.cookies.get("email") != undefined);
    }
    setSession()
    {
        const encryptedEmail = AES.encrypt(this.email,this.passPhrase).toString();
        this.cookies.set("email",encryptedEmail);
        const level = this.getUser(this.email).level;
        this.userLevel = level;
        this.connected = true;
    }
    connect(email,password)
    {
        const encryptedPassword = AES.encrypt(password,this.passPhrase).toString();
        console.log(password,encryptedPassword);
        return axios.post("http://localhost:4000/user/login",{
            email : email,
            password : encryptedPassword
        })
        .then(result => {
            console.log(result);
            if(result.data == true)
            {
                this.email = email;
                this.setSession();
                return true;
            }
            else
            {
                return false;
            }
        })
        .catch(err => {
            console.log(err);
            return false;
        })
    }
    disconnect()
    {
        this.cookies.remove("email");
        this.connected = false;
        return this;
    }
    getEmail()
    {
        return AES.decrypt(this.email,this.passPhrase).toString(crypto.enc.Utf8);
    }
    matchTokenToEmail(token)
    {
        axios.post("http://localhost:4000/token/email",{
            token : masterToken,
            atoken : token
        })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    }
    getUser(email)
    {
        return axios.post("http://localhost:4000/user/email",{
            token : masterToken,
            email : email
        })
        .then(result => {   
            console.log(result);
            return result.data;
        })
        .catch(err => {
            return false;
        })
        
    }
    getToken()
    {
        console.log(this.getEmail());
        return axios.post("http://localhost:4000/token",{
            email : this.getEmail(),
            token : masterToken
        })
        .then(result => {
            return result.data.token;
        })
        .catch(err => {
            return err;
        })
    }
}
export default Auth;