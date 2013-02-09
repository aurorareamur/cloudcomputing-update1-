/**
 * Module dependencies.
 */

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-2.0'][0]['credentials'];
}
else{
  var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"datakorban"
  }
}

var generate_mongo_url = function(obj){
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'test');

  if(obj.username && obj.password){
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
  else{
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var print_visits = function(req, res){
/* Connect to the DB and auth */
require('mongodb').connect(mongourl, function(err, conn){
    conn.collection('ips', function(err, coll){
        coll.find({}, {limit:10, sort:[['_id','desc']]}, function(err, cursor){
            cursor.toArray(function(err, items){
                res.writeHead(200, {'Content-Type': 'text/plain'});
                for(i=0; i<items.length;i++){
                    res.write(JSON.stringify(items[i]) + "\n");
                }
                res.end();
            });
        });
    });
});
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function (req, res){
  params = require('http://hello-express-1.cloudfoundry.com/').parse(req.'http://hello-express-1.cloudfoundry.com/');
  if(params.pathname === '/history') {
        print_visits(req, res);
    }
    else{
        record_visit(req, res);
    }
}).listen(port, host);
  console.log("Express server listening on port " + app.get('port'));
});
