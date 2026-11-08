# TextReveal

Streaming agent text where each word settles in from a soft blur, so streaming feels calm instead of jittery.

## When to use
Agent answers in AgentMessage while streaming; short headline reveals on agent-generated reports.

## How it works
Wrap words in `.w` spans with an index `--i` inside `.x-reveal`. While streaming, append new words as they arrive; each animates once.

## Motion
520ms per word, 45ms stagger, 3px blur to sharp. Reduced motion: words appear immediately.

## Accessibility
Screen readers get the full sentence via the live region or `aria-label`, never word by word.

## Core equivalent
AgentMessage text.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
