"use client"

import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"

interface Line {
  x: number
  y: number
  length: number
  angle: number
  speed: number
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Use non-null assertion for context since we check it immediately
    const ctx = canvas.getContext("2d")!
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Line parameters
    const lines: Line[] = []
    const numberOfLines = 50
    const speed = 0.5
    const lineLength = 100
    const lineWidth = 0.3

    // Create initial lines
    for (let i = 0; i < numberOfLines; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: lineLength,
        angle: Math.random() * Math.PI * 2,
        speed: speed * (Math.random() * 0.5 + 0.5),
      })
    }

    let animationFrameId: number

    // Animation function
    function animate() {
      if (!canvas || !ctx) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(75, 85, 99, 0.3)"
      ctx.lineWidth = lineWidth

      lines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        const endX = line.x + Math.cos(line.angle) * line.length
        const endY = line.y + Math.sin(line.angle) * line.length
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Move line
        line.x += Math.cos(line.angle) * line.speed
        line.y += Math.sin(line.angle) * line.speed

        // Wrap around screen
        if (line.x < -line.length) line.x = canvas.width + line.length
        if (line.x > canvas.width + line.length) line.x = -line.length
        if (line.y < -line.length) line.y = canvas.height + line.length
        if (line.y > canvas.height + line.length) line.y = -line.length

        // Slightly change angle for organic movement
        line.angle += (Math.random() - 0.5) * 0.01
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", setCanvasSize)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const projects = [
    {
      title: "Decentralised App",
      description: "A decentralized App platform built on Solana.",
      technologies: ["Solidity", "React.js", "Web3.js", "Hardhat"],
      image: "/dApp.png?height=600&width=800",
      codeUrl: "https://github.com/technicalkuldeep/dApp",
      demoUrl: "https://d-app-psi.vercel.app/tps://defi-exchange.vercel.app",
    },
    {
      title: "W3W [Web3 Wallet]",
      description: "Solana Wallet Generation .",
      technologies: ["Next.js", "Ethereum", "IPFS", "TypeScript"],
      image: "/wallet.png",
      codeUrl: "https://github.com/technicalkuldeep/W3W",
      demoUrl: "https://wallet.gihtub.in",
    },
  ] as const

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Kuldeep
          </h1>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl text-gray-400">Web3 Developer</h2>
            <span className="inline-flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-green-500">Online</span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gray-900/30 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link
                    href={project.codeUrl}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                  >
                    <Github size={20} />
                    Code
                  </Link>
                  <Link
                    href={project.demoUrl}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

