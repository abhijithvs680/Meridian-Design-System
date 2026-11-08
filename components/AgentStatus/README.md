# AgentStatus

An inline activity label for a panel header, record or run list. Use a short action such as “Reviewing invoices” when the active operation is known. Use a small progress meter and a visible step count when the total is known.

Use `.m-agent-status` with a decorative `.m-activity-spinner` for indeterminate work. The spinner stops under reduced motion. Add `.is-idle`, `.is-waiting` or `.is-error` for other states. Amber indicates approval and red indicates failure. Keep those states explicit in text.

Use one polite live region for the changing label. Keep decorative indicators out of the accessibility tree. OpenUI uses `AgentStatus(state, label)`.
