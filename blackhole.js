// Define the black hole element
elements.blackhole = {
    color: "#000000",
    behavior: behaviors.WALL, // solid and doesn’t move itself
    category: "special",
    state: "solid",
    density: 1000,

    tick: function(pixel) {
        // Range of attraction
        const range = 5;

        // Loop over nearby pixels within range
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                if (dx === 0 && dy === 0) continue;

                let nx = pixel.x + dx;
                let ny = pixel.y + dy;
                let nearbyPixel = pixelMap[nx] && pixelMap[nx][ny];

                if (nearbyPixel && nearbyPixel.id !== "blackhole") {
                    // Calculate vector towards blackhole pixel
                    let vx = pixel.x - nearbyPixel.x;
                    let vy = pixel.y - nearbyPixel.y;

                    // Normalize vector (to length 1)
                    let dist = Math.sqrt(vx*vx + vy*vy);
                    if (dist === 0) continue;

                    let moveX = Math.round(vx / dist);
                    let moveY = Math.round(vy / dist);

                    // Try to move the pixel one step closer if space is free
                    let targetX = nearbyPixel.x + moveX;
                    let targetY = nearbyPixel.y + moveY;
                    if (isEmpty(targetX, targetY)) {
                        movePixel(nearbyPixel.x, nearbyPixel.y, targetX, targetY);
                    }
                }
            }
        }
    }
};

// Add blackhole to special category and refresh UI
if (!elementGroups["special"]) elementGroups["special"] = [];
if (!elementGroups["special"].includes("blackhole")) elementGroups["special"].push("blackhole");
if (window.renderElementPicker) renderElementPicker();
