# ConnectorSetup

Connecting a data source or tool for agents: scopes, credentials and a test.

## When to use
Integrations settings, first-run setup, provider keys.

## Anatomy and variants
Card with stepper badge → scope checkboxes (read vs write clearly marked) → masked credential `.m-secret` → Back / Connect. After connect: Test connection result.

## States
Connecting (spinner), connected (success badge, last sync), failed (danger alert with the provider's reason).

## Accessibility
Scopes are real checkboxes with labels; write scopes say they need approval.

## OpenUI
`ConnectorSetup(provider, scopes)`
