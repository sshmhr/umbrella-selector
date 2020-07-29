{
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // get the references to the DOM elements
    const blueButton = document.getElementById("blue-button");
    const yellowButton = document.getElementById("yellow-button");
    const pinkButton = document.getElementById("pink-button");
    const uploadButton = document.getElementById("upload");
    const umbrellaImage = document.getElementById("umbrella-image");
    const fileUploader = document.getElementById("fileUploader");
    const logoField = document.getElementById("logo");
    const loadingIcon = document.getElementById("loading");


    // changeTheme is used ro change the umbrella image, foreground and backgtound colors whenever one of the color buttons are clicked
    function changeTheme(imageURL, backgroundColor, darkcolor) {
        umbrellaImage.src = imageURL;
        document.body.style.backgroundColor = backgroundColor;
        uploadButton.style.backgroundColor = darkcolor;
    }

    // The fileuploader is actually an hidden element and is clicked whenever uploadbutton is clicked.
    uploadButton.onclick = () => {
        fileUploader.click();
    }

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
    };
    // this is only for the loading icon as we have a different procedure to change its color.
    function removeOldColorClasses() {
        loadingIcon.classList.remove("blue-spinner");
        loadingIcon.classList.remove("yellow-spinner");
        loadingIcon.classList.remove("pink-spinner");
    }

    blueButton.onclick = () => {
        removeOldColorClasses();
        loadingIcon.classList.add("blue-spinner");
        changeTheme("assets/Blue-umbrella.png", "#80d8ff", "#0390f4");
    }

    yellowButton.onclick = () => {
        removeOldColorClasses();
        loadingIcon.classList.add("yellow-spinner");
        changeTheme("assets/Yello-umbrella.png", "#fff9c4", "#fdd835");
    }

    pinkButton.onclick = () => {
        removeOldColorClasses();
        loadingIcon.classList.add("pink-spinner");
        changeTheme("assets/Pink-umbrella.png", "#f8bbd0", "#e91e63");
    }

}