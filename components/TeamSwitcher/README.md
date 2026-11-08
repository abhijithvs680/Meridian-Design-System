# TeamSwitcher

Workspace / team / client switcher for the top of the sidebar.

## When to use
Multi-tenant apps, agencies serving several clients, separating sandbox and production.

## How it works
`.x-team` trigger (logo tile, name, plan or role) → popover listbox of workspaces with role and a check on the current one → "Create workspace".

## Motion
Standard popover motion.

## Accessibility
Combobox/listbox pattern; logo tiles are decorative next to the visible name; switching announces the new workspace.

## Core equivalent
Select in the sidebar header.

Part of the **Expressive** pack: load `components/expressive.css` after `bundle.css`.
