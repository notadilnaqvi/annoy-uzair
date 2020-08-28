const fetch = require('node-fetch');

// GET DATA FROM CHESS.COM API, PARSE IT, RETURN DICT
async function getData() {
    // GET MONTH & YEAR
    let date = new Date();
    let month = (_ = (date.getMonth() + 1).toString()).length == 1 ? "0" + _ : _; // MAKE SURE MONTH IS 2 DIGITS (05 NOT 5 FOR MAY)
    let year = date.getFullYear().toString();
    const chessUsername = "notadilnaqvi";

    // CALL APIS, GET JSONS
    let gamesApi = `https://api.chess.com/pub/player/${chessUsername}/games/${year}/${month}`;
    let statsApi = `https://api.chess.com/pub/player/${chessUsername}/stats`;
    let gamesResponse = await fetch(gamesApi);
    let statsResponse = await fetch(statsApi);
    let gamesJson = await gamesResponse.json();
    let statsJson = await statsResponse.json();

    // RETRIEVE RELEVANT DATA FROM JSONS
    let gamesData = getDataFromGamesJson(gamesJson);
    let statsData = getDataFromStatsJson(statsJson);
    
    // RETURN DICT
    return({
        "month": (new Date(Date.now() - 864e5)).toLocaleString('default', {month: 'long'}), // GET PREVIOUS MONTH (NOT CURRENT)
        "played": gamesData["played"],
        "won": gamesData["won"],
        "rating": statsData["rating"]
    });
}


function getDataFromGamesJson(_json){
    let gamesPlayed = _json.games.length;
    let gamesWon = 0;
    _json.games.forEach(game => {
        let color = (game.white.username == "notadilnaqvi") ? "white" : "black";
        if (game[color].result == "win") {gamesWon++};
    });
    return {
        "played": gamesPlayed,
        "won": gamesWon
    }  
}

function getDataFromStatsJson(_json) {
    return {"rating": _json.chess_blitz.last.rating};
}

// MAIN
async function annoyUzair(){
    data = await getData()
    console.log(data);
    // send email
    // upload data
    // update website
}

annoyUzair()

// JOB EVERY MONTH
// var CronJob = require('cron').CronJob;
// var job = new CronJob('* * * * * *', function () {
//     console.log('You will see this message every second');
// }, null, true, 'Asia/Karachi');
// job.start();