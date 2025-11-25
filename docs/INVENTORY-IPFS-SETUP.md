# Shard Frontier Inventory & IPFS Setup

This document describes how the Shard Frontier Inventory screen expects NFT metadata and images to be structured, and how to safely rotate IPFS content and the on-chain `baseURI`.

## 1. Metadata & Image Layout (Flat Scheme)

All metadata JSON and images live in a **single flat folder** on IPFS, for example:

```text
/ipfs/<FOLDER_CID>/
  0
  1
  2
  ...
  0.png
  1.png
  2.png
  ...
```

Rules:

- **Token IDs** map directly to metadata filenames:
  - Token ID `0` → metadata file `0`
  - Token ID `1` → metadata file `1`
  - etc.
- Images are simple PNG filenames:
  - Shard #0 → `0.png`
  - Shard #1 → `1.png`
  - Shard #2 → `2.png`
- **No nested folders** such as `json/` or `images/` under the CID.

Each metadata JSON file (e.g. `0`, `1`, `2`) follows the Trait Matrix v1.1 schema, and the `image` field is a **bare filename**, not a full IPFS URL:

```json
{
  "name": "Shard #0",
  "description": "A prototype shard from the early Awakening tests.",
  "image": "0.png",
  "attributes": [
    { "trait_type": "rarity", "value": "Raw" },
    { "trait_type": "functions.primary", "value": "Efficiency" },
    { "trait_type": "functions.secondary", "value": "Capacity" },
    { "trait_type": "finish", "value": "matte amber" },
    { "trait_type": "family_tag", "value": "Solar" },
    { "trait_type": "origin_phase", "value": "Awakening" },
    { "trait_type": "event_tag", "value": "Launch Week" },
    { "trait_type": "display_color", "value": "amber" }
  ]
}
```

## 2. Contract `baseURI` and `tokenURI`

The Shard NFT contract uses a standard `baseURI + tokenId` pattern.

- On-chain `baseURI` should be:

  ```text
  ipfs://<FOLDER_CID>/
  ```

- Then for token ID `N`, `tokenURI(N)` becomes:

  ```text
  ipfs://<FOLDER_CID>/N
  ```

The Inventory screen takes `tokenURI`, rewrites the `ipfs://` prefix using a gateway, and fetches the JSON from there.

## 3. Frontend IPFS Gateway & Environment Variables

The frontend uses two environment variables (in `.env.local`):

```bash
VITE_BASE_TOKEN_URI=ipfs://<FOLDER_CID>/
VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

- `VITE_BASE_TOKEN_URI` is used by Hardhat scripts to update the contract `baseURI`.
- `VITE_IPFS_GATEWAY` is used by the Inventory screen to turn `ipfs://` URLs into HTTP URLs.

When loading metadata and images, the Inventory screen does the following:

1. Calls `tokenURI(id)` on the contract.
2. If the URI starts with `ipfs://`, it strips the prefix and appends it to `VITE_IPFS_GATEWAY`:
   - `ipfs://<FOLDER_CID>/0` → `https://ipfs.io/ipfs/<FOLDER_CID>/0`
3. Fetches the JSON metadata.
4. Reads `meta.image` (bare filename, e.g. `0.png`).
5. Extracts the folder CID from the `tokenURI` and builds the image URL:
   - `https://ipfs.io/ipfs/<FOLDER_CID>/0.png`

## 4. Rotating IPFS Content Safely

To change images or metadata in the future, follow these steps.

### 4.1 Prepare local folder

1. Ensure `docs/metadata/` has your updated flat files:
   - JSON: `0`, `1`, `2`, ...
   - Images: `0.png`, `1.png`, `2.png`, ...
2. Confirm each JSON uses `"image": "<tokenId>.png"` and follows Trait Matrix v1.1.

### 4.2 Upload to IPFS

Using Pinata or another IPFS pinning service:

1. Upload the **contents** of the metadata folder as a single directory (not each file separately).
2. Note the resulting folder CID, e.g. `bafy...xyz`.
3. The final paths will look like:
   - `ipfs://bafy...xyz/0`
   - `ipfs://bafy...xyz/1`
   - `ipfs://bafy...xyz/0.png`

### 4.3 Update `.env.local`

Edit `.env.local` and set:

```bash
VITE_BASE_TOKEN_URI=ipfs://<NEW_FOLDER_CID>/
```

Keep `VITE_IPFS_GATEWAY` as your chosen gateway, e.g. `https://ipfs.io/ipfs/`.

### 4.4 Update on-chain baseURI (Hardhat)

From the project root:

```bash
npx hardhat run scripts/setBaseURI-qm.mjs --network blockdag
```

This script:

- Reads `VITE_BASE_TOKEN_URI` from `.env.local`.
- Calls `setBaseURI` on the Shard NFT contract with the new value.

### 4.5 Verify the update

1. Use the `readTokenURI` script (if present) or a block explorer to check `tokenURI(0)`, `tokenURI(1)`, etc., and confirm they point at the new CID.
2. In the dev app, restart the frontend if needed and open the Inventory screen:
   - Token cards should show the correct images and metadata via the new CID.

## 5. Known Test Tokens

On BlockDAG Awakening Testnet, you may have older test mints whose `tokenURI` points to outdated or missing metadata. The hardened Inventory screen will:

- Still list these shards by token ID.
- Show a fallback message if metadata or image is missing.

For production, prefer minting from a clean CID where all token IDs have valid JSON and images.
