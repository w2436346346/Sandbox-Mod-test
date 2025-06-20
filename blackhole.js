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
                if (dx === 0 && dy === 0) continue;

                let nx = pixel.x + dx;
                let ny = pixel.y + dy;

                if (!pixelMap[nx] || !pixelMap[nx][ny]) continue;

                let nearbyPixel = pixelMap[nx][ny];
                if (!nearbyPixel || nearbyPixel.id === "blackhole") continue;

                // Calculate vector from nearby pixel to blackhole
                let vx = pixel.x - nearbyPixel.x;
                let vy = pixel.y - nearbyPixel.y;

                let dist = Math.sqrt(vx*vx + vy*vy);
                if (dist === 0) continue;

                // Normalize and round movement vector
                let moveX = Math.round(vx / dist);
                let moveY = Math.round(vy / dist);

                let targetX = nearbyPixel.x + moveX;
                let targetY = nearbyPixel.y + moveY;

                // Move pixel one step closer if target is empty
                if (isEmpty(targetX, targetY)) {
                    movePixel(nearbyPixel.x, nearbyPixel.y, targetX, targetY);
                }
            }
        }
    }
};

// Add the element to the special category UI
if (!elementGroups["special"]) elementGroups["special"] = [];
if (!elementGroups["special"].includes("blackhole")) {
    elementGroups["special"].push("blackhole");
}

// Refresh the element picker UI so the blackhole button shows up
if (typeof renderElementPicker === "function") renderElementPicker();
