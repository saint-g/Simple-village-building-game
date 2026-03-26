// game.js

// Game Mechanics for Simple Village Building Game

// Resource Gathering
class Resource {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount;
    }
    gather(amount) {
        this.amount += amount;
    }
}

// Building Placement
class Building {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.position = { x: 0, y: 0 }; // Grid position
    }
    place(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
}

// Grid System
class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    }
    canPlaceBuilding(building, x, y) {
        // Check bounds and availability of grid spaces
        for (let i = 0; i < building.height; i++) {
            for (let j = 0; j < building.width; j++) {
                if (x + j >= this.cols || y + i >= this.rows || this.grid[y + i][x + j] !== null) {
                    return false;
                }
            }
        }
        return true;
    }
    placeBuilding(building, x, y) {
        if (this.canPlaceBuilding(building, x, y)) {
            for (let i = 0; i < building.height; i++) {
                for (let j = 0; j < building.width; j++) {
                    this.grid[y + i][x + j] = building;
                }
            }
            building.place(x, y);
            return true;
        }
        return false;
    }
}

// Saving and Loading
class GameState {
    constructor() {
        this.resources = [];
        this.buildings = [];
        this.grid = new Grid(10, 10); // Example grid size
    }
    saveState() {
        const state = {
            resources: this.resources,
            buildings: this.buildings,
            grid: this.grid.grid,
        };
        localStorage.setItem('gameState', JSON.stringify(state));
    }
    loadState() {
        const state = JSON.parse(localStorage.getItem('gameState'));
        this.resources = state.resources;
        this.buildings = state.buildings;
        this.grid.grid = state.grid;
    }
}

// Game State Management
const gameState = new GameState();

// Example usage
const wood = new Resource('Wood', 0);
wood.gather(20);
const house = new Building('House', 2, 2);
if (gameState.grid.placeBuilding(house, 0, 0)) {
    console.log('Building placed!');
}

// Save the current game state
gameState.saveState();

// Load the game state
// gameState.loadState();

