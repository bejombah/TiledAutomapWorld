// Function to apply automapping to selected .tmx files
function applyAutomappingToSelectedFiles(filePaths) {
    if (!filePaths || filePaths.length === 0) {
        tiled.alert("No files selected.");
        return;
    }

    // Apply automapping to each selected file
    filePaths.forEach(filePath => {
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

const action = tiled.registerAction("ApplyAutomappingToSelectedFiles", function() {
    const filePaths = tiled.promptOpenFiles(tiled.projectFilePath, "*.tmx", "Select .tmx files to process"); // Allow multiple selection
    if (!filePaths || filePaths.length === 0) {
        tiled.alert("No files selected. Automapping canceled.");
        return;
    }

    applyAutomappingToSelectedFiles(filePaths);
});
action.text = "Apply Automapping to Selected Files";
action.icon = "automap"; // Optional: Add an icon if available
action.shortcut = "Ctrl+Shift+Q"; // Optional: Set a keyboard shortcut
tiled.extendMenu("File", [{ action: "ApplyAutomappingToSelectedFiles", before: "Close" }]);
