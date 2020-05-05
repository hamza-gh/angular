import { Injectable } from '@angular/core';
import { Icontact } from '../../modales/Icontact';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    // 1 - create list of contact
    contacts : Array<Icontact> = [];

    // Get a reference to the database service
   database = firebase.database();
 
   i = 0;
   
 

  constructor() { }

    // add User firebase
    addContactOnFirebase(contact: Icontact): Promise<Icontact[]> {
      return new Promise((resolve, reject) => {
         this.database
          .ref(`contacts/${this.contacts.length}`)
          .set({
            nom: contact.noms,
            prenom: contact.prenom,
            email: contact.email,
            telephone: contact.telephone
          }).then(()=>{})
          .catch(()=>{
            reject("Erreur");
          });
        });
    }

    // add contact to list
  addContact(contact: Icontact): Array<Icontact> {
    this.contacts.push(contact);
    return this.contacts;
  }


  // get all contact firebase
  getContactsOnFirebase(): Promise<Array<Icontact>> {
    return new Promise((resolve, reject) => {
      this.database.ref("contacts").on(
        "child_added",
        (snapshot) => {
          let obj = snapshot.val();
          obj.id = snapshot.key;
          this.contacts.push(obj);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
   // update Contact firebase
   updateContactOnFirebase(contact: Icontact, id: number) {
    let update = {};
    update["/contacts/" + id] = contact;

    this.database.ref().update(update);
  }


  // delete Contact firebase
  deleteContact(id: number) {
    this.database.ref(`/contacts/${id}`).remove();
  }
  
  // delete Listtener
  deleteListener() {
    this.database.ref("contacts").on("child_removed", (child_removed) => {
      let i: number = 0;
      let continuer: boolean = true;
      do {
        if (Number(this.contacts[i].id) === Number(child_removed.key)) {
          console.log("dele");
          this.contacts.splice(i, 1);
          continuer = false;
        }
        ++i;
      } while (continuer && i < this.contacts.length);
    });
  }
// update Listtener
updateListener() {
  this.database.ref("contacts").on("child_changed", (child_change) => {
    let i: number = 0;
    let continuer: boolean = true;
    do {
      if (Number(this.contacts[i].id) === Number(child_change.key)) {
        console.log("dele");
        this.contacts[i].nom = child_change.val().firstname;
        this.contacts[i].prenom = child_change.val().lastname;
        this.contacts[i].email = child_change.val().email;
        this.contacts[i].telephone = child_change.val().phone;
        continuer = false;
      }
      ++i;
    } while (continuer && i < this.contacts.length);
  });
}
}
