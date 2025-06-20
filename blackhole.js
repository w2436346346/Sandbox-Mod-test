// File: custom_elements.js
// This will create a new category and add the blackhole element

(function() {
    // ===== 1. Create a new category =====
    if (!elementCategories.custom) {
        elementCategories.custom = {
            color: "#FF00FF",  // Bright purple for visibility
            name: "Cosmic",    // Your custom category name
            hidden: false     // Make it visible
        };
    }

    // ===== 2. Define the Blackhole Element =====
    elements.blackhole = {
        color: "#000000",
        behavior: behaviors.WALL,
        category: "custom",  // Assign to our new category
        state: "solid",
        density: 99999,
        tempHigh: Infinity,
        temp: 0,  // Absolute zero for cool effect
        tick: function(pixel) {
            const range = 10;
            for (let y = -range; y <= range; y++) {
                for (let x = -range; x <= range; x++) {
                    if (!x && !y) continue;
                    
                    const nx = pixel.x + x;
                    const ny = pixel.y + y;
                    
                    if (!isEmpty(nx, ny, true)) {
                        const target = pixelMap[nx][ny];
                        if (target.id === "blackhole") continue;
                        
                        // Calculate pull direction
                        const dx = Math.sign(pixel.x - target.x);
                        const dy = Math.sign(pixel.y - target.y);
                        
                        // Try to move target
                        if (isEmpty(target.x + dx, target.y + dy)) {
                            movePixel(target.x, target.y, target.x + dx, target.y + dy);
                        }
                    }
                }
            }
        },
        // Add cool visual effects
        tickUpdate: function(pixel) {
            if (Math.random() < 0.02) {
                createPixel("light", pixel.x + randInt(-1,1), pixel.y + randInt(-1,1));
            }
        }
    };

    // ===== 3. Add to UI =====
    if (!elementGroups.custom) elementGroups.custom = [];
    elementGroups.custom.push("blackhole");

    console.log("Cosmic category and Blackhole loaded!");
})();
