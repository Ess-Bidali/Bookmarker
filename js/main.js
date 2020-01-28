//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//Save bookmark
function saveBookmark(event){
  //prevent form from submitting
  event.preventDefault();
  
  //get form values
  const siteName = document.getElementById('siteName').value;
  const siteUrl = document.getElementById('siteUrl').value;

  //validate input first
  if(!validateInput(siteName, siteUrl)){
    return false; //If input is false, stop saving bookmark function
  }

  //save into bookmark object
  const bookmark = {
    name: siteName,
    url: siteUrl
  };
  //Add bookmark to local storage
  addToStorage(bookmark);

  //display bookmarks
  showBookmarks();
  
  //reset input fields
  document.querySelector('#myForm').reset(); 
}

function validateInput(name, url){
  //check if any is blank
  if(!checkForBlanks(name,url)){
    return false;
  }
  //check for url format
  if(!checkUrl(url)){
    return false;
  }
  return true;
}

function checkForBlanks(name,url){
  if(!name || !url){
    alertMessage("Please input all fields");
    return false;
  }

  return true;
}

function checkUrl(url){
  
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!url.match(regex)){
    alertMessage('Please input a valid URL');
    return false;
  }
  return true;
}

function alertMessage(txt){
  
  const message = document.getElementById('message');
  message.style.display = "block";
  message.classList.add('bg-danger','text-white','p-2', 'mb-1');
  message.innerHTML = `${txt}`;
  setTimeout("closeMessage(message)", 3000); //put quotes around first parameter to keep it from being executed immediately
}

function closeMessage(message){
  message.style.display = "none";
}



function updateStorage(bookmarks){
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function addToStorage(bookmark){

  //create bookmarks array if it doesn't already exist
  if(localStorage.getItem('bookmarks') === null){
    createBookmarksList();
  } 

  //Get bookmarks array from local storage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Add to bookmarks list
  bookmarks.push(bookmark);
  updateStorage(bookmarks);

}

function createBookmarksList(){
  const bookmarks = [];
  //Add bookmark list to local storage
  updateStorage(bookmarks);
}

function deleteBookmark(nameToRemove){
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  
  if(bookmarks !== null){
    for(let i=0; i<bookmarks.length;i++){
      let name = bookmarks[i].name;
      let url = bookmarks[i].url;
      
      if(bookmarks[i].name === nameToRemove){
        bookmarks.splice(i,1);
        break;
      }
    }
  }
  updateStorage(bookmarks);
  showBookmarks();

}

function showBookmarks(){
  const bookmarkResults = document.getElementById('bookmarkResults');
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //output to html
  bookmarkResults.innerHTML = '';

  if(bookmarks !== null){
    for(let i=0; i<bookmarks.length;i++){
      let name = bookmarks[i].name;
      let url = bookmarks[i].url;

      bookmarkResults.innerHTML += 
      '<div class="card card-body bg-light mt-3">' +
      `<h3>${name} </h3>` +
      '<div id="buttons">' +
      ' <a class="btn btn-secondary" target="_blank" href="'+url+'">Visit</a>' +
      ' <a class="btn btn-danger"  onclick="deleteBookmark(\''+ name+ '\')">Delete</a>' +
      '</div>' +
      '</div>';
    }
  }
  
}

