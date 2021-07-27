  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBKBkDnVYGvNSyM_mgAuocdDMn7AAf4XkI",
    authDomain: "bookmytrain-b90c5.firebaseapp.com",
    databaseURL: "https://bookmytrain-b90c5-default-rtdb.firebaseio.com",
    projectId: "bookmytrain-b90c5",
    storageBucket: "bookmytrain-b90c5.appspot.com",
    messagingSenderId: "249843266491",
    appId: "1:249843266491:web:823f281328525712b44a9e",
    measurementId: "G-VPJJLRHTK5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const addUserDetail = document.querySelector('.addUsers');
const addUsersForm = document.querySelector('.addUsers .form');
const editUserDetail = document.querySelector('.editUsers');
const editUserDetailForm = document.querySelector('.editUsers .form');

const btnAdd = document.querySelector('.addButton');
const tableUsers = document.querySelector('.nameDetails');

let id;
const renderUser = doc => {
  // const tr = `
  //   <tr data-id='${doc.id}'>
  //     <td>${doc.data().fullName}</td>
  //     <td>${doc.data().phone}</td>
  //     <td>${doc.data().from}</td>
  //     <td>${doc.data().to}</td>
  //     <td>${doc.data().class}</td>
  //     <td>${doc.data().date}</td>
  //     <td>
  //       <button class="btn btn-edit">Edit</button>
  //       <button class="btn btn-delete">Cancel</button>
  //     </td>
  //   </tr>
  // `;
  tableUsers.insertAdjacentHTML('beforeend', tr);

  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    id = doc.id;
    editUserDetailForm.fullName.value = doc.data().fullName;
    editUserDetailForm.phone.value = doc.data().phone;
    editUserDetailForm.from.value = doc.data().from;
    editUserDetailForm.to.value = doc.data().to;
    editUserDetailForm.class.value = doc.data().class;
    editUserDetailForm.date.value = doc.data().date;

  });

  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('users').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

btnAdd.addEventListener('click', () => {
  addUsersForm.fullName.value = '';
  addUsersForm.phone.value = '';
  addUsersForm.from.value = '';
  addUsersForm.to.value = '';
  addUsersForm.class.value = '';
  addUsersForm.date.value = '';
});

db.collection('users').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

addUsersForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').add({
    fullName: addUsersForm.fullName.value,
    phone: addUsersForm.phone.value,
    from: addUsersForm.from.value,
    to: addUsersForm.to.value,
    class: addUsersForm.class.value,
    date: addUsersForm.date.value,
  });
});

// Click submit in edit modal
editUserDetailForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').doc(id).update({
    fullName: editUserDetailForm.fullName.value,
    phone: editUserDetailForm.phone.value,
    from: editUserDetailForm.from.value,
    to: editUserDetailForm.to.value,
    class: editUserDetailForm.class.value,
    date: editUserDetailForm.date.value,
  });  
});