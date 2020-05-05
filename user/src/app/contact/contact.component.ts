import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Icontact } from 'src/modales/Icontact';
import { Router } from '@angular/router';

import { ContactService } from '../../services/manage-contact/contactM.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // contactform
  contactForm:FormGroup;

  // abstract 
  noms:AbstractControl;
  prenom:AbstractControl;
  email:AbstractControl;
  telephone:AbstractControl;

  //interface

  contactI:Icontact;

  constructor(private formBuilder:FormBuilder) { 
    this.contactForm=this.formBuilder.group({
      nom:[null ,[Validators.required]],
      prenom:[null ,[Validators.required]],
      email:[null ,[Validators.required,Validators.email]],
      telephone : [null,[Validators.required,Validators.minLength(6)]],
    });
    this.noms=this.contactForm.controls.nom;
    this.prenom=this.contactForm.controls.prenom;
    this.email=this.contactForm.controls.email;
    this.telephone=this.contactForm.controls.password;
  }
        // liste des contacts
        contacts: Array<Icontact>;

        //id pour pointer a chaque contact avec un  numero
        id = 0;


       key=[];
       ngOnInit(): void {

        this.contacts = [];
        this.key = [];
        console.log("ngOninit");
        this.contactM.isAuthenticated().then(async (uid: string) => {
          this.contactM.getContactsOnFirebase().then(() => {});
          this.contacts = this.contactM.contacts;
          this.contactM.deleteListener();
          this.contactM.updateListener();
        });
        
    
    
      }
      
  onSubmit(){
    this.contacts = {
      nom: this.contactForm.value.nom,
      prenom: this.contactForm.value.prenom,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone
    };
  
    this.contactM.addContactOnFirebase(this.contacts);


}
