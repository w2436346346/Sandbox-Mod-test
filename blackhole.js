elements.blackhole = {
    color: "#000000",
    behavior: behaviors.WALL,
    category: "special",
    state: "solid",
    density: 1000,
    tick: function(pixel) {
        const range = 5;
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                if (dx === 0 && dy === 0) continue;

                let nx = pixel.x + dx;
                let ny = pixel.y + dy;

                if (!pixelMap[nx] || !pixelMap[nx][ny]) continue;

                let nearbyPixel = pixelMap[nx][ny];
                if (!nearbyPixel || nearbyPixel.id === "blackhole") continue;

                let vx = pixel.x - nearbyPixel.x;
                let vy = pixel.y - nearbyPixel.y;

                let dist = Math.sqrt(vx*vx + vy*vy);
                if (dist === 0) continue;

                let moveX = Math.round(vx / dist);
                let moveY = Math.round(vy / dist);

                let targetX = nearbyPixel.x + moveX;
                let targetY = nearbyPixel.y + moveY;

                if (isEmpty(targetX, targetY)) {
                    movePixel(nearbyPixel.x, nearbyPixel.y, targetX, targetY);
                }
            }
        }
    }
};

if (!elementGroups["special"]) elementGroups["special"] = [];
if (!elementGroups["special"].includes("blackhole")) {
    elementGroups["special"].push("blackhole");
}
if (typeof renderElementPicker === "function") renderElementPicker();
