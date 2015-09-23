var io = require('socket.io')(8080);
var idGen = require('./js/keyGen.js');
var Player = require('./js/playersManager.js');
var Map = require('./js/mapManager.js');
var maps = require('./js/maps.js');
var Team = require('./js/teamManager.js');
var players = {};
var id = 0;
var nb_player = 0;
var teams = {
	numberOfTeams: 3,
	fire: new Team(0),
	water: new Team(1),
	earth: new Team(2),
};
io.set('origins','*:8080');
Map.setMaps(maps.miniMaps);
Map.setActiveMap(Map.createMap(2));


io.on('connection', function (socket) {

	socket.on('ready', function(){
		socket.player = new Player();
		socket.player.setId(socket.id);
		socket.player.setTeam(teams);
		socket.player.pos = socket.player.randPos(Map);

		console.log('new socket: ', socket.id,'new player: ',socket.player);

		players[socket.player.id] = socket.player;
		socket.emit('posIs', {playersList: players, player: socket.player, map: Map.activeMap});
		socket.broadcast.emit('newPlayer', socket.player);
		id++;
		socket.emit('start');
	});

	socket.on('updatePos', function (data){
		socket.player.pos = data.newPos;
		socket.broadcast.emit('moved', {player: socket.player, dir: data.dir});
	});
	socket.on('disconnect', function (socket) {
  	});
});