// JavaScript source code

let scene;
let camera;
let renderer;
let cylinder;
let controls;

// Retrieve the values from the input boxes
let recursionDepthInput = document.getElementById('recursionDepth');
let numberOfChildrenInput = document.getElementById('numberOfChildren');
let numberOfBranchesInput = document.getElementById('numberOfBranches');

// Define cylinder parameters
const ROOT_RADIUS = 0.6;
const ROOT_HEIGHT = 10;

// initiallize scene, camera, objects and renderer
let init = function () {

    // Create the scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xababab)

    // Create camera
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5 * ROOT_HEIGHT;

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    // Add controls for the camera
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Get the container element from the HTML
    const container2 = document.getElementById('container2');

    // Append the renderer's DOM element to the container
    container2.appendChild(renderer.domElement);

    // Add event listener for mousedown only within the rendering area
    // Add event listener for mousedown on the renderer element
    renderer.domElement.addEventListener('mousedown', onMouseDown, false);

    raycaster = new THREE.Raycaster();
};

// main animation loop - calls every 50-60 ms.
let mainLoop = function () {
    for (var i = 0; i < allCylinders.length; i++) {
        allCylinders[i].rotateY(0.005);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

function onSubmit() {
    // Get the values from the input elements
    var recursionDepth = recursionDepthInput.value;
    var numberOfChildren = numberOfChildrenInput.value;
    var numberOfBranches = numberOfBranchesInput.value;

    // Convert the values to integers
    recursionDepth = parseInt(recursionDepth);
    numberOfChildren = parseInt(numberOfChildren);
    numberOfBranches = parseInt(numberOfBranches);


    // Validate input values
    if (recursionDepth<0 || numberOfChildren<0 || numberOfBranches<0) {
        // Display error message
        var errorContainer = document.getElementById("errorContainer");
        errorContainer.innerHTML = "Invalid input! Please enter valid numbers.";
    }
    else if (!Number.isInteger(recursionDepth) || !Number.isInteger(numberOfChildren)) {
        // Display error message
        var errorContainer = document.getElementById("errorContainer");
        errorContainer.innerHTML = "Invalid input! Please enter valid numbers.";
    }
    else if (isNaN(recursionDepth) || isNaN(numberOfChildren)) {
        // Display error message
        var errorContainer = document.getElementById("errorContainer");
        errorContainer.innerHTML = "Invalid input! Please enter valid numbers.";
    }
    else {
        // Clear error message
        var errorContainer = document.getElementById("errorContainer");
        errorContainer.innerHTML = "";

        // Clear the object tree
        scene.remove(cylinder);
        allCylinders = []

        // Generate tree
        cylinder = createCylinder(ROOT_RADIUS, ROOT_HEIGHT, scene)
        addBranches(cylinder, ROOT_RADIUS, ROOT_HEIGHT, recursionDepth, numberOfChildren, numberOfBranches);
    }
}

function onMouseDown(event) {

    // Extract the mouse coordinates relative to the renderer
    const clientX = event.clientX - renderer.domElement.getBoundingClientRect().left;
    const clientY = event.clientY - renderer.domElement.getBoundingClientRect().top;

    // Normalize mouse coordinates
    clickMouse = new THREE.Vector2();
    clickMouse.x = (clientX / renderer.domElement.clientWidth) * 2 - 1;
    clickMouse.y = -(clientY / renderer.domElement.clientHeight) * 2 + 1;

    // Update the raycaster with the new mouse position
    raycaster.setFromCamera(clickMouse, camera);

    // Perform raycasting
    const intersects = raycaster.intersectObjects(allCylinders);

    if (intersects.length > 0) {
        console.log("Object intersected")

        // Handle the intersections
        var intersect = intersects[0];

        // Access the geometry of the intersected object
        const geometry = intersect.object.geometry;

        if (geometry instanceof THREE.CylinderGeometry) {

            const radiusTop = geometry.parameters.radiusTop;
            const height = geometry.parameters.height;

            // Convert intersection point to local coordinates within the object
            const intersectionPointLocal = intersect.object.worldToLocal(intersect.point);

            addBranch(radiusTop, height, intersect.object, intersectionPointLocal);
        }
    }
}

// Initial behaviour
init();
mainLoop();