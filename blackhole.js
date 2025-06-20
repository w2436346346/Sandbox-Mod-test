// Register the blackhole element
elements.blackhole = {
    color: "#000000",
    behavior: behaviors.WALL, // solid, stationary
    category: "special",
    state: "solid",
    density: 1000,
    tick: function(pixel) {
        const range = 5; // range of attraction
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                if (dx === 0 && dy === 0) continue; // Skip self

                const nx = pixel.x + dx;
                const ny = pixel.y + dy;
                
                // Check if position is out of bounds
                if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
                
                const nearbyPixel = pixelMap[nx][ny];
                if (!nearbyPixel || nearbyPixel.id === "blackhole") continue;

                // Calculate vector from nearby pixel to blackhole
                const vx = pixel.x - nearbyPixel.x;
                const vy = pixel.y - nearbyPixel.y;

                const dist = Math.sqrt(vx*vx + vy*vy);
                if (dist === 0) continue;

                // Normalize and round movement vector
                const moveX = Math.round(vx / dist);
                const moveY = Math.round(vy / dist);

                const targetX = nearbyPixel.x + moveX;
                const targetY = nearbyPixel.y + moveY;

                // Check if target is within bounds
                if (targetX < 0 || targetX >= width || targetY < 0 || targetY >= height) {
                    // Delete pixel if it would be moved out of bounds
                    deletePixel(nearbyPixel.x, nearbyPixel.y);
                    continue;
                }

                // Move pixel one step closer if target is empty
                if (isEmpty(targetX, targetY)) {
                    movePixel(nearbyPixel.x, nearbyPixel.y, targetX, targetY);
                }
                // Optional: Add some random movement for more dynamic effect
                else if (Math.random() < 0.1) {
                    // Try random adjacent spot if direct path is blocked
                    const randX = nearbyPixel.x + (Math.random() < 0.5 ? -1 : 1);
                    const randY = nearbyPixel.y + (Math.random() < 0.5 ? -1 : 1);
                    if (isEmpty(randX, randY) && randX >= 0 && randX < width && randY >= 0 && randY < height) {
                        movePixel(nearbyPixel.x, nearbyPixel.y, randX, randY);
                    }
                }
            }
        }
    }
};

// Add the element to the special category UI
if (!elements.blackhole.category) {
    elements.blackhole.category = "special";
}

if (!elementGroups.special) {
    elementGroups.special = [];
}

if (!elementGroups.special.includes("blackhole")) {
    elementGroups.special.push("blackhole");
}

// Refresh the element picker UI so the blackhole button shows up
if (typeof renderElementPicker === "function") {
    renderElementPicker();
}
