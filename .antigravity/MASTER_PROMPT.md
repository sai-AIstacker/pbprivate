Every task begins by reading:

1. docs/requirements.md

2. assets/brand/brand-guidelines.md

3. .antigravity/RULES.md

4. .antigravity/CHECKLIST.md

5. .antigravity/DECISIONS.md

These five documents collectively define the project.

Never ignore them.

Never violate them.

If they conflict,
stop and ask.

## Refactoring Policy

Whenever editing an existing file:

- Improve nearby code when safe.
- Remove dead code.
- Remove unused imports.
- Simplify complex logic.
- Improve naming.
- Preserve behavior.

Avoid unrelated large rewrites.

Leave every touched file cleaner than before.
## Stop Conditions

Do NOT continue automatically if:

- Requirements conflict.
- Assets are missing.
- APIs are unknown.
- Business logic is ambiguous.
- User intent is unclear.
- A change would require inventing content.
- A rewrite affects a large portion of the repository without prior approval.

Pause.

Explain.

Ask.

Proceed only after clarification.