
function login() {
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .then((user) => {
            // Signed in 
            // ...
            window.location = "/CCCAPDEV-MP1-Resume/dashboard.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            const errorMsg = document.getElementById("errorMsg");

            errorMsg.innerHTML = errorMessage;
    });
    

}

var db = firebase.firestore();

// getAboutMe - renders data from firebase to the textarea box
function getAboutMe() {
    
    var aboutMeRef = db.collection("about-me").doc("about-me");
    var aboutMeTextarea = document.getElementById("about-me-input");

    
    // aboutMeRef.get().then(function(doc) {
        
    //     aboutMeTextarea.innerHTML = doc.data().description;

    // });

    aboutMeRef.onSnapshot(function(doc) {
        aboutMeTextarea.innerHTML = doc.data().description;
    });
        
}

function saveAboutMe() {

}

/*
saveAboutMe
- check if about-me data was changed
- if yes:
    - unable save button
    - place data in the firebase
    - render the new data in the textareabox (getAboutMe func)

- if no:
    - disable save button

*/



//render skills content
function getArtistContent() {

    var artistRef = db.collection("skills").doc("artist");
    var artistTextArea = document.getElementById("artist-skill-desc");
    var artistListInput = document.getElementById("artist-list");

    artistRef.onSnapshot(function(doc) {
        artistTextArea.innerHTML = doc.data().description;
        artistListInput.value = doc.data().create;
    });

}

function getFrontEndContent() {
    var frontEndRef = db.collection("skills").doc("frontend");
    var frontEndTextArea = document.getElementById("frontend-skill-desc");
    var frontEndListInput = document.getElementById("frontend-list");

    frontEndRef.onSnapshot(function(doc){
        frontEndTextArea.innerHTML = doc.data().description;
        frontEndListInput.value = doc.data().speak;
    });

}

function getEntreContent() {
    var entreRef = db.collection("skills").doc("entrepreneur");
    var entreTextArea = document.getElementById("entre-skill-desc");
    var entreListInput = document.getElementById("entre-list");

    entreRef.onSnapshot(function(doc){
        entreTextArea.innerHTML = doc.data().description;
        entreListInput.value = doc.data().start;
    });
}



//render links
function getLinks() {
    var linkRef = db.collection("links").doc("links");
    var fbLink = document.getElementById("fblink");
    var twitterLink = document.getElementById("twitterlink");
    var githubLink = document.getElementById("githublink");
    var linkedinLink = document.getElementById("linkedinlink");

    linkRef.onSnapshot(function(doc){
        fbLink.value = doc.data().fb;
        twitterLink.value = doc.data().twitter;
        githubLink.value = doc.data().github;
        linkedinLink.value = doc.data().linkedin;
    });

}



// main
getAboutMe();
getArtistContent();
getFrontEndContent();
getEntreContent();
getLinks();

