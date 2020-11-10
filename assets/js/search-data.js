'use strict';

(function() {
  const indexCfg = {{ with .Scratch.Get "geekdocSearchConfig" }}
    {{ . | jsonify}};
  {{ else }}
   {};
  {{ end }}

  indexCfg.doc = {
    id: 'id',
    field: ['title', 'content'],
    store: ['title', 'href', 'parent'],
  };

  const index = FlexSearch.create(indexCfg);
  window.geekdocSearchIndex = index;

  {{ range $index, $page := .Site.Pages }}
  index.add({
    'id': {{ $index }},
    'href': '{{ $page.RelPermalink }}',
    'title': {{ (partial "title" $page) | jsonify }},
    'parent': {{ with $page.Parent }}{{ (partial "title" .) | jsonify }}{{ else }}''{{ end }},
    'content': {{ $page.Plain | jsonify }}
  });
  {{- end -}}
})();
