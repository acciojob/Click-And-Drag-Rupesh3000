document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const cubes = document.querySelectorAll('.cube');
  let selectedCube = null;
  let offsetX, offsetY;

  // Initial grid positions
  cubes.forEach((cube, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    cube.style.left = `${col * 110 + 10}px`; // 100px cube + 10px gap
    cube.style.top = `${row * 110 + 10}px`;
  });

  // Mouse event handlers
  cubes.forEach(cube => {
    cube.addEventListener('mousedown', startDragging);
  });

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);

  function startDragging(e) {
    selectedCube = e.target;
    selectedCube.classList.add('dragging');
    
    // Calculate offset from mouse to cube's top-left corner
    const rect = selectedCube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  }

  function drag(e) {
    if (!selectedCube) return;

    // Get container boundaries
    const containerRect = container.getBoundingClientRect();
    
    // Calculate new position
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Enforce boundary constraints
    newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - selectedCube.offsetWidth));
    newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - selectedCube.offsetHeight));

    // Update cube position relative to container
    selectedCube.style.left = `${newX - containerRect.left}px`;
    selectedCube.style.top = `${newY - containerRect.top}px`;
  }

  function stopDragging() {
    if (selectedCube) {
      selectedCube.classList.remove('dragging');
      selectedCube = null;
    }
  }
});