"use client"

import { useEffect, useRef } from "react"
import { useTerminal } from "../hooks/useTerminal"

export function Terminal() {
  const { history, inputValue, maskedInput, handleInputChange, handleSubmit, systemState } = useTerminal()
  const terminalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const terminal = terminalRef.current
    const content = contentRef.current

    if (terminal && content) {
      const terminalHeight = terminal.clientHeight
      const contentHeight = content.clientHeight

      if (contentHeight > terminalHeight) {
        const scrollDistance = contentHeight - terminalHeight
        content.style.transform = `translateY(-${scrollDistance}px)`
      }
    }
  }, [contentRef, terminalRef])

  return (
    <div className="bg-black text-white h-screen w-screen flex flex-col p-5 gap-5">
      <div className="w-full border-[5px] border-white">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-09%20at%2011.42.53%E2%80%AFPM-01ABgHCcYnTg0BCqFpPnRYDjwkS3iL.png"
          alt="LENSshell Operating Modes"
          className="w-full"
        />
      </div>
      <div className="flex-1 flex gap-5">
        <div
          ref={terminalRef}
          className="flex-1 p-4 overflow-hidden flex flex-col border-[5px] border-white"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          <div className="flex-1 relative">
            <div
              ref={contentRef}
              className="absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out"
            >
              <div className="mb-4 text-white">
                Lateral Entanglement Navigation System LENSshell
                <br />
                Copyright (C) Imagen Software. All rights reserved.
                <br />
                <br />
                Last Login: Fri Nov 7 23:14:31 on console
                <br />
                Welcome back, Director Peller. Login?
              </div>
              {history.map((command, index) => (
                <div key={index} className="mb-2">
                  {command.input !== "" && (
                    <div style={{ color: "#00E6FA" }}>
                      {command.userPrompt}
                      {command.isUsername
                        ? command.input
                        : command.isPassword
                          ? "*".repeat(command.input.length)
                          : command.input}
                    </div>
                  )}
                  {command.output.map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className={`whitespace-pre-wrap pl-4 ${command.isWarning ? "text-yellow-500" : "text-white"}`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex mt-4">
            <span style={{ color: "#00E6FA" }} className="mr-2">
              {systemState.loginStep === "initial"
                ? systemState.loggedIn
                  ? "C:\\Users\\mdanaher>"
                  : "C:\\Users\\Guest>"
                : ""}
            </span>
            <input
              type="text"
              value={systemState.loginStep === "password" ? maskedInput : inputValue}
              onChange={handleInputChange}
              className="flex-1 bg-transparent outline-none"
              style={{ color: "#00E6FA", fontFamily: "'Share Tech Mono', monospace" }}
              aria-label="Terminal input"
              autoFocus
            />
          </form>
        </div>
        <div className="w-[350px] flex items-start">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-09%20at%2011.44.28%E2%80%AFPM-fGwcu83eufZWH1XAUsu17kj6rxS0qV.png"
            alt="System Status and Debug History"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}

