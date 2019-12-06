const request = require('request-promise');
const config = require('./config.json');
const Team = require('./Team');
const state = {
	teams:[]
};

const updateState = async ()=>{
	console.log('starting team update');
	state.teams = await Promise.all(config.teams.map(async team=>{
		const result = (await request(config.endpoint + team.id)).split('\r\n');
		//console.log(result);
		const headerLine = result.find(line=>line.includes('<table'));
		let teamStats = cleanupLine(result[result.indexOf(headerLine)+1]);
		//console.log(teamStats);
		team.division = teamStats[3];
		team.spentTime = teamStats[5];
		team.totalScore = teamStats[7];
		//console.log(team);
		const images = [];
		//console.log(result.reverse().find(line=>line.includes('<table')));
		const headerLine2 = result.reverse().find(line=>line.includes('<table'));
		result.reverse();
		let index = result.indexOf(headerLine2) + 1;
		while(!result[index].includes('</table')){
			images.push(cleanupLine(result[index]));
			index++;
		}
		team.images = images.map(image=>{
			return{
				name:image[0].split('_')[0],
				time:image[1],
				finds:image[2] + '/' + image[3],
				penalties:Number(image[4]),
				score:Number(image[5])
			}

		});
		return team;
	}));
	console.log('finished team update');
}


const cleanupLine = firstLine=>{
	while(firstLine.includes('/')) firstLine = firstLine.replace('/','');
	while(firstLine.includes('<td>')) firstLine = firstLine.replace('<td>','|');
	while(firstLine.includes('<tr>')) firstLine = firstLine.replace('<tr>','|');
	return firstLine.split('|').filter(item=>item);
}

updateState();

setInterval(()=>{
	updateState();
}, 1000 * 30)

module.exports = state;
