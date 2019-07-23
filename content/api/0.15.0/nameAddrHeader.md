---
title: SIP.NameAddrHeader | SIP.js
description: The SIP.NameAddrHeader constructor represents the common SIP header format containing a SIP URI and optional display name.
---

# SIP.NameAddrHeader

The SIP.NameAddrHeader constructor represents the common SIP header format containing a SIP URI and optional display name.

* TOC
{:toc}

<div markdown="1" class="dev">

## Dependencies
{: .no_toc}

* SIP.URI
* SIP.Grammar

</div>

## Construction

Construction of a NameAddrHeader is typically managed by a [`SIP.UA`](../ua) when headers are parsed.  However, advanced users may construct NameAddrHeaders manually.

### `new SIP.NameAddrHeader(uri, displayName, parameters)`

Name | Type | Description
-|-|-
`uri` | `String|SIP.URI` | The URI portion of the header. Strings will be parsed with `SIP.URI.parse()`
`displayName` | `String` | The display portion of the NameAddrHeader
`parameters` | `Object` | Key-value pairs (`String` values only) to append to the header as parameters.

## Instance Variables

### `uri`

### `displayName`

<div markdown="1" class="dev">

### `parameters`
{: .no_toc}

`Object` - An internal mapping of parameter names to value.  Parameter keys are all stored as lower case Strings.  Applications should use the get/set/delete/clear methods instead of this property for parameter manipulations.

</div>

## Instance Methods

### `setParam(key, value)`

Creates or replaces the given header parameter with the given value or null if no value is provided.  Unlike URI parameters, NameAddrHeader parameters may have mixed case values.  Keys, however, are coerced to lowercase.

#### Parameters

Name | Type | Description
-----|------|--------------
`key`|`String`|Parameter name
`value`|`String`|Optional parameter value

### `getParam(key)`

Gets the value of the given header parameter. Returns `undefined` if the parameter does not exist in the parameter set.

#### Parameters

Name | Type | Description
-----|------|--------------
`key`|`String`|Parameter name

#### Returns

Type | Description
-|-
`String`|Value of the given header parameter.

### `hasParam(key)`

Verifies the existence of the given header parameter.

#### Parameters

Name | Type | Description
-----|------|--------------
`key`|`String`|Parameter name

#### Returns

Type | Description
-|-
`boolean`|`true` if the parameter exists, `false` otherwise.

### `deleteParam(key)`

Deletes the given parameter from the URI.

#### Parameters

Name | Type | Description
-----|------|--------------
`key`|`String`|Parameter name

#### Returns

Type | Description
-|-
`String` | Value of the deleted header parameter

### `clearParams()`

Removes all of the header parameters.

## Static Methods

### `parse(nameAddrHeader)`

Use the SIP NameAddrHeader Grammar rule to parse a SIP.NameAddrHeader object out of a raw String.

#### Parameters

Name | Type | Description
-|-|-
`nameAddrHeader`|`String`|The raw String to be parsed as a NameAddrHeader

#### Returns

Type | Description
-|-
`SIP.NameAddrHeader`| The parsed `SIP.NameAddrHeader` on success.  Otherwise, `undefined`.
