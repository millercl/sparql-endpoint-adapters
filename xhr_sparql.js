sparql = ( function() {

  var sparql = function( query, win_cb, fail_cb ) {

    if ( !win_cb ) {
      console.error( 'must pass callback' )
      return
    }

    var params = Object.keys( sparql.params ).map( encode ).join( '&' )
      params += '&query=' + encodeURIComponent( query )
    var url = sparql.xhr.url
    var xhr =
      window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");

    xhr.onreadystatechange = ready
    if ( sparql.overrideMimeType ) {
      xhr.sparql.overrideMimeType( sparql.overrideMimeType )
    }
    if ( sparql.xhr.method == 'GET' ) {
      url += '?' + params
    }
    if ( !! sparql.xhr.user && sparql.xhr.pass ) {
      xhr.open(
        sparql.xhr.method,
        url,
        sparql.xhr.async,
        sparql.xhr.user,
        sparql.xhr.pass
      )
    }
    else {
      xhr.open(
        sparql.xhr.method,
        url,
        sparql.xhr.async
      )
    }
    if ( sparql.xhr.method == 'POST' ) {
      xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' )
      xhr.send( params )
    }
    else {
      xhr.send()
    }

    function ready() {
      switch ( xhr.readyState ) {
        case 0:
        case 1:
        case 2:
        case 3:
          break
        case 4:
          switch ( xhr.status ) {
            case 200:
              win_cb( xhr )
              break
            case 400:
            case 500:
            default:
              fail_cb ? fail_cb( xhr ) : console.warn( xhr.status )
          }
          break
        default:
          console.warn( xhr.readyState )
      }
    }

    function encode( e ) {
      return e + '=' + encodeURIComponent( sparql.params[e] )
    }

  }

  sparql.xhr = {
    method : 'GET' ,
    url : 'http://localhost:8890/sparql' ,
    async : true ,
    user : undefined ,
    pass : undefined ,
    overrideMimeType : undefined ,
  }

  sparql.FORMAT = {
    HTML : 'text/html' ,
    EXCEL : 'application/vnd.ms-excel' ,
    XML : 'application/application/sparql-results+xml' ,
    JSON : 'application/sparql-results+json' ,
    JS : 'application/javascript' ,
    NTRIPLES : 'text/plain' ,
    RDFXML : 'application/rdf+xml' ,
    CSV : 'text/csv' ,
    TSV : 'text/tab-separated-values' ,
  }

  sparql.params = {
    'default-graph-uri' : '' ,
    format : 'text/plain' ,
    timeout : 0 ,
    debug : 'on' ,
  }

  return sparql
} )()