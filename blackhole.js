// Blackhole - A powerful gravitational element that pulls in nearby matter
elements.blackhole = {
    color: "#000000",
    behavior: behaviors.WALL, // Immovable and solid
    category: "special",
    state: "solid",
    density: 99999, // Extremely dense
    tempHigh: Infinity, // Indestructible by heat
    tempLow: 0,
    conduct: 0,
    hidden: false, // Visible in the element picker
    tick: function(pixel) {
        const range = 8; // Attraction radius (can be adjusted)
        const force = 1; // How strongly pixels are pulled (1 = one pixel per tick)

        // Scan all pixels within range
        for (let y = -range; y <= range; y++) {
            for (let x = -range; x <= range; x++) {
                if (x === 0 && y === 0) continue; // Skip self

                const nx = pixel.x + x;
                const ny = pixel.y + y;

                // Skip out-of-bounds pixels
                if (!isValidPosition(nx, ny)) continue;

                const nearbyPixel = pixelMap[nx][ny];
                if (!nearbyPixel || nearbyPixel.id === "blackhole") continue;

                // Calculate direction toward the blackhole
                const dx = Math.sign(pixel.x - nearbyPixel.x);
                const dy = Math.sign(pixel.y - nearbyPixel.y);

                // Target position (one step closer)
                const tx = nearbyPixel.x + dx;
                const ty = nearbyPixel.y + dy;

                // If target is empty, move the pixel
                if (isEmpty(tx, ty)) {
                    movePixel(nearbyPixel.x, nearbyPixel.y, tx, ty);
                }
                // If blocked, try random adjacent movement (optional)
                else if (Math.random() < 0.3) {
                    const randX = nearbyPixel.x + (Math.random() < 0.5 ? -1 : 1);
                    const randY = nearbyPixel.y + (Math.random() < 0.5 ? -1 : 1);
                    if (isEmpty(randX, randY)) {
                        movePixel(nearbyPixel.x, nearbyPixel.y, randX, randY);
                    }
                }
            }
        }
    },
};

// Add to the "special" category if not already present
if (!elementGroups.special.includes("blackhole")) {
    elementGroups.special.push("blackhole");
}

// Refresh UI (if needed)
if (typeof renderElementPicker === "function") {
    renderElementPicker();
}
