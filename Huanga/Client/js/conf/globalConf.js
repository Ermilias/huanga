var HOST = "www.huanga.eleguen.ovh";
var HOST = ".";
var PORT = "8081";
var FULLHOST = HOST + ":" + PORT;

var PATHS = {
    image: HOST + "/image/",
    css: HOST + "/css/",
    conf: HOST + "/conf/"
}

var CONTROLS = {
    down: [40,115,83],          // Flèche bas, s, S
    right: [39,100,68],         // Flèche droite, d, D
    up: [38,122,119,90,87],     // Flèche haut, z, w, Z, W
    left: [37,113,97,81,65]     // Flèche gauche, q, a, Q, A
}

var RESOLUTION = 64; // possible value 32, 64, 128

var IMAGES = {
    sources: {
        grounds: PATHS.image + 'tiles/grounds/',
        teams: PATHS.image + 'teams/',
        walls: PATHS.image + 'tiles/walls/',
        blocks: PATHS.image + 'tiles/blocks/',
        effects: PATHS.image + 'effects/',
        gui: PATHS.image + 'gui/'
    },
    teamsPics: ['fire_','water_','earth_'],
    effects: {
        smoke: 'smoke_',
        circle: 'circle_'
    }, 
    grounds: {
        sands: ['tileSand_','tileSandB_']
    },
    walls: {
        stone: ['tileStone_','tileStoneB_','tileStoneC_','tileStoneD_','tileStoneE_']
    },
    blocks: {
        stone: ['tileBlock_','tileBlockB_','tileBlockC_','tileBlockD_']
    }
}

var TILES = [
    [
        {path: IMAGES.sources.walls, name: 'tileStone_' + RESOLUTION + '.png',size:{width: RESOLUTION, height: RESOLUTION},isBlock: true,type:'wall',factor: 1},
        {path: IMAGES.sources.walls, name: 'tileStoneB_' + RESOLUTION + '.png',size:{width: RESOLUTION, height: RESOLUTION},isBlock: true,type:'wall',factor: 1},
        {path: IMAGES.sources.walls, name: 'tileStoneC_' + RESOLUTION + '.png',size:{width: RESOLUTION, height: RESOLUTION},isBlock: true,type:'wall',factor: 1},
        {path: IMAGES.sources.walls, name: 'tileStoneD_' + RESOLUTION + '.png',size:{width: RESOLUTION, height: RESOLUTION},isBlock: true,type:'wall',factor: 1},
        {path: IMAGES.sources.walls, name: 'tileStoneE_' + RESOLUTION + '.png',size:{width: RESOLUTION, height: RESOLUTION},isBlock: true,type:'wall',factor: 1}
    ],
    [
        {path: IMAGES.sources.grounds, name: 'tileSand_' + RESOLUTION + '.png',size:{width: RESOLUTION, height: RESOLUTION},isBlock: false,type:'ground',factor: 1},
        {path: IMAGES.sources.grounds, name: 'tileSandB_' + RESOLUTION + '.png',size:{width: RESOLUTION, height: RESOLUTION},isBlock: false,type:'ground',factor: 1}
    ],
    [
        {path: IMAGES.sources.blocks, name: 'tileBlock_' + 3 * RESOLUTION + '.png',size:{width: 3 * RESOLUTION, height: 3 * RESOLUTION},isBlock: true,type:'block',factor: 3},
        {path: IMAGES.sources.blocks, name: 'tileBlockB_' + 3 * RESOLUTION + '.png',size:{width: 3 * RESOLUTION, height: 3 * RESOLUTION},isBlock: true,type:'block',factor: 3},
        {path: IMAGES.sources.blocks, name: 'tileBlockC_' + 3 * RESOLUTION + '.png',size:{width: 3 * RESOLUTION, height: 3 * RESOLUTION},isBlock: true,type:'block',factor: 3},
        {path: IMAGES.sources.blocks, name: 'tileBlockD_' + 3 * RESOLUTION + '.png',size:{width: 3 * RESOLUTION, height: 3 * RESOLUTION},isBlock: true,type:'block',factor: 3}
    ],
];

var TILESWEIGHT = [
    [0.3,0.45,0.05,0.15,0.05], //walls
    [9.7,0.3], // grounds
    [0.25,0.25,0.25,0.25], // blocks
];

