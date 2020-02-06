import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Salepage , Codehtml, Member, Status} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class SalepageService {
  constructor(private firestore: AngularFirestore) {}

  getDesign() {
    return this.firestore.collection('admin_design_page').snapshotChanges();
  }

  getHtml() {
    return this.firestore.collection('admin_html_page').snapshotChanges();
  }

  getMemberAll() {
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
      .then(() => {alert('Approve successfully'); })
      .catch(err => alert(err));
  }
  updateDesign(design: Salepage) {
    this.firestore
      .doc('admin_design_page/BsBDEKqKe1c8sG6V1L2S')
      .update(design)
      .then(() => {alert('Save successfully'); });
  }
  updateHtml(html: Codehtml) {
    this.firestore
      .doc('admin_html_page/HbFz5UvVcKj0kuTPTi0f')
      .update(html)
      .then(() => {alert('Publish successfully'); });
  }
}
