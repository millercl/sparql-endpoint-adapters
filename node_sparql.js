var http = require( 'http' )
module.exports = ( function () {

  var sparql = function ( query, win_cb, fail_cb ) {

    if ( !win_cb ) {
      console.error( 'must pass callback' )
      return
    }

    var params = Object.keys( sparql.params ).map( encode ).join( '&' )
    params += '&query=' + encodeURIComponent( query )
    var options = {}
    Object.keys( sparql.http ).forEach( function ( e ) {
      options[e] = sparql.http[e]
    } )
    if ( sparql.http.method == 'GET' ) {
      options.path += '?' + params
    }
    if ( sparql.http.method == 'POST' ) {
      options.headers = {
        'Content-Type' : 'application/x-www-form-urlencoded'
        , 'Content-Length' : params.length
        , }
    }

    var req = http.request( options, response )
    if ( sparql.http.method == 'POST' ) {
      console.log( 'write params'+params )
      req.write( params + '\n' )
    }
    req.end()
    function response( res ) {
      res.on(
          'data'
        , function ( chunk ) {
            res.responseText += chunk
          }
      )
      res.on(
          'end'
        , function () {
            switch ( res.statusCode ) {
              case 200:
                win_cb( res )
                break
              case 400:
              case 500:
                /* falls through */
              default:
                if ( fail_cb ) {
                  fail_cb( res )
                } else {
                  console.warn( res.statusCode )
                }
            }
          }
      )
    }

    function encode( e ) {
      return e + '=' + encodeURIComponent( sparql.params[e] )
    }

  }

  sparql.http = {
    hostname : 'localhost'
    , port : 8890
    , method : 'GET'
    , path : '/sparql'
    , auth : undefined
    , }

  sparql.FORMAT = {
    HTML : 'text/html'
    , EXCEL : 'application/vnd.ms-excel'
    , XML : 'application/application/sparql-results+xml'
    , JSON : 'application/sparql-results+json'
    , JS : 'application/javascript'
    , NTRIPLES : 'text/plain'
    , RDFXML : 'application/rdf+xml'
    , CSV : 'text/csv'
    , TSV : 'text/tab-separated-values'
    , }

  sparql.params = {
    'default-graph-uri' : ''
    , format : 'text/plain'
    , timeout : 0
    , debug : 'on'
    , }

  return sparql
} )()
