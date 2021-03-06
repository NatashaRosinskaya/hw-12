class Contacts{
    constructor (){
        this.data = [];
    }

    add(data) {
        if (data.id == undefined) data.id = 0;

        let user = new User(data);

        let maxId = 0;
        this.data.forEach(user => {
            if (user.data.id != undefined) {
                if (maxId == undefined) maxId = +user.data.id;
                else if (maxId < +user.data.id) maxId = +user.data.id;
            }
        });

        maxId++;

        user.edit({id: maxId});

        this.data.push(user);         
                  

    }

   

    edit(id, data) {
        let user = this.data.filter(user => {
            return +user.data.id == +id;
        });

        if (user.length == 0) return;

        user = user[0];
        user.edit(data);
    }
    
    remove(id) {
        this.data = this.data.filter(user => {
            return +user.data.id != +id;
        });
    }
    get(){
        return this.data
    }
}

class User{
    constructor(obj){
        this.data = obj;         
    }

    edit(data){
        for (let key in data){
            if (this.data[key] != undefined) this.data[key] = data[key];
        }
    }

    get(){
        return this.data
    }
}

let contactBooks = new Contacts ()

/*contactBooks.add({
    id: 1,
    name: 'Maria',
    email: 'mari@gmail.com',
    address: 'Minsk',
    phone: '375256325878',
})

contactBooks.add({
    id: 2,
    name: 'Anna',
    email: 'ann@gmail.com',
    address: 'Moscow',
    phone: '375298526474',
})

contactBooks.add({
    id: 3,
    name: 'Helen',
    email: 'elena@gmail.com',
    address: 'Paris',
    phone: '375336589785',
})

contactBooks.add({
    id: 4,
    name: 'Alex',
    email: 'alex@gmail.com',
    address: 'Moscow',
    phone: '375296858845',
})

contactBooks.edit(4, {name: 'Alexandr'})

contactBooks.remove(2)
console.log(contactBooks)
*/
class ContactsApp extends Contacts{
    constructor (){
        super();

        this.init();
    }
 /*getStorage(){
        let getString = JSON.parse(localStorage.getItem('user'));
        getString.forEach((item) => {
            this.add(item.data);
        });  
    }*/

    setStorage(){
        localStorage.setItem('user', JSON.stringify(this.data)); 
    }


    init() {
       //getStorage()
        let contactsElem = document.createElement('div');
        contactsElem.classList.add('contacts');

        let contactTitle = document.createElement('h2')
        contactTitle.classList.add('title_contact')
        contactTitle.innerHTML="?????????? ??????????????????"

        let contactsForm = document.createElement('div');
        contactsForm.classList.add('contacts__form');

        this.contactsList = document.createElement('div');
        this.contactsList.classList.add('contacts__list');

        this.contactId = document.createElement('input');
        this.contactId.setAttribute('type', 'text'); 
        this.contactId.setAttribute('name', 'contact_id');
        this.contactId.setAttribute('placeholder', '???');

        this.contactName = document.createElement('input');
        this.contactName.setAttribute('type', 'text'); 
        this.contactName.setAttribute('name', 'contact_name');
        this.contactName.setAttribute('placeholder', '??????');

        this.contactEmail = document.createElement('input');
        this.contactEmail.setAttribute('type', 'email'); 
        this.contactEmail.setAttribute('name', 'contact_email');
        this.contactEmail.setAttribute('placeholder', 'Email');

        this.contactAddress = document.createElement('input');
        this.contactAddress.setAttribute('type', 'text'); 
        this.contactAddress.setAttribute('name', 'contact_address');
        this.contactAddress.setAttribute('placeholder', '??????????');

        this.contactPhone = document.createElement('input');
        this.contactPhone.setAttribute('type', 'tel'); 
        this.contactPhone.setAttribute('name', 'contact_phone');
        this.contactPhone.setAttribute('placeholder', '??????????????');

        let contactsBtnAdd = document.createElement('button');
        contactsBtnAdd.innerHTML = '?????????????????? ??????????????'

        contactsElem.appendChild(contactsForm);
        contactsForm.appendChild(contactTitle)
        contactsForm.appendChild(this.contactId)
        contactsForm.appendChild(this.contactName);
        contactsForm.appendChild(this.contactEmail);
        contactsForm.appendChild(this.contactAddress);
        contactsForm.appendChild(this.contactPhone);
        contactsForm.appendChild(contactsBtnAdd);
        contactsElem.appendChild(this.contactsList);
        document.body.appendChild(contactsElem);

        this.contactName.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.contactEmail.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.contactAddress.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.contactPhone.addEventListener('keyup', event => {
            this.onAdd(event);
        });


        contactsBtnAdd.addEventListener('click', event =>{
            this.onAdd(event);
        });
    }

    updateList() {
        this.contactsList.innerHTML = '';

        this.data.forEach((user, index) => {
            let contactsElem = document.createElement('div');
            contactsElem.classList.add('contacts__item');
            contactsElem.dataset.id = user.data.id

            let contactId = document.createElement('div');
            contactId.innerHTML = user.data.id;

            let contactH3 = document.createElement('h3');
            contactH3.innerHTML = user.data.name || '';
                     
            let contactP1 = document.createElement('div');
            contactP1.innerHTML = user.data.email;

            let contactP2 = document.createElement('div');
            contactP2.innerHTML = user.data.address;

            let contactP3 = document.createElement('div');
            contactP3.innerHTML = user.data.phone;

            this.contactsList.appendChild(contactsElem);
            const contactRemove = document.createElement('button');
            contactRemove.id = index;
            contactRemove.innerHTML = '??????????????';
            contactsElem.appendChild(contactRemove);
            contactRemove.classList.add('contacts__btn');

            const contactEdit = document.createElement('button');
            contactEdit.id = index;
            contactEdit.innerHTML = '??????????????????????????';
            contactsElem.appendChild(contactEdit);
            contactEdit.classList.add('contacts__btn');

            contactsElem.appendChild(contactH3);
            contactsElem.appendChild(contactId);           
            contactsElem.appendChild(contactP1);
            contactsElem.appendChild(contactP2);
            contactsElem.appendChild(contactP3);
            contactsElem.appendChild(contactEdit);
            contactsElem.appendChild(contactRemove);
            this.contactsList.appendChild(contactsElem);
            
            contactRemove.addEventListener('click', event =>{
                this.onRemove(event);
            });

            contactEdit.addEventListener('click', event =>{
                this.onEdit(event);
            });
        });
        this.setStorage()
    }

    onAdd(event) {

        if (event.type == 'keyup' && (event.ctrlKey != true || event.key != 'Enter')) return;
        if (this.contactId.value.length == 0) return;


        let data = {
            id: this.contactId.value,
            name: this.contactName.value,
            email: this.contactEmail.value,
            address: this.contactAddress.value,
            phone: this.contactPhone.value,
        }
        if (this.contactId.dataset.action === 'edit' && this.contactId.dataset.id) {
            this.edit(this.contactId.dataset.id, data);
            this.contactId.dataset.action = '';
            this.contactId.dataset.id = '';
        } else {
            this.add(data);
        }

        this.updateList();
        this.contactId.value = '';
        this.contactName.value = '';
        this.contactEmail.value = ''; 
        this.contactAddress.value = ''; 
        this.contactPhone.value = '';        
    }

    onRemove(event) {
        let parent = event.target.closest('.contacts__item');
        let id = parent.dataset.id;
        if (!id) return;
        this.remove(id);
        this.updateList();
    }

    onEdit(event){
        const parent = event.target.closest('.contacts__item')
        const id = parent.dataset.id;

        if (!id) return;

        let contact = this.data.find(contact =>{
            return contact.data.id == id;
        });

        this.contactId.value = contact.data.id;
        this.contactName.value = contact.data.name;
        this.contactEmail.value = contact.data.email;
        this.contactAddress.value = contact.data.address;
        this.contactPhone.value = contact.data.phone;

        this.contactId.dataset.action = 'edit';
        this.contactId.dataset.id = id;    
    }
    
}
//document.cookie = 'user=this.data; max-age=864000';
new ContactsApp()