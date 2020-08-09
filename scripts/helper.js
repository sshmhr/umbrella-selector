{
    // This is a helper script to populate initial data into localstorage,
    //    In a production env, we wont be needing this and will use a database for all our requirements.
    const dummyData = [{
            lightColor: "#80d8ff",
            darkColor: "#0390f4",
            umbrellaAssetLocation: "assets/Blue-umbrella.png",
            filter: "invert(44%) sepia(15%) saturate(6484%) hue-rotate(181deg) brightness(94%) contrast(105%)",
        },

        {
            lightColor: "#fff9c4",
            darkColor: "#fdd835",
            umbrellaAssetLocation: "assets/Yello-umbrella.png",
            filter: "invert(91%) sepia(86%) saturate(6830%) hue-rotate(326deg) brightness(102%) contrast(99%)",
        },

        {
            lightColor: "#f8bbd0",
            darkColor: "#e91e63",
            umbrellaAssetLocation: "assets/Pink-umbrella.png",
            filter: "invert(24%) sepia(85%) saturate(2635%) hue-rotate(324deg) brightness(90%) contrast(104%)",
        },
    ];


    const populateDatabaseIfNeeded = () => {
        if (!window.localStorage.getItem('buttonMetadata')) {
            window.localStorage.setItem('buttonMetadata', JSON.stringify(dummyData));
        }
    }

    populateDatabaseIfNeeded();

}