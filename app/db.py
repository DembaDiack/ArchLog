import requests
from tkinter.messagebox import showinfo
class Database:
    def __init__(self):
        self.url = "http://localhost:4000/"
        self.users = []
        self.token = "09b30d7f548a12e055c587b9233d4738"
        self.mastertoken = "09b30d7f548a12e055c587b9233d4738"
    def setToken(self,token):
        self.token = token
    def selectAllUsers(self):
        data = {"token" : self.token}
        url = self.url + "user/all"
        response = requests.post(url,data)
        for utt in response.json():
            self.users.append(utt)
        
    def createUttilisateur(self,email,mdp,niveau):
        print("hello")
        print(niveau)
        level = int(niveau)
        if level > 3 : 
            return
        data = {"token" :self.token,"email" : email,"password" : mdp,"level" : level }
        url = self.url + "user/create"
        response = requests.post(url,data)
        print(response.content)
    def deleteUser(self,email):
        data = {"token" :self.token,"email" : email}
        url = self.url + "user/delete"
        response = requests.post(url,data)
        print(response.content)
    def updateUser(self,u):
        data = {"token" :self.token,"user_data" : u}
        url = self.url + "user/edit"
        response = requests.post(url,data)
        print(response.json())
    def login(self,email,password):
        data = {"email" : email,"password" : password,"source" : "python"}
        print(data)
        url = self.url + "user/login"
        login_response = requests.post(url,data)
        if login_response.json() == True:
            data = {"email" : email,"token" : self.mastertoken}
            url = self.url + "token"
            response = requests.post(url,data)
            print(response.json()[0]["owner"]["level"])
            level = int(response.json()[0]["owner"]["level"])
            if(level < 3):
            
                showinfo("Window","vous netes pas admin!")
                return
            self.token = response.json()[0]["token"]
        return login_response.json()