# Expressive pack

An optional motion layer of 23 original components. The core system stays calm and flat. Expressive components add motion where it helps people understand what's happening: an agent working in the background, a result arriving, a milestone reached. Load `components/expressive.css` after `bundle.css`; nothing changes for apps that don't load it.

## When an expressive component is allowed
1. **It explains, reassures or celebrates.** Show agent activity (LivePill, AgentCursor, AgentLoop), make a change legible (RollingNumber, SlidingTabs, ImageCompare) or mark a real milestone (SuccessMoment). Motion for decoration alone is never allowed.
2. **It never carries information on its own.** Every expressive component has a core equivalent (listed in its README) that shows the same facts in text.
3. **One at a time.** At most one looping animation visible per screen (LivePill, AgentOrb, DataFlow, AgentLoop count as looping).
4. **Reduced motion is a first-class state.** Every component has a designed still state under `prefers-reduced-motion`, and frosted surfaces go solid under `prefers-reduced-transparency`.
5. **Not in dense work views.** Keep DataTables, forms and dashboards on core components; use expressive ones at the edges: headers, empty states, onboarding, agent panels, completion moments.

## The pack
| Group | Components |
| --- | --- |
| Agent presence | LivePill, AgentOrb (Meri, the agent character), AgentCursor, AgentTerminal, TextReveal, GenerationReveal |
| Explaining AI | AgentLoop, DataFlow, VectorSearch, ImageCompare |
| Motion on core controls | MorphButton, SlidingTabs, RollingNumber, ProgressRings, Keycaps |
| Touch and spatial | Dock, RadialMenu, CardStack, DateReel |
| Surfaces and moments | SpotlightCard, FrostedPanel, SuccessMoment, TeamSwitcher |

## Motion tokens (in expressive.css)
| Token | Curve | Use |
| --- | --- | --- |
| `--ease-out` | cubic-bezier(.2, .8, .2, 1) | Things arriving: text, tiles, lines drawing |
| `--ease-spring` | cubic-bezier(.34, 1.4, .64, 1) | Things changing size or position: pill, indicator, radial items |
| `--ease-in-out` | cubic-bezier(.65, 0, .35, 1) | Continuous loops: float, breathe, cursor travel |

Durations reuse `duration-fast` / `-base` / `-slow`; longer one-off sequences (rings 1.2s, success ~1.2s) play once.

## Meri, the agent character
Meri is Meridian's own agent character: a slate orb crossed by the meridian arc from the logo, with two eyes. States: idle (floats, blinks), thinking (arc spins, eyes look up), listening (halo breathes), waiting (amber), done (green, eyes smile), error (red). Use Meri for agent empty states, onboarding and the agent panel header. Never give Meri a speech-bubble voice that differs from the agent's: Meri *is* the agent's face, named by the agent's name.

## Generating them
12 Expressive components are in the OpenUI library (LivePill, AgentOrb, MorphButton, RollingNumber, ProgressRings, TextReveal, GenerationReveal, SuccessMoment, AgentLoop, AgentTerminal, Keycaps, ImageCompare). The rest belong to the app shell and are placed by your code. Add the Expressive rules above to the system prompt when you enable them, especially "one looping animation per screen" and "SuccessMoment only for real milestones".
