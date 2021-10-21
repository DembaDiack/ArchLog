from tkinter import * #Imports Tkinter
import sys #Imports sys, used to end the program later
from Projet import *
top = Toplevel() #Creates the toplevel window

entry1 = Entry(top) #Username entry
entry2 = Entry(top) #Password entry
button1 = Button(top, text="Login", command=lambda:command1()) #Login button
button2 = Button(top, text="Cancel", command=lambda:command2()) #Cancel button
label1 = Label(root, text="This is your main window and you can input anything you want here")

def command1():
    
    if db.login(entry1.get(),entry2.get()) == True: #Checks whether username and password are correct
        root.deiconify() #Unhides the root window
        top.destroy() #Removes the toplevel window
    else:
        showinfo("window","erreur dauthentification!")

def command2():
    top.destroy() #Removes the toplevel window
    root.destroy() #Removes the hidden root window
    sys.exit() #Ends the script


entry1.grid() #These grid the elements, this includes the items for the main window
entry2.grid()
button1.grid()
button2.grid()
label1.grid()

root.withdraw() #This hides the main window, it's still present it just can't be seen or interacted with
root.after(1000,update)
root.mainloop() #Starts the event loop for the main window