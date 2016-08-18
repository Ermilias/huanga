console.log(typeof(process.argv[3]));
var numOfMap = parseInt(process.argv[2]) || 1;
var mapType = process.argv[3] === 'l' ? 'largeMaps' : 'smallMaps';
console.log(mapType);
var port = parseInt(process.argv[4]) || 8081;
var io = require('socket.io')(8081);
var idGen = require('./js/keyGen.js');
var Player = require('./js/playersManager.js');
var Map = require('./js/mapManager.js');
var maps = require('./js/maps.js');

var TeamGenerator = require('./js/teamsGenerator.js');
var players = {};
var id = 0;
var nb_player = 0;
var teamsNames = ['fire','water','earth'];
var teamsG = new TeamGenerator(teamsNames,3);
var teams = teamsG.teams;

io.set('origins','*:8081');
Map.setMaps(maps[mapType]);
Map.generateMap(numOfMap);


io.on('connection', function (socket) {

	socket.on('ready', function(){
		socket.player = new Player();
		socket.player.setId(socket.id);
		teamsG.setRandTeam(socket.player);
		//socket.player.setRandTeam(teams);
		socket.player.pos = socket.player.randPos(Map);

		console.log('new socket: ', socket.id,'new player: ',socket.player);

		players[socket.player.id] = socket.player;
		socket.emit('posIs', {playersList: players, player: socket.player, map: Map.activeMap});
		socket.broadcast.emit('newPlayer', socket.player);
		id++;
		socket.emit('start');
	});

	socket.on('updatePos', function (data){
		if (socket.id === data.id){
			socket.player.pos = data.newPos;
			console.log(socket.player.pos);
			var contact = socket.player.checkContact(players)
			if(contact){
				io.emit('contact',{contact: contact});
			}
			socket.broadcast.emit('moved', {player: socket.player, dir: data.dir});
		}
	});

	socket.on('updateTeam', function (data){
		console.log(data);
			teamsG.remove(data.remove);
			teamsG.add(data.add);
		players[data.player].setTeam(data.add);
	});
	socket.on('disconnect', function () {
		if (typeof socket.player !== 'undefined'){
		var teamId = socket.player.teamId;
			teamsG.remove(teamId);
		}
		delete players[socket.id];
		nb_player--;
		io.emit('disconnected', {id: socket.id});
  	});
});