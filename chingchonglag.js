// here's the ching chong lag bots i guess
maxlen = 25;
textLim = 3000;
function becomeBot() {
	let name = Array(24).fill().map(x=>String.fromCharCode(0x4E00 + Math.random() * (0x9FFF - 0x4E00) | 0)).join("")+" ";
	cmd(`name ${name}`);
	wordBlacklist.push(name);
	let i = 0;
	socket.emit("talk",{text:[c=(((((("{NAME}".repeat(5)+" ").repeat(5)+" ").repeat(5)+" ").repeat(5)+" ").repeat(5)+" ").repeat(5)+" ").slice(0,textLim),c,c,"."][i++%4]});
	setInterval(()=>{
		socket.emit("talk",{text:[c,c,c,"."][i++%4]});
	},1100);
}
function createBot(room = "") {
	const socket = io("//");
	name = Array(24).fill().map(x=>String.fromCharCode(0x4E00 + Math.random() * (0x9FFF - 0x4E00) | 0)).join("")+" ";
	wordBlacklist.push(name);
	socket.emit("login",{name,room});
	socket.on("room",() => {
		let i = 0;
		socket.emit("talk",{text:[c=(((((("{NAME}".repeat(5)+" ").repeat(5)+" ").repeat(5)+" ").repeat(5)+" ").repeat(5)+" ").repeat(5)+" ").slice(0,textLim),c,c,"."][i++%4]});
		setInterval(()=>{
			socket.emit("talk",{text:[c,c,c,"."][i++%4]});
		},1100);
	});
};
createBot("");
becomeBot();
