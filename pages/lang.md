---
title: lang
permalink: /lang
layout: page

long-title: the lluna programming language
---

> **This page is WIP**
>
> You might find problems with the syntax highlighting and some missing information!

**_lluna lang_** (or simply _lluna_) is a minimalistic programming language that aims to be _easy to implement_ and _easy to use_. It's inspired by [Lua](<https://en.wikipedia.org/wiki/Lua_(programming_language)>) in its simplicity and [Lisp](<https://en.wikipedia.org/wiki/Lisp_(programming_language)>) in its syntax, but still has some unique features that differentiates it from the two.

This page contains a general overview of the language that will enable you to start writing some simple _lluna_ code. However, if you want instead a more in depth explanation of how it works, head on to the [documentation page](docs).

---

## implementations

By itself, _lluna_ is just a language description, and it isn't a program you can run or test directly. For that, you need an [implementation](https://en.wikipedia.org/wiki/Programming_language_implementation), written in another programming language. Currently, the only working implementation of _lluna_ is **_lluna-js_**, written in JavaScript.

You can try this implementation directly from the browser, going to the [playground page](play).

{% include return-to-top.html %}

---

## overview

> This overview assumes you already know a little bit about programming in general.

### comments

Inline **comm**ents start with a **comm**a, and continue until the end of the line.

```
, this does nothing
```

It's possible to create comments that span multiple lines, using three commas to mark the start and the end.

```
,,,
this still
does nothing
at all
,,,
```

> The comma was chosen because almost all keyboards have a dedicated key for it, regardless of language layout. This makes it more comfortable for non-English speakers to type comments, removing the need to press `shift` to access characters like `;` and `/` (both used for comments in other programming languages).

{% include return-to-top.html %}

### expressions

Everything in _lluna_ is accomplished through the use of **expressions**: lists of elements that are evaluated from start to end, _returning the last one_. If the first element happens to be a **function**, then the rest will be evaluated just like before, but passed as **arguments** to that function. Then the returned value of that expression will be that of the function.

Expressions are created with a pair of parentheses `()` and elements within them are separated by spaces. Assuming that `+` is a function that sums its arguments, let's take a look at the following example:

```
(+ 1 2 (+ 3 4) 5)
```

This idea of putting _operators_ (functions) before its _operands_ (arguments) is called [prefix notation](https://en.wikipedia.org/wiki/Polish_notation) and in _lluna_, as well as in other Lisp-like programming languages, it extends to **everything**. This simplifies a lot the syntactic structure of the language, but it has some [(((drawbacks)))](https://xkcd.com/297/)...

In order to reduce the amount of parentheses needed to put multiple expressions within a single expression, _lluna_ has **multi-expressions**. These are triggered _when an opening parenthesis ends a line_. The next lines are then treated as individual nested expressions.

For instance:

```
, this expression
((+ 1 2) (+ 3 4 5))

, is completely equivalent to this multi-expression
(
    + 1 2
    + 3 4 5
)
```

If you want to prevent this behavior, it's simple as putting something between the opening parenthesis and the end of the line.

```
, this is no longer a multi-expression; just a bad formatted expression
( +
    1 2
    + 3 4 5
)

, equivalent to
(+ 1 2 + 3 4 5)
```

{% include return-to-top.html %}

### functions

Functionality like variables, user-defined functions, accessing elements from an array, and so on; they're all done with **functions** just like the `+` in the examples above. Most _lluna_ functions accept technically infinite arguments, and always return some value. This is better illustrated with an example:

```
(
. factorial (~ n (
    ? (< 0 n) (
        * n (factorial (- n 1))
    )(
        1
    )
))

> (factorial 10) , this prints 3628800
)
```

This piece of code calculates the [factorial](https://en.wikipedia.org/wiki/Factorial) of a number, in this case 10, and prints the result to the console. Let's break it down to see how it works.

The function `.` or _var_ creates and assigns a variable. The first argument defines its **name**, and the second one its **value**. In this example, the name is _factorial_, and we're assigning the return value of `(~ n (...))`. The function `~` or _func_ returns, as you may expect, a user-defined function. All the arguments, except for the last one, are the functions' **parameters**. The last argument is its **body**. Here we have just one parameter (`n`).

```
. factorial (~ n (...))
```

The `factorial` function's body contains only the function `?` or _if_. Its arguments follow the structure _condition_ - _consequence_, repeating indefinitely. If a condition returns _true_ (= not _false_, not _0_, or with _length > 0_), then the consequence will be evaluated and returned, and the function will end. Otherwise, execution will jump to the next condition (if any) and continue testing.

> This is functionally the same as an _if -- then -- else if -- then..._ chain in many other programming languages.

If there's an odd number of arguments, the final condition will be treated as an _else_ block and evaluated if none of the previous conditions were _true_.

In our example, the condition is `(< 0 n)`. It checks whether `0` is less than `n`. We could have added more arguments to the function `<` or `lt` (_less than_), and it would return _true_ only if they're in ascending order. Unlike other languages, there's no _more than_ function!

```
? (< 0 n) (
    * n (factorial (- n 1))
)(
    1
)
```

If the condition is _true_, the `?` function will return the result of the expression `* n (factorial (- n 1))`, that is to say, the [product](<https://en.wikipedia.org/wiki/Product_(mathematics)>) of `n` and the result of calling [recursively](https://en.wikipedia.org/wiki/Recursion) `factorial` of `n - 1`. On the other hand, if the condition is _false_, it will return just `1` (remember, if the first element of an expression is _not_ a function, then all the elements will be evaluated and the last one returned; here there's only one element, that is the last too).

Finally, the function `>` or _print_, outputs the returned values of its arguments to the console.

```
> (factorial 10)
```

> Functions with the `>` character generally deal with input and output:
>
> | ---- | ------- |
> | `>` | _print_ |
> | `>.` | _input_ |
> | `>/` | _file_ |

{% include return-to-top.html %}

### types and variables

> WIP

{% include return-to-top.html %}

### tables

Similar to [Lua tables](https://www.lua.org/pil/2.5.html), _lluna_ tables can act like arrays or hash maps. However, there are some differences with their _Lua_ counterparts:

-   tables are zero indexed when used as an array (e.g. the first item has an index of `0`)
-   negative numbers can be used on array tables to start indexing from the end (e.g. an index of `-1` refers to the last item)
-   tables can only use either _indexes_ or _keys_, not both at the same time

The last distinction determines whether the table is going to have an internal _array_ or _map_ structure. An _array table_ accesses its items through **integer indexes** (with no gaps in between), while a _map table_ uses string keys that don't have an inherent order.

Tables are constructed with square brackets `[]`. In an _array table_, items placed sequentially, separated by spaces, just like elements within expressions; while in a _map table_ a dot `.` has to precede each _key-value_ pair. After creating the table, items can be added, modified or removed using the function `#` or _tab_. This same function can be as well to get its size (number of items or key-value pairs).

> String keys can omit their quotes if they start with a lower case letter and don't contain whitespace.

```
, top 5 languages by total number of speakers
. languages ['English' '官话' 'हिन्दी' 'español' 'français']

, L1 and L2 speakers per language
. number_speakers [
    . 'English'		[. iso 'en' . l1 372_900_000 . l2 1_080_000_000]
    . '官话'			[. iso 'cn' . l1 929_000_000 . l2   198_700_000]
    . 'हिन्दी'			[. iso 'hi' . l1 343_900_000 . l2   258_300_000]
    . 'español'		[. iso 'es' . l1 474_700_000 . l2    73_600_000]
    . 'français'	[. iso 'fr' . l1  79_900_000 . l2   194_200_000]
]

, access values
# languages     , returns 5
# languages 0   , returns 'English'

# languages 0 'english'     , modifies the first item
# languages -1 'العربية'    , adds a sixth item

, the resulting table: ['english' '官话' 'हिन्दी' 'español' 'français' 'العربية']
```

{% include return-to-top.html %}
