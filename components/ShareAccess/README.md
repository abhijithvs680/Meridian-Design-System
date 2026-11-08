# ShareAccess

Sharing panel: invite people, set roles, see who (and which agents) have access.

## When to use
Dashboards, reports and records that can be shared; agent permissions on a resource.

## Anatomy and variants
Invite row (input + primary) → member rows (avatar, name, role Select) → agents listed with their scope → link access footer.

## States
Pending invites show "Invited" badge; removing access asks in a confirm popover.

## Accessibility
Each role Select is labelled with the person's name. Agents are named as agents, not hidden.

## OpenUI
`ShareAccess(resource, members)`
