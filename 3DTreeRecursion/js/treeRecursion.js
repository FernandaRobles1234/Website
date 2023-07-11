var allCylinders = [];

//Function to create a cylinder
function createCylinder(radius, height, parent) {

    var color = new THREE.Color();
    color.setRGB(Math.random(), Math.random(), Math.random());

    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });

    var cylinder = new THREE.Mesh(geometry, material);

    // Set parent
    parent.add(cylinder)

    allCylinders.push(cylinder)

    return cylinder;
}

function addBranch(parentRadius, parentHeight, parentCylinder, clickPosition) {
    //We create children object
    var childHeight = parentHeight / 2;
    var childRadius = parentRadius / 2;
    var childCylinder = createCylinder(childRadius, childHeight, parentCylinder);

    //60 degrees rotation on z axis and random rotation in Y axis
    const newChildAngleZ = Math.PI / 3;

    // Define a custom axis
    var axis = new THREE.Vector3(clickPosition.x, 0, clickPosition.z).normalize();
    var yAxis = new THREE.Vector3(0, -1, 0);

    // Calculate perpendicular vector to get rotation axis
    axis.cross(yAxis).normalize(); 

    childCylinder.rotateOnAxis(axis, newChildAngleZ);
    childCylinder.position.y = clickPosition.y;

    //We create forward translation
    childCylinder.translateY(childHeight / 2); //Local coordinate system

    // Add the child cylinder to the scene or parent object
    parentCylinder.add(childCylinder);
}

// JavaScript source code
var addBranches = function (rootCylinder, rootRadius, rootHeight, recursionDepth, numberOfChildren, numberOfBranches) {
    var argNumberOfBranches = numberOfBranches;

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    //Function to create a recursive tree, from parent, radius, height, and stop criterias
    function recursion(recursionDepth, numberOfChildren, parentRadius, parentHeight, parentCylinder) {

        //recursion stop criteria
        if (argNumberOfBranches <= 0 || recursionDepth <= 0) {
            return;
        }

        for (var i = 0; i < numberOfChildren; i++) {

            //Children stop criteria
            if (argNumberOfBranches <= 0) {
                break;
            }

            //We create children object
            var childHeight = parentHeight / 2;
            var childRadius = parentRadius / 2;
            var childCylinder = createCylinder(childRadius, childHeight, parentCylinder);

            //60 degrees rotation on z axis and random rotation in Y axis
            const newChildAngleZ = Math.PI / 3;
            
            const newChildAngleY = getRandomNumber(0, 2 * Math.PI);
            childCylinder.rotation.set(0, newChildAngleY, newChildAngleZ); 

            //We create Y translation
            childCylinder.translateY(childHeight / 2); //local

            //We translate in Y axis
            childCylinder.position.y += getRandomNumber(parentHeight / 2, -parentHeight / 3);

            //We update recursion criteria parameters
            argNumberOfBranches -= 1;
            recursion(recursionDepth - 1, numberOfChildren, childRadius, childHeight, childCylinder);
        }
    }

    recursion(recursionDepth, numberOfChildren, rootRadius, rootHeight, rootCylinder);
}
