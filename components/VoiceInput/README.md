# VoiceInput

Voice orb for dictation/voice mode and a speech player for spoken agent output and meeting summaries.

## When to use
Hands-free use (field staff, clinics), listening to summaries.

## Anatomy and variants
`.m-orb` (pulses while listening) with status text; player = solid agent play button, `.m-wave` bars, duration, transcript below.

## States
Idle, listening, processing (shimmer text), speaking; always show the transcript.

## Accessibility
Every audio has a transcript; the orb is a button with a state label; respects reduced motion.

## OpenUI
`VoiceInput(state) · SpeechPlayer(src, transcript)`
