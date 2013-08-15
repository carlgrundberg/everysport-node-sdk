/**
 * Node client for the Everysport API
 * https://github.com/menmo/everysport-api-documentation
 */

var http = require('http');
var url = require('url');

var options = {
    host: 'api.everysport.com',
    port: 80,
    base: '/v1/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Everysport-Node/1.0.0'
    }
};

exports.Everysport = (function() {
    function Everysport(apiKey, debug) {
        this.apiKey = apiKey;
        this.debug = debug;
    }

    Everysport.prototype.call = function(uri, params, onsuccess, onerror) {
        var req,
            _this = this;
        if (params == null) {
            params = {};
        }
        params.apikey = this.apiKey;
        options.path = url.format({
            pathname: options.base + uri,
            query: params
        });
        if (this.debug) {
            console.log("Everysport: Opening request to http://" + options.host + options.path);
        }
        req = http.request(options, function(res) {
            var json;
            res.setEncoding('utf8');
            json = '';
            res.on('data', function(d) {
                return json += d;
            });
            return res.on('end', function() {
                try {
                    json = JSON.parse(json);
                } catch (e) {
                    json = {
                        status: 'error',
                        messages: [ e ]
                    };
                }
                if (json == null) {
                    json = {
                        status: 'error',
                        messages: [ 'Empty response' ]
                    };
                }
                if (res.statusCode !== 200 || (json.status && json.status == 'error')) {
                    if (onerror) {
                        return onerror(json);
                    } else {
                        return _this.onerror(json);
                    }
                } else {
                    if (onsuccess) {
                        return onsuccess(json);
                    }
                }
            });
        });
        req.end();
        req.on('error', function(e) {
            if (onerror) {
                return onerror(e);
            } else {
                return _this.onerror({
                    status: 'error',
                    messages: [ e ]
                });
            }
        });
        return null;
    };

    Everysport.prototype.onerror = function(err) {
        throw {
            name: 'Error',
            message: err.messages,
            toString: function() {
                return "" + err.name + ": " + err.messages;
            }
        };
    };

    Everysport.prototype.events = function(params, onsuccess, onerror) {
        if ('function' === typeof params) {
            onerror = onsuccess;
            onsuccess = params;
            params = null;
        }
        return this.call('events', params, onsuccess, onerror);
    };

    Everysport.prototype.event = function(id, params, onsuccess, onerror) {
        if ('function' === typeof params) {
            onerror = onsuccess;
            onsuccess = params;
            params = null;
        }
        return this.call('events/' + id, params, onsuccess, onerror);
    };

    Everysport.prototype.sports = function(params, onsuccess, onerror) {
        if ('function' === typeof params) {
            onerror = onsuccess;
            onsuccess = params;
            params = null;
        }
        return this.call('sports', params, onsuccess, onerror);
    };

    Everysport.prototype.leagues = function(params, onsuccess, onerror) {
        if ('function' === typeof params) {
            onerror = onsuccess;
            onsuccess = params;
            params = null;
        }
        return this.call('leagues', params, onsuccess, onerror);
    };

    Everysport.prototype.leagueEvents = function(id, params, onsuccess, onerror) {
        if ('function' === typeof params) {
            onerror = onsuccess;
            onsuccess = params;
            params = null;
        }
        return this.call('leagues/' + id + '/events', params, onsuccess, onerror);
    };

    Everysport.prototype.leagueStandings = function(id, params, onsuccess, onerror) {
        if ('function' === typeof params) {
            onerror = onsuccess;
            onsuccess = params;
            params = null;
        }
        return this.call('leagues/' + id + '/standings', params, onsuccess, onerror);
    };

    return Everysport;
})();
