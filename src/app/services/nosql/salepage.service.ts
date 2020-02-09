import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  Salepage,
  Codehtml,
  Member,
  Status,
  EmailEditor,
  SalePage
} from '@app/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SalepageService {
  constructor(
    private firestore: AngularFirestore,
    private route: Router,
    private storage: AngularFireStorage
  ) {}

  getDesign() {
    return this.firestore.collection('admin_design_page').snapshotChanges();
  }

  getHtml() {
    return this.firestore.collection('admin_html_page').snapshotChanges();
  }

  getMemberAll() {
    return this.firestore.collection('member').snapshotChanges();
  }

  getMemberUser() {
    return this.firestore.collection('member').snapshotChanges();
  }

  createMember(member: Member) {
    return this.firestore.collection('member').add(member);
  }

  updateMember(docid: string, member: Member) {
    this.firestore
      .doc('member/' + docid)
      .update({
        tel: member.tel,
        line: member.line,
        email: member.email,
        status: member.status
      })
      .then(() => {
        this.createSalePage({
          owner: member.username,
          design: '',
          html: '',
          link: `http://localhost:4200/user/salepage/${member.username}`
        });
        alert('Approve successfully');
      })
      .catch(err => alert(err));
  }
  updateDesign(design: Salepage) {
    this.firestore
      .doc('admin_design_page/BsBDEKqKe1c8sG6V1L2S')
      .update(design)
      .then(() => {
        alert('Save successfully');
      });
  }
  updateHtml(html: Codehtml) {
    this.firestore
      .doc('admin_html_page/HbFz5UvVcKj0kuTPTi0f')
      .update(html)
      .then(() => {
        alert('Publish successfully');
      });
  }
  // admin editor
  getAdminEditor(type: string) {
    switch (type) {
      case 'about_page':
        return this.firestore.collection('about_page').snapshotChanges();
      case 'contact_page':
        return this.firestore.collection('contact_page').snapshotChanges();
      case 'product_page':
        return this.firestore.collection('product_page').snapshotChanges();
      case 'service_page':
        return this.firestore.collection('service_page').snapshotChanges();
      default:
        break;
    }
  }
  getsalepageowner(owner: string) {
    return this.firestore.collection('sale_page', ref => ref.where('owner', '==', owner )).snapshotChanges();
  }
  updateAdminEditor(editor: EmailEditor, type: string) {
    switch (type) {
      case 'about_page':
        this.firestore
          .doc(`${type}/idm977wY6QtM9rs7mfl1`)
          .update(editor)
          .then(() => {
            alert('Publish About successfully');
          })
          .catch(err => console.log(err));
        break;
      case 'contact_page':
        this.firestore
          .doc(`${type}/DkgPIctPdahKM9h6sN7c`)
          .update(editor)
          .then(() => {
            alert('Publish Contact successfully');
          })
          .catch(err => console.log(err));
        break;
      case 'product_page':
        this.firestore
          .doc(`${type}/kRK89cz2xrNIuW1ZNj7k`)
          .update(editor)
          .then(() => {
            alert('Publish Product successfully');
          })
          .catch(err => console.log(err));
        break;
      case 'service_page':
        this.firestore
          .doc(`${type}/HJm7DwTEgoOmlRlJSH9y`)
          .update(editor)
          .then(() => {
            alert('Publish Service successfully');
          })
          .catch(err => console.log(err));
        break;
      default:
        break;
    }
  }

  // salepage
  async createSalePage(data: SalePage) {
    await this.firestore
      .collection('sale_page')
      .doc(data.owner)
      .set(data);
  }
  updateSalePageDesign(editor: EmailEditor, username: string) {
    this.firestore
      .doc(`sale_page/${username}`)
      .update(editor)
      .then(() => alert('Update Seal Page Successfully'))
      .catch(err => console.log(err));
  }
  getAllSalePage() {
    return this.firestore.collection('sale_page').snapshotChanges();
  }

  // Storage
  uploadFile(file: any) {
    this.storage
      .upload(`/salepagefile/${Date().toString()}`, file)
      .then(() => alert('Upload file Succfully'))
      .catch(err => console.log(err));
  }
}
