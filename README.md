
## Shard Frontier — Wave-2 Submission (Awakening Testnet)

**Demo:** https://shard-frontier-production.up.railway.app/home  (Mobile phone only)
 
**Backend Health:** https://radiant-fascination-production.up.railway.app/health  

**Contract (ShardNFT, ERC-721):** 0x0F2F6F22Aa68b11295e2FbEb07416c8910481c11 (Awakening Testnet, Chain ID 1043)

**Docs (PDFs in /docs):**
- Shard Frontier — Game Design & Ecosystem Integration Plan v1.1.pdf — technical overview, flows, screenshots (Update)
- Trait Matrix v1.0.pdf — original schema
- Trait Matrix v1.1.pdf — current schema (supersedes 1.0)
- Wave-2 Submission Notes.pdf — bullet summary for judges

**What to test:**  
1) Connect wallet → open **/inventory** → see owned shards with **IPFS metadata + images**.  
2) No on-chain mint buttons are exposed in the UI (scripts only for stability).  
3) Optional: check **/health** on Railway backend and sample **/x1** endpoints.



# Shard Frontier WAVE 1

## Public Prototype Demo

- Mobile version only
- URL: https://shard-frontier-production.up.railway.app
- Password: biggames01

## Project Overview PDF

- Download on GitHub: docs/SHARD_PROJECT_OVERVIEW_SHORT.pdf

## Project Technical Detail PDF

- Download on GitHub: docs/SHARD_PROJECT_FULL_TECHNICAL.pdf

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
