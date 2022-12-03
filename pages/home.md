---
title: home
permalink: /
layout: default
---

<header>
	<img src="assets/logo.svg" alt="" />
	<h1><i>lluna project</i></h1>
</header>

---

**_lluna_** ([/ˈʎu.nə/](https://en.wiktionary.org/wiki/lluna) _lit._ moon) is a personal project, that involves many subjects, with the focus on learning, minimalism and design.

**lluna lang** is _lluna_'s programming language, mainly inspired by [Lisp](<https://en.wikipedia.org/wiki/Lisp_(programming_language)>) and [Lua](<https://en.wikipedia.org/wiki/Lua_(programming_language)>).

---

_Take a look at it!_

```
(
, calculate recursively the factorial of a number
: f (~ n (
    : r
    ? (< 0 n) (
        : r (* n (f (- n 1)))
    )(
        : r 1
    )
))

-> (f 10)
)
```
