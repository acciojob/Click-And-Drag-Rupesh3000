const items = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.style.position = "absolute"; // allow free movement
  // set initial positions based on current layout
  const rect = cube.getBoundingClientRect();
  const parentRect = items.getBoundingClientRect();
  cube.style.left = rect.left - parentRect.left + "px";
  cube.style.top = rect.top - parentRect.top + "px";

  // mouse down - start dragging
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;
    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;
    cube.style.zIndex = 1000; // bring to front
  });
});

// mouse move - drag
document.addEventListener("mousemove", (e) => {
  if (!selectedCube) return;

  const parentRect = items.getBoundingClientRect();
  let newLeft = e.clientX - parentRect.left - offsetX;
  let newTop = e.clientY - parentRect.top - offsetY;

  // boundary constraints
  newLeft = Math.max(0, Math.min(newLeft, parentRect.width - selectedCube.offsetWidth));
  newTop = Math.max(0, Math.min(newTop, parentRect.height - selectedCube.offsetHeight));

  selectedCube.style.left = newLeft + "px";
  selectedCube.style.top = newTop + "px";
});

// mouse up - drop
document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.style.zIndex = "";
    selectedCube = null;
  }
});
