// Function to apply automapping to selected .tmx files
function ApplyAutomap(filePaths) {

    if (!filePaths || filePaths.length === 0) {
        tiled.alert("No files selected.");
        return;
    }

    // Apply automapping to each selected file
    filePaths.forEach(filePath => {
        // tiled.alert("No files selected." + filePath); // Show the selected file name
        const map = tiled.open(filePath);
        if (!map) {
            tiled.log(`Failed to open map: ${filePath}`);
            return;
        }

        if (map.isTileMap) {
            tiled.log(`Applying automapping to map: ${map.fileName}`);
            map.autoMap();
            map.save(); // Save the map after applying automapping
        } else {
            tiled.log(`Skipping non-tilemap file: ${map.fileName}`);
        }
    });

    tiled.alert("Automapping applied to all selected maps.");
}

// Add a menu action to trigger the automapping
const action = tiled.registerAction("ApplyAutomap", function() {
    // Get all world files
    const worldFiles = tiled.worlds;
    const restOfThePath = tiled.projectFilePath.substring(0, tiled.projectFilePath.lastIndexOf("/"));
    const worldFileNames = worldFiles.map(world => {
        const fullPath = world.fileName;
        return fullPath.substring(fullPath.lastIndexOf("/") + 1); 
    });

    // show the dropdown using Dialog
    var dialog = new Dialog("Automap prefixes");
    const cbx =  dialog.addComboBox("Select world file:", worldFileNames);
    var btn = dialog.addButton("OK");
    btn.clicked.connect(function() {
        // selected world
        const selectedWorldFile = cbx.currentText;

        // selected world file path
        const selectedWorld = worldFiles.find(world => world.fileName.endsWith(selectedWorldFile));

        // 
        const allMaps = selectedWorld.maps.map(world => {
            const fullPath = world.fileName;
            return fullPath; 
        });
        dialog.done(Dialog.Accepted); // Close the dialog with accepted status
        ApplyAutomap(allMaps);
    });
    dialog.show();
});
action.text = "Automap World File";
action.icon = "automap"; // Optional: Add an icon if available
action.shortcut = "Ctrl+Shift+A";
tiled.extendMenu("File", [{ action: "ApplyAutomap", before: "Close" }]);
