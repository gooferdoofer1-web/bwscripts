function hey(who,text) {
	socket.emit("talk",{text: `Hey, ${nisolate(who)}!`});
	speak.play(`Hey, ${markdownToSpeech(who)}!`,{
		speed: usersPublic.get(me).speed,
		pitch: usersPublic.get(me).pitch
	},()=>{
		socket.emit("talk",{text})
	})
}
