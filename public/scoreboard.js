
let table;
const init = ()=>{
	table = document.getElementById('table');
	table.innerHTML = "<td>ayudame</td>"
	updateTable();
}

const updateTable = ()=>{
	table.innerHTML = '';
	getScores(drawScores);
}

const drawScores = teams=>{
	console.log(teams);
	teams.forEach(team=>{
		drawTeam(team);
	});
}


const drawTeam = team=>{
	const tr = document.createElement('tr');
	const teamName = document.createElement('td');
	teamName.innerText = team.name;
	tr.appendChild(teamName);
	table.appendChild(tr);
	
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
