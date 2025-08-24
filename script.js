const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Initial placement in grid
cubes.forEach((cube, index) => {
  let col = index % 3;
  let row = Math.floor(index / 3);
  cube.style.left = col * 110 + 10 + "px"; // 100px + 10px gap
  cube.style.top = row * 110 + 10 + "px";
});

// Mouse Down → select cube
cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

// Mouse Move → drag cube
document.addEventListener("mousemove", (e) => {
  if (selectedCube) {
    const containerRect = container.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Boundary constraints
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - selectedCube.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - selectedCube.offsetHeight));

    selectedCube.style.left = newLeft + "px";
    selectedCube.style.top = newTop + "px";
  }
});

// Mouse Up → release cube
document.addEventListener("mouseup", () => {
  selectedCube = null;
});
