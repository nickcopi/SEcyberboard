
let table;
const init = ()=>{
	table = document.getElementById('table');
	updateTable();
}

const updateTable = ()=>{
	table.innerHTML = '';
	getScores(drawScores);
}

const drawScores = teams=>{
	console.log(teams);
	if(teams[0]) drawHeader(teams[0]);
	teams.forEach(team=>{
		drawTeam(team);
	});
}

const drawHeader = team=>{
	const imageHeader = `
		<td>Image</td>
		<td>Findings</td>
		<td>Penalties</td>
		<td>Score</td>
	`
	table.innerHTML += `
		<tr>
			<td>Name</td>
			<td>Tier</td>
			<td>Time</td>
			<td>Score</td>
			${imageHeader.repeat(team.images.length)}

		</tr>
	`;
}

const drawTeam = team=>{
	table.innerHTML += `
		<tr>
			<td>${team.name}</td>
			<td>${team.division}</td>
			<td>${team.spentTime}</td>
			<td>${team.totalScore}</td>
			${team.images.map(image=>getImageData(image))}
		</tr>
	`;
	//const tr = document.createElement('tr');
	//const teamName = document.createElement('td');
	//teamName.innerText = team.name;
	//tr.appendChild(teamName);
	//table.appendChild(tr);
	
}

const getImageData = image =>{
	return `
		<td>${image.name}</td>
		<td>${image.finds}</td>
		<td>${image.penalties}</td>
		<td>${image.score}</td>
	`
}

const getScores = callback=>{
	fetch('/api/getScoreboard')
		.then(res=>res.json())
		.then(data=>{
			callback(data);
		})
		.catch((err)=>{
			console.log(err);
		});
}


window.addEventListener('load',()=>{
	init();
});
