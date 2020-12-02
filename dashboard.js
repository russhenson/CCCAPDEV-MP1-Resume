
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
                educItem.id = "educ-item"+i;

                educList.id = "educ-list"+i;

                deleteBtn.id = "educ-delete"+i;
                addBtn.id = "educ-add"+i;

                deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
                addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

                deleteBtn.setAttribute("onclick", "removeEducation(this.parentNode.id);");
                addBtn.setAttribute("onclick", "saveEditedEduc(this.parentElement.firstChild.id);");
                educItem.setAttribute("oninput", "editEducation(this.id);");

                addBtn.disabled = true;

                educList.appendChild(educItem);
                educList.appendChild(deleteBtn);
                educList.appendChild(addBtn);

                deleteBtn.appendChild(deleteIcon);
                deleteBtn.type = "submit";
                addBtn.appendChild(addIcon);
                addBtn.type = "submit";

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


    addBtn.disabled = true;
    educInput.addEventListener("input", (Event) => {

        addBtn.disabled = false;
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
    });

    
}

//edit education
function editEducation(educInputID) {
    var addBtn = document.getElementById("educ-add"+educInputID[educInputID.length-1]);

    addBtn.disabled = false;
}

//save edited education
function saveEditedEduc(educInputID){
    var educRef = db.collection("education").doc("education");
    var educInput = document.getElementById(educInputID);
    
    var index = educInputID[educInputID.length-1];

    
    educRef.onSnapshot(function(doc){
        var tempArr = [];
        for(var i = 0; i < (doc.data().educlist.length); i++){
            tempArr.push(doc.data().educlist[i]);

        }

        tempArr[index] = educInput.value;
        //console.log("within snapshot: "+tempArr.toString());

        educRef.set({
            educlist: tempArr
        })
        .then(function() {
            location.reload();
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    });
    


    //console.log("after snapshot: "+tempArr.toString());

}
    


//remove education
function removeEducation(educListID) {
    var educRef = db.collection("education").doc("education");

    educRef.onSnapshot(function(doc){
        var inputIndex = educListID[educListID.length - 1];
        var educInput = document.getElementById("educ-item"+inputIndex);
        var educList = document.getElementById(educListID);
        educList.remove();

        console.log(educListID);
        console.log(inputIndex);

        educRef.update({
            educlist: firebase.firestore.FieldValue.arrayRemove(educInput.value)
        })
        
        

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
                orgItem.id = "org-item"+i;

                orgList.id = "org-list"+i;

                deleteBtn.id = "org-delete"+i;
                addBtn.id = "org-add"+i;

                deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
                addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

                deleteBtn.setAttribute("onclick", "removeOrg(this.parentNode.id);");
                addBtn.setAttribute("onclick", "saveEditedOrg(this.parentElement.firstChild.id);");
                orgItem.setAttribute("oninput", "editOrg(this.id);");

                addBtn.disabled = true;

                orgList.appendChild(orgItem);
                orgList.appendChild(deleteBtn);
                orgList.appendChild(addBtn);

                deleteBtn.appendChild(deleteIcon);
                deleteBtn.type = "submit";
                addBtn.appendChild(addIcon);
                addBtn.type = "submit";

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

    addBtn.disabled = true;
    orgInput.addEventListener("input", (Event) => {

        addBtn.disabled = false;
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
    });
}

//edit org
function editOrg(orgInputID) {
    var addBtn = document.getElementById("org-add"+orgInputID[orgInputID.length-1]);

    addBtn.disabled = false;
}

//save edited org
function saveEditedOrg(orgInputID) {
    var orgRef = db.collection("organizations").doc("organizations");
    var orgInput = document.getElementById(orgInputID);
    var index = orgInputID[orgInputID.length-1];

    orgRef.onSnapshot(function(doc){
        var tempArr = [];

        for(var i = 0; i < doc.data().orglist.length; i++){
            tempArr.push(doc.data().orglist[i]);
        }

        tempArr[index] = orgInput.value;

        orgRef.set({
            orglist: tempArr
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

//remove org
function removeOrg(orgListID) {
    var orgRef = db.collection("organizations").doc("organizations");

    orgRef.onSnapshot(function(doc){
        var inputIndex = orgListID[orgListID.length-1];
        var orgInput = document.getElementById("org-item"+inputIndex);
        var orgList = document.getElementById(orgListID);
        orgList.remove();

        orgRef.update({
            orglist: firebase.firestore.FieldValue.arrayRemove(orgInput.value)
        })
        

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
            artItem.id = "art-item"+i;

            artTool.id = "arttool"+i;

            deleteBtn.id = "art-delete"+i;
            addBtn.id = "art-add"+i;

            deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
            addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

            deleteBtn.setAttribute("onclick", "removeArtTool(this.parentNode.id);");
            addBtn.setAttribute("onclick", "saveEditedArtTool(this.parentElement.firstChild.id);");
            artItem.setAttribute("oninput", "editArtTool(this.id);");

            addBtn.disabled = true;

            artTool.appendChild(artItem);
            artTool.appendChild(deleteBtn);
            artTool.appendChild(addBtn);

            deleteBtn.appendChild(deleteIcon);
            deleteBtn.type = "submit";
            addBtn.appendChild(addIcon);
            addBtn.type = "submit";

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

    addBtn.disabled = true;

    artInput.addEventListener("input", (Event) => {
        addBtn.disabled = false;
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
    });

    
}

//edit art tools
function editArtTool(artToolInputID) {
    var addBtn = document.getElementById("art-add"+artToolInputID[artToolInputID.length-1]);

    addBtn.disabled = false;
}

//save edited art tools
function saveEditedArtTool(artToolInputID) {
    var artRef = db.collection("skills").doc("artist");
    var artInput = document.getElementById(artToolInputID);
    var index = artToolInputID[artToolInputID.length-1];

    var artistTextArea = document.getElementById("artist-skill-desc");
    var artistListInput = document.getElementById("artist-list");

    artRef.onSnapshot(function(doc){
        var tempArr = [];

        for(var i = 0; i < doc.data().arttool.length; i++){
            tempArr.push(doc.data().arttool[i]);
        }

        tempArr[index] = artInput.value;

        artRef.set({
            arttool: tempArr,
            description: artistTextArea.value,
            create: artistListInput.value
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


//remove art tools
function removeArtTool(artToolID) {
    var artRef = db.collection("skills").doc("artist");

    artRef.onSnapshot(function(doc){
        var inputIndex = artToolID[artToolID.length-1];
        var artInput = document.getElementById("art-item"+inputIndex);
        var artTool = document.getElementById(artToolID);
        artTool.remove();

        artRef.update({
            arttool: firebase.firestore.FieldValue.arrayRemove(artInput.value)
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
            devItem.id = "dev-item"+i;

            devTool.id = "devtool"+i;

            deleteBtn.id = "dev-delete"+i;
            addBtn.id = "dev-add"+i;

            deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
            addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

            deleteBtn.setAttribute("onclick", "removeDevTool(this.parentNode.id);");
            addBtn.setAttribute("onclick", "saveEditedDevTool(this.parentElement.firstChild.id);");
            devItem.setAttribute("oninput", "editDevTool(this.id);");

            addBtn.disabled = true;

            devTool.appendChild(devItem);
            devTool.appendChild(deleteBtn);
            devTool.appendChild(addBtn);

            deleteBtn.appendChild(deleteIcon);
            deleteBtn.type = "submit";
            addBtn.appendChild(addIcon);
            addBtn.type = "submit";

            document.getElementById("frontend-tools").appendChild(devTool);

            devItem.value = doc.data().devtool[i];
        }
    });
}

function addDevTools() {
    var devRef = db.collection("skills").doc("frontend");
    var devInput = document.getElementById("dev-tools-input");
    var addBtn = document.getElementById("frontend-add-btn");

    addBtn.disabled = true;

    devInput.addEventListener("input", (Event) => {
        addBtn.disabled = false;
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
    });


    
}

//edit dev tools
function editDevTool(devToolInputID) {
    var addBtn = document.getElementById("dev-add"+devToolInputID[devToolInputID.length-1]);

    addBtn.disabled = false;
}

//save edited dev tools
function saveEditedDevTool(devToolInputID) {
    var devRef = db.collection("skills").doc("frontend");
    var devInput = document.getElementById(devToolInputID);
    var index = devToolInputID[devToolInputID.length-1];
    var frontEndTextArea = document.getElementById("frontend-skill-desc");
    var frontEndListInput = document.getElementById("frontend-list");

    devRef.onSnapshot(function(doc){
        var tempArr = [];

        for(var i = 0; i < doc.data().devtool.length; i++){
            tempArr.push(doc.data().devtool[i]);
        }

        tempArr[index] = devInput.value;

        devRef.set({
            devtool: tempArr,
            description: frontEndTextArea.value,
            speak: frontEndListInput.value
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


//remove dev tools
function removeDevTool(devToolID) {
    var devRef = db.collection("skills").doc("frontend");

    devRef.onSnapshot(function(doc){
        var inputIndex = devToolID[devToolID.length-1];
        var devInput = document.getElementById("dev-item"+inputIndex);
        var devTool = document.getElementById(devToolID);
        devTool.remove();

        devRef.update({
            devtool: firebase.firestore.FieldValue.arrayRemove(devInput.value)
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
            entreItem.id = "entre-item"+i;

            entreTool.id = "entretool"+i;

            deleteBtn.id = "entre-delete"+i;
            addBtn.id = "entre-add"+i;

            deleteIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/delete.svg");
            addIcon.setAttribute("src", "/CCCAPDEV-MP1-Resume/icons/check.svg");

            deleteBtn.setAttribute("onclick", "removeEntreTool(this.parentNode.id);");
            addBtn.setAttribute("onclick", "saveEditedEntreTool(this.parentElement.firstChild.id);");
            entreItem.setAttribute("oninput", "editEntreTool(this.id);");

            addBtn.disabled = true;

            entreTool.appendChild(entreItem);
            entreTool.appendChild(deleteBtn);
            entreTool.appendChild(addBtn);

            deleteBtn.appendChild(deleteIcon);
            deleteBtn.type = "submit";
            addBtn.appendChild(addIcon);
            addBtn.type = "submit";


            document.getElementById("entre-tools").appendChild(entreTool);

            entreItem.value = doc.data().entretool[i];
        }
    });
}


function addEntreTools() {
    var entreRef = db.collection("skills").doc("entrepreneur");
    var entreInput = document.getElementById("entre-tools-input");
    var addBtn = document.getElementById("entre-add-btn");


    addBtn.disabled = true;

    entreInput.addEventListener("input", (Event) => {
        addBtn.disabled = false;
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
    });


    
}

//edit entre tools
function editEntreTool(entreToolInputID) {
    var addBtn = document.getElementById("entre-add"+entreToolInputID[entreToolInputID.length-1]);

    addBtn.disabled = false;
}

//save edited entre tools
function saveEditedEntreTool(entreToolInputID) {
    var entreRef = db.collection("skills").doc("entrepreneur");
    var entreInput = document.getElementById(entreToolInputID);
    var index = entreToolInputID[entreToolInputID.length-1];
    var entreTextArea = document.getElementById("entre-skill-desc");
    var entreListInput = document.getElementById("entre-list");

    entreRef.onSnapshot(function(doc){
        var tempArr = [];

        for(var i = 0; i < doc.data().entretool.length; i++){
            tempArr.push(doc.data().entretool[i]);
        }

        tempArr[index] = entreInput.value;

        entreRef.set({
            entretool: tempArr,
            description: entreTextArea.value,
            start: entreListInput.value
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


//remove entre tools
function removeEntreTool(entreToolID) {
    var entreRef = db.collection("skills").doc("entrepreneur");

    entreRef.onSnapshot(function(doc){
        var inputIndex = entreToolID[entreToolID.length-1];
        var entreInput = document.getElementById("entre-item"+inputIndex);
        var entreTool = document.getElementById(entreToolID);
        entreTool.remove();

        entreRef.update({
            entretool: firebase.firestore.FieldValue.arrayRemove(entreInput.value)
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

//save links
function saveLinks() {
    var fblink = document.getElementById("fblink");
    var twitterlink = document.getElementById("twitterlink");
    var githublink = document.getElementById("githublink");
    var linkedinlink = document.getElementById("linkedinlink");
    var linksRef = db.collection("links").doc("links");
    var saveBtn = document.getElementById("links-save-btn");
    var linkInputs = [fblink, twitterlink, githublink, linkedinlink];

    saveBtn.disabled = true;
    linkInputs.forEach(function(element){
        element.addEventListener("input", function(){
            saveBtn.disabled = false;    

            saveBtn.addEventListener("click", (Event) => {
                linksRef.update({
                    fb: fblink.value,
                    twitter: twitterlink.value,
                    github: githublink.value,
                    linkedin: linkedinlink.value
                })
                .then(function() {
                    location.reload();
                });
                
                
            });

        });
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
saveLinks();
