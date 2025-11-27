import React from 'react'
import instructionsBg from '../instructions.png'

const Instructions = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <div
        className="sf-canvas"
        style={{
          position: 'relative',
        }}
      >
        <img
          src={instructionsBg}
          alt="Game Instructions"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#000',
          }}
        />

        {/* Invisible back button in the usual top-left/title band area */}
        <button
          onClick={() => window.history.back()}
          style={{
            position: 'absolute',
            top: '13%',
            left: '4%',
            width: '18%',
            height: '6%',
            background: 'transparent',
            border: 'none',
            color: 'transparent',
            cursor: 'pointer',
            zIndex: 3,
          }}
        >
          Back
        </button>

        {/* Scrollable text area filling page below top ~10% */}
        <div
          style={{
            position: 'absolute',
            top: '22%',
            left: '12%',
            right: '12%',
            bottom: '24%',
            padding: '8px 10px',
            background: 'rgba(0,0,0,0.55)',
            borderRadius: 10,
            border: '1px solid rgba(126,252,255,0.75)',
            boxShadow: '0 0 16px rgba(0,255,255,0.7)',
            overflowY: 'auto',
            color: '#e5f9ff',
            fontSize: 10,
            lineHeight: 1.3,
            zIndex: 4,
          }}
        >
          <h2 style={{ fontSize: 12, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Shard Frontier — Quick Guide
          </h2>
          <p style={{ margin: '0 0 6px' }}>
            Long dormant worlds are waking. You arrive at an outpost on DAG-9 with a basic rig and
            a scanner. In <strong>Shard Frontier</strong>, you earn value by running tight loops:
            collect → forge → combine → mint.
          </p>

          <h3 style={{ fontSize: 11, margin: '6px 0 3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            1) Core Loop
          </h3>
          <ol style={{ paddingLeft: '14px', margin: '0 0 6px' }}>
            <li>Deploy to a mission (ground or hover).</li>
            <li>Collect ore: Dust / Alloy / Crystal / Relic.</li>
            <li>Return to base → <strong>Refine</strong> ore into shards.</li>
            <li><strong>Combine</strong> shards for stronger combined shards and rare mutations.</li>
            <li>Trade combined shards or <strong>mint</strong> NFTs when eligible.</li>
            <li>Mount up to 3 NFTs to tune your loadout and chase leaderboards/events.</li>
          </ol>
          <p style={{ margin: '0 0 6px' }}>
            Rarity ladder (color feel): Raw Amber → Refined metallic → Rare teal/blue → Legendary
            iridescent.
          </p>

          <h3 style={{ fontSize: 11, margin: '6px 0 3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            2) Mobile Controls
          </h3>
          <ul style={{ paddingLeft: '14px', margin: '0 0 6px' }}>
            <li>Move / Steer: left thumb drag.</li>
            <li>Boost / Gunner: right-side action buttons (hover missions).</li>
            <li>Interact / Confirm: tap on-screen icons.</li>
            <li>Pause / Settings: menu in the top-right.</li>
            <li>Swipe left/right between rooms; scroll vertically inside a room.</li>
          </ul>

          <h3 style={{ fontSize: 11, margin: '6px 0 3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            3) Key Rooms
          </h3>
          <p style={{ margin: '0 0 4px' }}>
            The base is organized as vertical "cards" you swipe between. Important rooms:
          </p>
          <ul style={{ paddingLeft: '14px', margin: '0 0 6px' }}>
            <li>
              <strong>Profile Bay</strong> – Pilot info, play time, wallet link. Link your wallet to
              use Mounted NFTs.
            </li>
            <li>
              <strong>Forge Bay</strong> –
              <em>Refine</em> ore into shards and <em>Combine</em> shards into combined shards. Small
              chances for power bumps or cosmetic shifts when you combine.
            </li>
            <li>
              <strong>Vehicle Garage</strong> – Upgrade drill, cargo, reactor, scanner and mobility
              to speed up runs and carry more.
            </li>
            <li>
              <strong>Hover Bay</strong> – Flight missions (Survey, Tempest, Courier, Hunt) once
              unlocked.
            </li>
            <li>
              <strong>Map Room</strong> – Pick zones like Dunes Basin or Crystal Plains and watch
              for node glows that hint at better ore.
            </li>
            <li>
              <strong>Medal Cabinet</strong> – Mount up to 3 NFTs for capped perks; display
              non-tradable medals and Awards.
            </li>
            <li>
              <strong>Marketplace</strong> – Trade machine parts and combined shards on BDAG testnet.
            </li>
            <li>
              <strong>Leaderboards & Events</strong> – See ranked runs, seasonal events and special
              Award drops.
            </li>
          </ul>

          <h3 style={{ fontSize: 11, margin: '6px 0 3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            4) Mining & Missions
          </h3>
          <p style={{ margin: '0 0 4px' }}>
            <strong>Ground mining</strong>: follow shimmer and scanner pings to ore nodes, use tools
            to pull out Dust, Alloy, Crystal and Relic. Return when your silo is full or energy runs
            low.
          </p>
          <p style={{ margin: '0 0 6px' }}>
            <strong>Hover missions</strong>: quick flights that scan terrain, dodge storms or deliver
            cargo. Certain event missions slightly boost chances of rare finds or cosmetic shifts.
          </p>

          <h3 style={{ fontSize: 11, margin: '6px 0 3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            5) Crafting & Minting
          </h3>
          <ul style={{ paddingLeft: '14px', margin: '0 0 6px' }}>
            <li>
              <strong>Ore → Shards</strong>: Dust / Alloy / Crystal / Relic map into Raw / Refined /
              Rare / Legendary shard potential.
            </li>
            <li>
              <strong>Combine</strong>: pick 2–3 shards to create a combined shard. This is where
              small power bumps and rare cosmetic mutations can trigger.
            </li>
            <li>
              <strong>Mint</strong>: when rules allow, combined shards can be minted as NFTs on BDAG
              (and optionally mirrored elsewhere) with simple metadata: rarity, functions, finish,
              origin and event tags.
            </li>
          </ul>

          <h3 style={{ fontSize: 11, margin: '6px 0 3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            6) Wallet & Loadouts
          </h3>
          <ul style={{ paddingLeft: '14px', margin: '0 0 6px' }}>
            <li>
              Link your wallet in <strong>Profile Bay</strong> to mount NFTs and trade on the
              marketplace.
            </li>
            <li>
              Up to <strong>3 Mounted NFTs</strong> can be equipped. They buff mining, flight or
              quality-of-life stats, but all perks sit behind clear caps.
            </li>
            <li>
              <strong>Award NFTs</strong> are rare prestige items. Only one can be mounted and it may
              add a small, tightly bounded boost for a named stat.
            </li>
          </ul>

          <h3 style={{ fontSize: 11, margin: '6px 0 3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            7) Troubleshooting (Demo)
          </h3>
          <ul style={{ paddingLeft: '14px', margin: 0 }}>
            <li>Inventory full? Refine ore or upgrade your silo.</li>
            <li>No mutations for a while? Some systems gently raise your odds over time.</li>
            <li>
              Can&apos;t mint? Make sure you have a combined shard and the current phase allows
              minting.
            </li>
            <li>
              Perks not changing? You may already be at or near a cap; check the effective stats in
              the UI.
            </li>
          </ul>

          <h3 style={{ fontSize: 11, margin: '6px 0 3px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            8) Glossary
          </h3>
          <ul style={{ paddingLeft: '14px', margin: 0 }}>
            <li>
              <strong>Ore</strong>: Dust / Alloy / Crystal / Relic gathered in missions.
            </li>
            <li>
              <strong>Shard</strong>: crafted item (Raw, Refined, Rare, Legendary).
            </li>
            <li>
              <strong>Combined Shard</strong>: result of Combine; tradable and mint-eligible.
            </li>
            <li>
              <strong>Mutation</strong>: small power or cosmetic change that can happen on Combine.
            </li>
            <li>
              <strong>Mounted NFTs</strong>: up to 3 equipped NFTs that grant perks.
            </li>
            <li>
              <strong>Award NFT</strong>: limited prestige NFT, sometimes with a small, bounded
              cap-breaker.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Instructions
