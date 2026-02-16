# Walk-through - Sanity TypeScript Fix

We are addressing the discrepancy where the IDE shows TypeScript errors for Sanity modules that are actually present and functional (as confirmed by the successful production build).

## Steps

1. **Suppression of IDE errors**: We will add selective `@ts-ignore` comments to the specific import lines that the IDE is failing to resolve correctly.
2. **Configuration Refresh**: We will verify if the `tsconfig.json` requires any path mapping adjustments.
3. **Build Silence**: Ensuring that `npm run build` continues to pass, confirming that these visual fixes don't hide real issues.
