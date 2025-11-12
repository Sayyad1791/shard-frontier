import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import StartScreen from './assets/screens/StartScreen'
import Home from './assets/screens/Home'
import Dashboard from './assets/screens/Dashboard'
import Forge from './assets/screens/Forge'
import Refine from './assets/screens/Refine'
import NFTForge from './assets/screens/NFTForge'
import Garage from './assets/screens/Garage'
import Mission from './assets/screens/Mission'
import Combine from './assets/screens/Combine'
import Profile from './assets/screens/Profile'
import HoverBay from './assets/screens/HoverBay'
import Medals from './assets/screens/Medals'
import Map from './assets/screens/Map'


const HomeLegacy = () => {
  const { open } = useWeb3Modal()

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Shard Frontier</h1>
      <p className="mb-4">The journey to mine, earn, and forge begins here.</p>
      <button onClick={() => open()} className="bg-blue-600 text-white px-4 py-2 rounded">
        Connect Wallet
      </button>
      <div className="mt-4">
        <Link to="/dashboard" className="underline text-blue-400">Start Mining</Link>
      </div>
    </div>
  )
}

const DashboardLegacy = () => {
  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected) {
        const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL)
        const bal = await provider.getBalance(address)
        setBalance(ethers.formatEther(bal))
      }
    }

    fetchBalance()
    const interval = setInterval(fetchBalance, 15000)
    return () => clearInterval(interval)
  }, [address, isConnected])

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Dashboard</h2>
      {isConnected ? (
        <>
          <p>Address: {address}</p>
          <p>Balance: {balance} SHARD</p>
          <div className="mt-4">
            <Link to="/mine" className="underline text-blue-400">Mine SHARD</Link>
          </div>
        </>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  )
}

const Mine = () => {
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)

  const mine = () => {
    setProgress(0)
    setResult(null)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          const reward = Math.random() > 0.5 ? '🔷 SHARD +10' : '🪙 Found an NFT!'
          setResult(reward)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Mine Level 1</h2>
      <div className="w-full bg-gray-300 h-4 rounded mb-2">
        <div className="bg-green-500 h-4 rounded" style={{ width: `${progress}%` }} />
      </div>
      <button onClick={mine} className="bg-green-700 text-white px-4 py-2 rounded mt-2">
        Mine SHARD
      </button>
      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  )
}

function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [pwd, setPwd] = useState('')
  const requiredPass = import.meta.env.VITE_PREVIEW_PASS || 'biggames01'

  useEffect(() => {
    if (localStorage.getItem('previewUnlocked') === '1') setUnlocked(true)
  }, [])

  const tryUnlock = () => {
    if (pwd === requiredPass) {
      setUnlocked(true)
      localStorage.setItem('previewUnlocked', '1')
    }
  }

  if (!unlocked) {
    return (
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85), rgba(0,0,0,0.95))', zIndex: 9999 }}>
        <div style={{ padding: '24px 28px', border: '2px solid rgba(0,255,255,0.85)', boxShadow: '0 0 18px rgba(0,255,255,0.6)', borderRadius: 12, background: 'rgba(0,0,0,0.6)', color: '#7efcff', minWidth: 'min(90vw, 420px)', textAlign: 'center' }}>
          <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, textShadow: '0 0 12px rgba(0,255,255,0.9)' }}>Enter Preview Password</div>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') tryUnlock() }}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(0,255,255,0.8)', background: 'rgba(0,0,0,0.4)', color: '#7efcff', outline: 'none', marginBottom: 12 }}
            aria-label="Preview password"
          />
          <button
            onClick={tryUnlock}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(0,255,255,0.9)', background: 'transparent', color: '#7efcff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', textShadow: '0 0 10px rgba(0,255,255,0.8)' }}
          >
            Unlock
          </button>
          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 10 }}>Protected preview</div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forge" element={<Forge />} />
        <Route path="/refine" element={<Refine />} />
        <Route path="/nft-forge" element={<NFTForge />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/combine" element={<Combine />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hover" element={<HoverBay />} />
        <Route path="/medals" element={<Medals />} />
        <Route path="/map" element={<Map />} />
        <Route path="/mine" element={<Mine />} />
      </Routes>
    </Router>
  )
}

export default App
