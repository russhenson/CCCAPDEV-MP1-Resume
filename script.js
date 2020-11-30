
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

    aboutMeRef.onSnapshot(function(doc) {
        aboutMeTextarea.innerHTML = doc.data().description;
    });
        
}

function saveAboutMe() {
    var aboutMeRef = db.collection("about-me").doc("about-me");
    var aboutMeTextarea = document.getElementById("about-me-input");
    var saveBtn = document.getElementById("about-me-save");

    
    saveBtn.disabled = true;
    aboutMeTextarea.addEventListener("input", (Event) => {
        saveBtn.disabled = false;

        saveBtn.addEventListener("click", (Event) => {
            aboutMeRef.update({
                description: aboutMeTextarea.value
            })
            .then(function() {
                location.reload();
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        });

    });  

}


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

//add education
function addEducation() {
    var educRef = db.collection("education").doc("education");
    var educInput = document.getElementById("educ-input");
    var addBtn = document.getElementById("educ-add-btn");

    addBtn.addEventListener("click", (Event) => {
        educRef.update({
            educlist: firebase.firestore.FieldValue.arrayUnion(educInput.value)
        })
        .then(function() {
            location.reload();
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
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

//add Org
function addOrg() {
    var orgRef = db.collection("organizations").doc("organizations");
    var orgInput = document.getElementById("org-input");
    var addBtn = document.getElementById("org-add-btn");

    addBtn.addEventListener("click", (Event) => {
        orgRef.update({
            orglist: firebase.firestore.FieldValue.arrayUnion(orgInput.value)
        })
        .then(function() {
            location.reload();
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
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
        artistListInput.innerHTML = doc.data().create;
    });

}

function getFrontEndContent() {
    var frontEndRef = db.collection("skills").doc("frontend");
    var frontEndTextArea = document.getElementById("frontend-skill-desc");
    var frontEndListInput = document.getElementById("frontend-list");

    frontEndRef.onSnapshot(function(doc){
        frontEndTextArea.innerHTML = doc.data().description;
        frontEndListInput.innerHTML = doc.data().speak;
    });

}

function getEntreContent() {
    var entreRef = db.collection("skills").doc("entrepreneur");
    var entreTextArea = document.getElementById("entre-skill-desc");
    var entreListInput = document.getElementById("entre-list");

    entreRef.onSnapshot(function(doc){
        entreTextArea.innerHTML = doc.data().description;
        entreListInput.innerHTML = doc.data().start;
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

// add art tools
function addArtTools() {
    var artRef = db.collection("skills").doc("artist");
    var artInput = document.getElementById("art-tools-input");
    var addBtn = document.getElementById("artist-add-btn");

    addBtn.addEventListener("click", (Event) => {
        artRef.update({
            arttool: firebase.firestore.FieldValue.arrayUnion(artInput.value)
        })
        .then(function() {
            location.reload();
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
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

function addDevTools() {
    var devRef = db.collection("skills").doc("frontend");
    var devInput = document.getElementById("dev-tools-input");
    var addBtn = document.getElementById("frontend-add-btn");

    addBtn.addEventListener("click", (Event) => {
        devRef.update({
            devtool: firebase.firestore.FieldValue.arrayUnion(devInput.value)
        })
        .then(function() {
            location.reload();
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
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


function addEntreTools() {
    var entreRef = db.collection("skills").doc("entrepreneur");
    var entreInput = document.getElementById("entre-tools-input");
    var addBtn = document.getElementById("entre-add-btn");

    addBtn.addEventListener("click", (Event) => {
        entreRef.update({
            entretool: firebase.firestore.FieldValue.arrayUnion(entreInput.value)
        })
        .then(function() {
            location.reload();
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    });
}

//saVe skills
function saveSkill() {
    var artistRef = db.collection("skills").doc("artist");
    var frontEndRef = db.collection("skills").doc("frontend");
    var entreRef = db.collection("skills").doc("entrepreneur");

    var artistSkillDesc = document.getElementById("artist-skill-desc");
    var frontendSkillDesc = document.getElementById("frontend-skill-desc");
    var entreSkillDesc = document.getElementById("entre-skill-desc");

    var artistList = document.getElementById("artist-list");
    var frontendList = document.getElementById("frontend-list");
    var entreList = document.getElementById("entre-list");

    var saveBtn = document.getElementById("skills-save-btn");

    
    saveBtn.disabled = true;
    
    var inputs = [artistSkillDesc, frontendSkillDesc, entreSkillDesc, artistList, frontendList, entreList];
    
    inputs.forEach(function(element){
        element.addEventListener("input", function(){
            saveBtn.disabled = false;

            saveBtn.addEventListener("click", (Event) => {
                artistRef.update({
                    description: artistSkillDesc.value,
                    create: artistList.value
                })
                .then(function() {
                    location.reload();
                });
                
                frontEndRef.update({
                    description: frontendSkillDesc.value,
                    speak: frontendList.value
                })
                .then(function() {
                    location.reload();
                });

                entreRef.update({
                    description: entreSkillDesc.value,
                    start: entreList.value
                })
                .then(function() {
                    location.reload();
                });
                

            });
            

        })
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
addEducation();
addOrg();
addArtTools();
addDevTools();
addEntreTools();
saveSkill();