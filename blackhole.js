(function() {
    // ===== 1. Register Cosmic Category =====
    if (!elementCategories.cosmic) {
        elementCategories.cosmic = {
            color: "#4b0082",  // Dark purple
            name: "Cosmic",
            hidden: false
        };
    }

    // ===== 2. Blackhole Element =====
    elements.blackhole = {
        color: "#000000",
        behavior: behaviors.WALL,
        category: "cosmic",
        density: 99999,
        tempHigh: Infinity,
        temp: 0,
        tick: function(pixel) {
            const range = 8;
            
            for (let y = -range; y <= range; y++) {
                for (let x = -range; x <= range; x++) {
                    if (x === 0 && y === 0) continue;
                    
                    const nx = pixel.x + x;
                    const ny = pixel.y + y;
                    
                    // Proper bounds checking
                    if (!isValidPosition(nx, ny)) continue;
                    
                    const target = pixelMap[nx][ny];
                    if (!target || target.id === "blackhole") continue;
                    
                    // Calculate attraction vector
                    const dx = Math.sign(pixel.x - target.x);
                    const dy = Math.sign(pixel.y - target.y);
                    
                    // Try direct movement
                    if (isEmpty(target.x + dx, target.y + dy)) {
                        movePixel(target.x, target.y, target.x + dx, target.y + dy);
                    }
                    // Fallback: Random displacement
                    else if (Math.random() < 0.3) {
                        const rx = target.x + (Math.random() < 0.5 ? -1 : 1);
                        const ry = target.y + (Math.random() < 0.5 ? -1 : 1);
                        if (isEmpty(rx, ry)) {
                            movePixel(target.x, target.y, rx, ry);
                        }
                    }
                }
            }
        },
        // Visual effects
        tickUpdate: function(pixel) {
            if (Math.random() < 0.01) {
                createPixel("light", pixel.x, pixel.y - 1);
            }
        }
    };

    // ===== 3. UI Integration =====
    if (!elementGroups.cosmic) elementGroups.cosmic = [];
    if (!elementGroups.cosmic.includes("blackhole")) {
        elementGroups.cosmic.push("blackhole");
    }

    console.log("[Cosmic Mod] Blackhole loaded successfully!");
})();
