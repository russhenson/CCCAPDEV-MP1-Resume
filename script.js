
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
    var aboutMeRef = db.collection("about-me").doc("about-me");
    var aboutMeTextarea = document.getElementById("about-me-input");

    /*
    document.getElementById("about-me-save").disabled = true;
    aboutMeTextarea.addEventListener("input", (Event) => {
        document.getElementById("about-me-save").disabled = false;
    });
    */

    
    aboutMeRef.onSnapshot(function(doc){
        if(doc.data().description === aboutMeTextarea.value){
            document.getElementById("about-me-save").disabled = true;
        }
        else {

            document.getElementById("about-me-save").disabled = false;
        }

    });
    
    console.log(aboutMeTextarea.value);

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


//render education list
function getEducList() {
    
    db.collection("education").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            for(var i = 0;  i < (doc.data().educlist.length); i++){
                var educList = document.createElement("li");
                var educItem = document.createElement("input");
                var deleteBtn = document.createElement("button");
                var deleteIcon = document.createElement("img");
                var addBtn = document.createElement("button");
                var addIcon = document.createElement("img");

                educList.className = "educ-list";
                educItem.className = "educ-item";
                deleteBtn.className = "btn float-right list-delete-btn";
                addBtn.className = "btn float-right list-check-btn";

                educItem.type = "text";

                deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
                addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

                educList.appendChild(educItem);
                educList.appendChild(deleteBtn);
                educList.appendChild(addBtn);

                deleteBtn.appendChild(deleteIcon);
                addBtn.appendChild(addIcon);

                document.getElementById("educ-list-container").appendChild(educList);

                educItem.value = doc.data().educlist[i];
            }
                     
        });
    });
    
}



//render organizations list
function getOrgList() {
    db.collection("organizations").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            for(var i = 0;  i < (doc.data().orglist.length); i++){
                var orgList = document.createElement("li");
                var orgItem = document.createElement("input");
                var deleteBtn = document.createElement("button");
                var deleteIcon = document.createElement("img");
                var addBtn = document.createElement("button");
                var addIcon = document.createElement("img");

                orgList.className = "org-list";
                orgItem.className = "org-item";
                deleteBtn.className = "btn float-right list-delete-btn";
                addBtn.className = "btn float-right list-check-btn";

                orgItem.type = "text";

                deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
                addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

                orgList.appendChild(orgItem);
                orgList.appendChild(deleteBtn);
                orgList.appendChild(addBtn);

                deleteBtn.appendChild(deleteIcon);
                addBtn.appendChild(addIcon);

                document.getElementById("org-list-container").appendChild(orgList);

                orgItem.value = doc.data().orglist[i];
            }
                     
        });
    });
    
}


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

function getArtTools() {

    var skillsRef = db.collection("skills").doc("artist");

    skillsRef.onSnapshot(function(doc){
        for(var i = 0;  i < (doc.data().arttool.length); i++){
            var artTool = document.createElement("li");
            var artItem = document.createElement("input");
            var deleteBtn = document.createElement("button");
            var deleteIcon = document.createElement("img");
            var addBtn = document.createElement("button");
            var addIcon = document.createElement("img");

            artTool.className = "tool";
            artItem.className = "art-item";
            deleteBtn.className = "btn float-right delete-btn";
            addBtn.className = "btn float-right check-btn";

            artItem.type = "text";

            deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
            addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

            artTool.appendChild(artItem);
            artTool.appendChild(deleteBtn);
            artTool.appendChild(addBtn);

            deleteBtn.appendChild(deleteIcon);
            addBtn.appendChild(addIcon);

            document.getElementById("artist-tools").appendChild(artTool);

            artItem.value = doc.data().arttool[i];
        }
    });

}

function getDevTools() {
    var skillsRef = db.collection("skills").doc("frontend");

    skillsRef.onSnapshot(function(doc){
        for(var i = 0;  i < (doc.data().devtool.length); i++){
            var devTool = document.createElement("li");
            var devItem = document.createElement("input");
            var deleteBtn = document.createElement("button");
            var deleteIcon = document.createElement("img");
            var addBtn = document.createElement("button");
            var addIcon = document.createElement("img");

            devTool.className = "tool";
            devItem.className = "dev-item";
            deleteBtn.className = "btn float-right delete-btn";
            addBtn.className = "btn float-right check-btn";

            devItem.type = "text";

            deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
            addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

            devTool.appendChild(devItem);
            devTool.appendChild(deleteBtn);
            devTool.appendChild(addBtn);

            deleteBtn.appendChild(deleteIcon);
            addBtn.appendChild(addIcon);

            document.getElementById("frontend-tools").appendChild(devTool);

            devItem.value = doc.data().devtool[i];
        }
    });
}

function getEntreTools() {
    var skillsRef = db.collection("skills").doc("entrepreneur");

    skillsRef.onSnapshot(function(doc){
        for(var i = 0;  i < (doc.data().entretool.length); i++){
            var entreTool = document.createElement("li");
            var entreItem = document.createElement("input");
            var deleteBtn = document.createElement("button");
            var deleteIcon = document.createElement("img");
            var addBtn = document.createElement("button");
            var addIcon = document.createElement("img");

            entreTool.className = "tool";
            entreItem.className = "entre-item";
            deleteBtn.className = "btn float-right delete-btn";
            addBtn.className = "btn float-right check-btn";

            entreItem.type = "text";

            deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
            addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

            entreTool.appendChild(entreItem);
            entreTool.appendChild(deleteBtn);
            entreTool.appendChild(addBtn);

            deleteBtn.appendChild(deleteIcon);
            addBtn.appendChild(addIcon);

            document.getElementById("entre-tools").appendChild(entreTool);

            entreItem.value = doc.data().entretool[i];
        }
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
getEducList();
getOrgList();
getArtTools();
getDevTools();
getEntreTools();
saveAboutMe();