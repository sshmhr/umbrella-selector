{
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // get the references to the DOM elements
    const blueButton = document.getElementById("blue-button");
    const yellowButton = document.getElementById("yellow-button");
    const pinkButton = document.getElementById("pink-button");
    const circularButtonDiv = document.getElementById("circular-color-buttons");
    const uploadButton = document.getElementById("upload");
    const umbrellaImage = document.getElementById("umbrella-image");
    const fileUploader = document.getElementById("fileUploader");
    const logoField = document.getElementById("logo");
    const loadingIcon = document.getElementById("loading");

    /* I am currently storing the Information related to buttons 
     Like colors and corresponding images in localstorage ( can be moved to a database as well )*/
    const data = JSON.parse(window.localStorage.getItem("buttonMetadata"));

    /* creating the various circular colored buttons from the info fetched by the database */
    function createAndAttachButton(metadata) {
        const button = document.createElement("BUTTON");
        button.classList.add("circular-button");
        button.onclick = () => {
            removeOldColorClasses();
            loadingIcon.style.filter = metadata.filter;
            changeTheme(
                metadata.umbrellaAssetLocation,
                metadata.lightColor,
                metadata.darkColor
            );
        };
        button.style.backgroundColor = metadata.darkColor;
        circularButtonDiv.appendChild(button);
    }
    // calling the function for every button specefied in the dbms
    data.forEach((metadata) => {
        createAndAttachButton(metadata);
    });

    // changeTheme is used ro change the umbrella image, foreground and backgtound colors whenever one of the color buttons are clicked
    function changeTheme(imageURL, backgroundColor, darkcolor) {
        umbrellaImage.src = imageURL;
        document.body.style.backgroundColor = backgroundColor;
        uploadButton.style.backgroundColor = darkcolor;
    }

    // The fileuploader is actually an hidden element and is clicked whenever uploadbutton is clicked.
    uploadButton.onclick = () => {
        fileUploader.click();
    };

    function displayLoadingIcon() {
        logoField.classList.add("disabled");
        umbrellaImage.classList.add("disabled");
        loadingIcon.classList.remove("disabled");
    }

    function removeLoadingIcon() {
        logoField.classList.remove("disabled");
        umbrellaImage.classList.remove("disabled");
        loadingIcon.classList.add("disabled");
    }

    // whenever a file is uploaded this function is called.
    fileUploader.onchange = function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = loadImage;
            reader.readAsDataURL(this.files[0]);
            displayLoadingIcon();
        }
    };

    function loadImage(e) {
        removeLoadingIcon();
        logoField.src = e.target.result;
    }
    // this is only for the loading icon as we have a different procedure to change its color.
    function removeOldColorClasses() {
        data.forEach((metadata) => {
            loadingIcon.classList.remove(metadata.colorClass);
        });
    }
}