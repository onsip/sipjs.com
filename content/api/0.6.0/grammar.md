---
title: Grammar | SIP.js
description: SIP.Grammar is a formal grammar for parsing SIP requests, responses, headers, and other structures. SIP.js uses SIP.Grammar for parsing SIP messages for WebRTC.
---

# SIP.Grammar

The SIP Grammar provides rules and parsing mechanisms for SIP requests, responses, headers, and other structures. SIP.js makes use of the Grammar when parsing incoming messages. The Grammar is written using [PEG.js v0.8.0](http://pegjs.majda.cz/) and compiled for size optimization.

*If you are making source code changes to SIP.Grammar, be sure to run `grunt grammar` to rebuild the processed JavaScript file.*

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
