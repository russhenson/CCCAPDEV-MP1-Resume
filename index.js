var db = firebase.firestore();

function renderAboutMe() {
    var aboutMeRef = db.collection("about-me").doc("about-me");
    var aboutMeDesc = document.getElementById("aboutMeDescription");

    aboutMeRef.onSnapshot(function(doc) {
        aboutMeDesc.innerHTML = doc.data().description;
    });
}

function renderEduc() {
    var educRef = db.collection("education").doc("education");

    educRef.onSnapshot(function(doc){
        for(var i = 0; i < doc.data().educlist.length; i++){
            var educList = document.createElement("li");


            document.getElementById("educ-list").appendChild(educList);

            educList.innerHTML = doc.data().educlist[i];
        }
    });
}

function renderOrg() {
    var orgRef = db.collection("organizations").doc("organizations");

    orgRef.onSnapshot(function(doc){
        for(var i = 0; i < doc.data().orglist.length; i++){
            var orgList = document.createElement("li");

            document.getElementById("org-list").appendChild(orgList);

            orgList.innerHTML = doc.data().orglist[i];
        }
    });
}

function renderSkills() {
    var artistRef = db.collection("skills").doc("artist");
    var frontendRef = db.collection("skills").doc("frontend");
    var entreRef = db.collection("skills").doc("entrepreneur");

    var artistDesc = document.getElementById("artistDesc");
    var frontendDesc = document.getElementById("frontendDesc");
    var entreDesc = document.getElementById("entreDesc");
    var artistList = document.getElementById("artistList");
    var frontendList = document.getElementById("frontendList");
    var entreList = document.getElementById("entreList");

    artistRef.onSnapshot(function(doc){
        artistDesc.innerHTML = doc.data().description;
        artistList.innerHTML = doc.data().create;

        for(var i = 0; i < doc.data().arttool.length; i++){
            var artTool = document.createElement("li");

            document.getElementById("artTools").appendChild(artTool);

            artTool.innerHTML = doc.data().arttool[i];
        }
    });

    frontendRef.onSnapshot(function(doc){
        frontendDesc.innerHTML = doc.data().description;
        frontendList.innerHTML = doc.data().speak;

        for(var i = 0; i < doc.data().devtool.length; i++){
            var devTool = document.createElement("li");

            document.getElementById("devTools").appendChild(devTool);

            devTool.innerHTML = doc.data().devtool[i];
        }

    });

    entreRef.onSnapshot(function(doc){
        entreDesc.innerHTML = doc.data().description;
        entreList.innerHTML = doc.data().start;

        for(var i = 0; i < doc.data().entretool.length; i++){
            var entreTool = document.createElement("li");

            document.getElementById("entreTools").appendChild(entreTool);

            entreTool.innerHTML = doc.data().entretool[i];
        }
    });
}


function renderLinks() {
    var linkRef = db.collection("links").doc("links");

    var ig = document.getElementById("iglink");
    var twitter = document.getElementById("twitterlink");
    var github = document.getElementById("githublink");
    var linkedin = document.getElementById("linkedinlink");

    linkRef.onSnapshot(function(doc){
        ig.setAttribute("href", doc.data().ig);
        twitter.setAttribute("href", doc.data().twitter);
        github.setAttribute("href", doc.data().github);
        linkedin.setAttribute("href", doc.data().linkedin);
    });

    

}

function renderCraft(){
    let imgCounter = 0;

    var storage = firebase.storage();
    var storageRef = storage.ref();

    db.collection("crafts").onSnapshot(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            if(imgCounter+1 % 3 === 0){
                var divider = document.createElement("div");
                divider.className = "w-100";
            }

            var craftContainer = document.createElement("div");
            var craftImg = document.createElement("img");
            var craftOverlay = document.createElement("div");
            var craftDesc = document.createElement("p");
            var craftLink = document.createElement("a");
            var viewBtn = document.createElement("button");

            craftContainer.className = "imgContainer";
            craftContainer.id = "imgContainer"+imgCounter;

            craftImg.className = "craftCardMain";
            craftImg.id = doc.data().name;
            
            craftImg.src = doc.data().imgUrl;

            craftOverlay.className = "craftOverlay";

            craftDesc.className = "craftDescription";
            craftDesc.id = "craftDescTextArea"+imgCounter;
            craftDesc.innerHTML = doc.data().description;

            viewBtn.type = "button";
            viewBtn.className = "btn viewCraft";
            viewBtn.innerHTML = "view";
            viewBtn.id = "viewCraft"+imgCounter;

            craftLink.href = doc.data().link;

            craftLink.appendChild(viewBtn);

            craftOverlay.appendChild(craftDesc);
            craftOverlay.appendChild(craftLink);

            craftContainer.appendChild(craftImg);
            craftContainer.appendChild(craftOverlay);

            document.getElementById("my-crafts-box").appendChild(craftContainer);

            imgCounter++;
        });
        
        
    }),
    function(){
        location.reload();
    }
    
}


renderAboutMe();
renderEduc();
renderOrg();
renderSkills();
renderLinks();
renderCraft();