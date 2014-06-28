---
title: Grammar | SIP.js
description: TODO
---

# SIP.Grammar

TODO - description

* TOC
{:toc}

<div markdown="1" class="dev">

## Dependencies
{: .no_toc }

* SIP.URI
* SIP.NameAddrHeader

</div>

## Instance Attributes

### `SyntaxError`

A constructor for errors which are thrown due to grammar parsing failure.

## Methods

### `parse(input, startRule)`

Parse a String `input` according to the rule `startRule`.

#### Parameters

Name | Type | Description
-|-|-
`input` | `String` | The String to parse according to the Grammar.
`startRule` | `String` | The name of the grammar rule to parse the input against.

#### Returns

Type | Description
-|-
`Object|Integer` | The data parsed, or -1 if the input failed to parse.
