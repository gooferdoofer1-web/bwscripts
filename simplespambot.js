text = "FAGGOT!";
name = "";
room = "";
maxlen = 25;
textLim = 3000;
socket.removeAllListeners("nuked");
function becomeBot() {
	cmd(`name ${name}`)
	cmd(`dvdbounce 7`);
	setInterval(()=>socket.emit("command",{command:"advpoll",args:text}),1000)
}
function createBot() {
	const socket = io("//");
	socket.emit('login',{name,room});
	setInterval(()=>socket.emit("command",{command:"advpoll",args:text}),1000);
	socket.on("room",() => {
		socket.emit("command",{command:"dvdbounce",args:"7"})
	});
	socket.on("disconnect",() => {
		socket.connect();
		socket.once("connect",() => {
			socket.emit('login',{name,room});
		})
	})
};
createBot();
createBot();
becomeBot();
