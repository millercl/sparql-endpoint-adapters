# sparql-endpoint-adapters
> configure and request queries, for node and browsers

Enumerates URL parameter options and defines an asynchronous callback method for requests over HTTP.
See the [SPARQL 1.1 Protocol W3C Recommendation](https://www.w3.org/TR/sparql11-protocol/) for more about endpoints.
Tested against [OpenLink Virtuoso](https://github.com/openlink/virtuoso-opensource).

## API

### `sparql.FORMAT`
Enumerated constant values for the return MIME type.
Set `sparql.params.format`.
Server should return this value in the `'content-type'` header.
```js
sparql.params.format = sparql.FORMAT.NTRIPLES
```
Name | Value
:--- | ----
HTML | `'text/html'`
EXCEL | `'application/vnd.ms-excel'`
XML | `'application/application/sparql-results+xml'`
JSON | `'application/sparql-results+json'`
JS | `'application/javascript'`
NTRIPLES | `'text/plain'`
RDFXML | `'application/rdf+xml'`
CSV | `'text/csv'`
TSV | `'text/tab-separated-values'`

#### `sparql.FORMAT.CONSTRUCT`
MIME types only for `CONSTUCT` queries.

Name | Value
:--- | -----
N3TURTLE | `'text/rdf+n3'`
RDFJSON | `'application/rdf+json'`
RDFXML | `'application/rdf+xml'`
NTRIPLES | `'text/plain'`
XHTMLRDFA | `'application/xhtml+xml'`
ATOMXML | `'application/atom+xml'`
ODATAJSON | `'application/odata+json'`
JSONLD | `'application/x-json+ld'`
HTMLLIST | `'text/x-html+ul'`
HTMLTABLE | `'text/x-html+tr'`
HTMLMICRODATA | `'text/html'`
MICRODATAJSON | `'application/microdata+json'`
CSV | `'text/csv'`
TSV | `'text/tab-separated-values'`
TRIG | `'application/x-trig'`
