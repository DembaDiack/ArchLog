from tkinter import *
from db import Database
import json
from tkinter.messagebox import showinfo
db = Database()
db.selectAllUsers()

def populate_list():
    parts_list.delete(0,END)
    for user in db.users :
        print(user)
        parts_list.insert(END,user)
    #for row in db.selectAllUsers() :
       #parts_list.insert(END, row)

def add_item():
    fEmail = Email.get()
    fMDP = MDP.get()
    fNiveau = Niveau.get()
    db.createUttilisateur(fEmail,fMDP,fNiveau)
    populate_list()

def sup_item():
    print(Email.get())
    db.deleteUser(Email.get())
    showinfo("Window","uttlisateur supprime!")
    populate_list()

def update():
    populate_list()
    print(1)
    root.after(1000, update)
    


def select_item(event):
    global select_item
    index = parts_list.curselection()[0]
    selected_item = parts_list.get(index)
    
    global formated
    formated = json.loads(selected_item.replace("\'", "\""))
    Email_entry.delete(0,END)
    Email_entry.insert(END,formated["email"])
    MDP_entry.delete(0,END)
    MDP_entry.insert(END,formated["password"])
    Niveau_entry.delete(0,END)
    Niveau_entry.insert(END,int(formated["level"]))
def Modifier():
    print(formated)
    user = {
        "find" : formated["email"],
        "email" : Email.get(),
        "password" : MDP.get(),
        "level" : Niveau.get()
    }
    json_dump = json.dumps(user)
    print(json_dump)
    db.updateUser(json_dump)
    showinfo("Window","uttlisateur modifie!")
    populate_list()
#creation d'objet window
root = Tk()

#Partie1
Email = StringVar()
#nom de la premiere ligne et sa forme de police
Email_label = Label(root, text='Email :', font=('bold', 14), pady=20)
Email_label.grid(row=0, column=0, sticky=W)
Email_entry = Entry(root, textvariable=Email)
Email_entry.grid(row=0, column=1)

#Clients
MDP = StringVar()
#nom de la premiere ligne et sa forme de police
MDP_label = Label(root, text='MDP :', font=('bold', 14))
MDP_label.grid(row=0, column=2, sticky=W)
MDP_entry = Entry(root, textvariable=MDP)
MDP_entry.grid(row=0, column=3)

#Detaille
Niveau = StringVar()
#nom de la premiere ligne et sa forme de police
Niveau_label = Label(root, text='Niveau :', font=('bold', 14))
Niveau_label.grid(row=1, column=0, sticky=W)
Niveau_entry = Entry(root, textvariable=Niveau)
Niveau_entry.grid(row=1, column=1)


#Listes des detailles
parts_list = Listbox(root, height=8, width=50, border=0)
parts_list.grid(row=3, column=0, columnspan=3, rowspan=6, pady=20, padx=20)

#barre defillement
Scrollbar = Scrollbar(root)
Scrollbar.grid(row=3, column=3)

#listes deroulant
parts_list.configure(yscrollcommand=Scrollbar.set)
Scrollbar.configure(command=parts_list.yview)
parts_list.bind("<<ListboxSelect>>",select_item)
#boutons
add_btn = Button(root, text='ajouter', width=12, command=add_item)
add_btn.grid(row=2, column=0, pady=20)

sup_btn = Button(root, text='Remove', width=12, command=sup_item)
sup_btn.grid(row=2, column=1)

ajour_btn = Button(root, text='actualiser', width=12, command=update)
ajour_btn.grid(row=2, column=2)

mod_btn = Button(root, text='Modifier', width=12, command=Modifier)
mod_btn.grid(row=2, column=3)

#titre de l'application
root.title('murphy')

#taille de la fenetre sous windows
root.geometry('700x350')

#donnee
#populate_list()
populate_list()

# Debut programme