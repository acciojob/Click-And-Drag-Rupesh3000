const items = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollLeft = 0;

if (items) {
  items.addEventListener('mousedown', (e) => {
    isDown = true;
    items.classList.add('active');
    // Use getBoundingClientRect so calculation aligns with page coordinates
    const rect = items.getBoundingClientRect();
    startX = e.pageX - rect.left;
    scrollLeft = items.scrollLeft;
    // prevent text selection while dragging
    e.preventDefault();
  });

  items.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const rect = items.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const walk = x - startX;           // positive when moving right
    items.scrollLeft = scrollLeft - walk;
  });

  // stop dragging on mouseup or when cursor leaves container
  const stopDrag = () => {
    isDown = false;
    items.classList.remove('active');
  };

  items.addEventListener('mouseup', stopDrag);
  items.addEventListener('mouseleave', stopDrag);

  // also handle mouseup anywhere (in case test triggers mouseup elsewhere)
  document.addEventListener('mouseup', stopDrag);
}
