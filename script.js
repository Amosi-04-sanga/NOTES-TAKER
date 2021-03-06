const inputHeader = document.getElementById('input-header');
const addNotes = document.getElementById('add-notes');
const notes = document.getElementById('notes');
const notesContainer = document.querySelector('.notes__container');


addNotes.addEventListener( 'click', placeNotes, false );

// message helpers.
const notesInputHelper = document.getElementById('notes__input-helper');    
const notesTextAreaHelper = document.getElementById('notes__textarea-helper');

// add messages on when DOM has loaded.
window.addEventListener( 'DOMContentLoaded', () => {
    
    notesInputHelper.textContent = notesInputHelper.dataset.helper;        
    notesTextAreaHelper.textContent = notesTextAreaHelper.dataset.helper;
    

});

// print message.
function printMessage() {

    if( notes.value === '' ) {

        notesTextAreaHelper.classList.add('active');

        // remove active class after 5 seconds.
        setTimeout( () => {
            notesTextAreaHelper.classList.remove('active');
        }, 5000 );
      
    }

    if( inputHeader.value === '' ) {

       notesInputHelper.classList.add('active');

       // remove active class after 5 seconds.
       setTimeout( () => {
          notesInputHelper.classList.remove('active');
       }, 5000 );

    }

}

// read more button.


// placeNotes function.
function placeNotes() {

    printMessage();

    // return if input is empty.
    if( inputHeader.value === '' || notes.value === '' ) return;

    // create elements for notes.
    let headingEl = document.createElement('h3');
    let paragEl = document.createElement('p');
    let notesDiv = document.createElement('div');

    // create text node.
    const headingElText = document.createTextNode( inputHeader.value );
    const paragElText = document.createTextNode( notes.value );

    // APPEND DATE.
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisDate = now.getDate();
    const thisMonth = now.getMonth();
    const thisHour = now.getHours();
    const thisMinute = now.getMinutes();

    const mounths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'sepmber', 'october', 'november', 'december'];
    const thisMonthTxt = mounths[thisMonth];

    // added on
    const addedEl = document.createElement('span');
    addedEl.className = 'notes__added-on';
    const addedOn = document.createTextNode('added on: ');
    addedEl.appendChild(addedOn);

    // date text.
    const dateSpan = document.createElement('span');
    dateSpan.className = 'notes__date-txt';
    const dateTxt = document.createTextNode( ` ${thisYear},${thisMonthTxt},${thisDate} ${thisHour}:${thisMinute}` );
    dateSpan.appendChild(dateTxt);


    // date fragment.
    const frag = new DocumentFragment();
    const dateParag = document.createElement('span');
    dateParag.className = 'notes__date';

    dateParag.append(addedEl)
    dateParag.append(dateSpan)


    // append elements into frag.
    frag.appendChild(dateParag);

    // date frag END. 

    // append text node to respective elements.
    headingEl.append( headingElText );
    paragEl.append( paragElText );

    // append heading and notes to container.
    notesDiv.append( frag );
    notesDiv.append( headingEl );
    notesDiv.append( paragEl );

    // name classes.
    headingEl.className = 'notes__heading';
    paragEl.className = 'notes__parag';
    notesDiv.className = 'notes__container-inner';


    
    // append notesDiv to .notes__container div.
    notesContainer.appendChild( notesDiv );

    if( notes.value.length > 100 ) {

            let fullNotes = paragEl.textContent.slice(0);
        
            let notesLess = paragEl.textContent.slice(0, 100) + '...';
            
            paragEl.textContent = notesLess;

            const btnFrag = new DocumentFragment();
            const btnEl = document.createElement('button');
            btnEl.textContent = 'read more';
            btnEl.className = 'notes__read-more';
            btnFrag.appendChild(btnEl);
       
            notesDiv.append( btnFrag ); 

            
            const readMoreButtons = document.querySelectorAll('.notes__read-more');
            const buttonsArr = Array.from(readMoreButtons);

            buttonsArr.forEach( btn => {
                btn.addEventListener( 'click', () => {

                if( btnEl.textContent === 'read more' ) {
                    paragEl.textContent = fullNotes;
                    btnEl.textContent = 'read less';
                }

                else {
                    btnEl.textContent = 'read more';
                    paragEl.textContent = notesLess;
                }
                
            });

    });

    }

    

    // clear input and textarea when add button is clicked.
    inputHeader.value = '';
    notes.value = '';


}

