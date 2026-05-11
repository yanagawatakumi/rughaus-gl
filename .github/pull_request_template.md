## Summary
- What changed:
- Why:

## PR Type
- [ ] `feature` (regular task)
- [ ] `sync/shopify` (Shopify sync import only)
- [ ] `locales-only` (translation update only)

## Branch / Worktree
- Branch: `codex/<task>-<agent>` or `sync/shopify-YYYYMMDD`
- Local worktree path used for this PR:

## Conflict-Sensitive Files
- [ ] I did **not** edit `templates/index.json` or `config/settings_data.json`
- [ ] If edited, Integrator has reviewed and will do final merge-order control
- [ ] Large `locales/*` update is split into a dedicated PR

## Required Local Check (Theme Check)
Run:

```bash
shopify theme check --path . --fail-level error --output json
```

Paste result:

```json
[]
```

## Notes for Integrator
- Merge dependency / order constraints (if any):
- Related PRs:
