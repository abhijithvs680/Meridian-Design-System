# ContextComposer

Reply in a thread. Starts on one line and grows as the draft wraps.

Load `components/composer.css` and `components/composer.js`. The form emits a bubbling `meridian:compose` event with `text`, `files`, `model`, `mode`, and `context`. Absent controls use Balanced, Ask, no files, and no context. The preview stages a payload locally. Connect the event to your agent runtime for execution.

Enter submits. Shift+Enter adds a line. Escape closes task settings. Stop preserves the draft. The controls inherit the host's light or dark theme.
