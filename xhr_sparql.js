sparql = ( function() {

  var sparql = function( query, win_cb, fail_cb ) {

    if ( !win_cb ) {
      console.error( 'must pass callback' )
      return
    }

    sparql.params.query = query ? query : sparql.params.query

    var params = sparql.getParams()
    var url = sparql.xhr.url
    var xhr = 
      window.XMLHttpRequest ? 
      new XMLHttpRequest() : 
      new ActiveXObject("Microsoft.XMLHTTP");

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
    } else {
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
              /* falls through */
            default:
              if ( fail_cb ) {
                fail_cb( xhr ) 
              } else {
                console.warn( xhr.status )
              }
          }
          break
        default:
          console.warn( xhr.readyState ) 
      }
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
    CONSTRUCT : {
      N3TURTLE : 'text/rdf+n3' ,
      RDFJSON : 'application/rdf+json' ,
      RDFXML : 'application/rdf+xml' ,
      NTRIPLES : 'text/plain' ,
      XHTMLRDFA : 'application/xhtml+xml' ,
      ATOMXML : 'application/atom+xml' ,
      ODATAJSON : 'application/odata+json' ,
      JSONLD : 'application/x-json+ld' ,
      HTMLLIST : 'text/x-html+ul' ,
      HTMLTABLE : 'text/x-html+tr' ,
      HTMLMICRODATA : 'text/html' ,
      MICRODATAJSON : 'application/microdata+json' ,
      CSV : 'text/csv' ,
      TSV : 'text/tab-separated-values' ,
      TRIG : 'application/x-trig' ,
    } ,
  }

  sparql.params = {
    'default-graph-uri' : '' ,
    query : '' ,
    format : 'text/plain' ,
    timeout : 0 ,
    debug : 'on' ,
  }

  sparql.setParams = function ( object ) {
    function setIfDefined( element, index, array ) {
      if ( object[element] ) {
        sparql.params[element] = object[element]
      }
    }
    Object.keys( sparql.params ).forEach( setIfDefined )
    return sparql.params
  }

  sparql.getParams = function () {
    function kv( string ) {
      function encode( string ) {
        return encodeURIComponent( string ).replace( /%20/g, '+' )
      }
      return encode( string ) + '=' + encode( sparql.params[string] )
    }
    return Object.keys( sparql.params ).map( kv ).join( '&' )
  }

  return sparql 
} )()