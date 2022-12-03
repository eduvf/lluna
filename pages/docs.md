---
title: docs
permalink: /docs
layout: default
---

# lluna language documentation

All programs in _lluna_ are just a single **expression**, starting with `(` and ending with `)`.

```
() , a perfectly valid lluna program
```

As you can see, **com**ments start with a **com**ma `,` and continue until the end of the line. Almost every keyboard on earth has a dedicated key for this symbol, so use it often to document your code!

Expressions can hold any amount of **atoms** separated by spaces. In _lluna_, atoms can be numbers, strings or keywords. Some implementations might include other types too.

```
(0 1 2 'a' 'b' 'c' x y z)
```

Some notes about atoms:

- In _lluna-js_ there's no distinction between integers and floats, since it uses JavaScript's number type (IEEE 754). Other implementations might have separate `int` and `float` types (based on whether the number has a decimal point or not).
- You can omit obvious zeros in floats. For instance, `-.5` becomes `-0.5`.
- Strings can use `'` or `"` as delimiters. By convention, `'` is used unless the string already uses that character.
- Keywords can include any character except `(`, `)`, `,`, `;`, `'`, `"` or whitespace. They can't start with numbers either.

You can also put expressions within expressions. Note that **expressions will return their last value**. That applies equally to the main program expression.

```
(0 1 (2 3 (4 5 6))) , this will return 6
```

If you want to have **multi**ple inner expressions, _lluna_ has a simple trick: **multi-expressions**. These are created by having a new line right next to the opening parenthesis of an expression. Any line after that will be treated as an inner expression, saving you from typing extra parentheses.

```
(
    0 1 2 , an expression
    x y z , another expression
)
```

Beware that if you put something (an atom or an expression) between the opening parenthesis and the end of the line, the expression will be treated as a regular one (not multi), and new lines will be ignored.

```
(
    1
    2 3
)
, is equivalent to ((1) (2 3))

( 1
    2
    3
)
, is equivalent to (1 2 3)
```

And with that, it's time to introduce an essential core of the language: a function keyword at the beginning of an expression will call that function, passing the rest of elements in that expression as arguments.

```
(func arg1 arg2 arg3)
```