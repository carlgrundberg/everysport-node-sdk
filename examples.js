var Everysport = require('./everysport').Everysport;
var everysport = new Everysport("YOUR_API_KEY", true);

// Get all sports
everysport.sports(function(data) {
    console.log('Everysport.sports: Received ' + data.sports.length + ' sports.');
});

// Get all football leagues
everysport.leagues({ sport: 10, limit: 500 }, function(data) {
    console.log('Everysport.leagues: Received ' + data.leagues.length + ' leagues.');
});

// Get all events for a league
everysport.leagueEvents(57973, function(data) {
    console.log('Everysport.leagueEvents: Received ' + data.events.length + ' events for league.');
});

// Get standings for a league
everysport.leagueStandings(57973, function(data) {
    console.log('Everysport.leagueStandings: Received ' + data.groups[0].standings.length + ' rows for league.');
});

// Get all football games between two dates
everysport.events({ fromDate: "2013-08-15", toDate: "2013-08-18", sport: 10 }, function(data) {
    console.log('Everysport.events: Received ' + data.events.length + ' events.');
});

// Get single event
everysport.event(2143943, function(data) {
    console.log('Everysport.event: Received event ' + data.event.id + '.');
});




