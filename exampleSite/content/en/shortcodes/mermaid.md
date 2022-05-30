---
title: Mermaid
---

[Mermaid](https://mermaidjs.github.io/) is library for generating SVG charts and diagrams from text.

## Example

{{< columns >}}

<!-- prettier-ignore -->
```tpl
{{</* mermaid class="text-center"*/>}}
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
{{</* /mermaid */>}}
```

<--->

<!-- spellchecker-disable -->
<!-- prettier-ignore -->
{{< mermaid class="text-center" >}}
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
{{< /mermaid >}}

<!-- spellchecker-enable -->

{{< /columns >}}

{{< mermaid class="text-center">}}
flowchart TB
c1-->a2
subgraph one
a1-->a2
end
subgraph two
b1-->b2
end
subgraph three
c1-->c2
end
{{< /mermaid >}}
