'use client'
import { useEffect, useRef } from "react"
import { useTerminal } from "../hooks/useTerminal"

export function Terminal() {
  const { history, inputValue, maskedInput, handleInputChange, handleSubmit, systemState } = useTerminal()
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <div className="bg-black text-white p-4 font-mono h-screen w-screen overflow-hidden flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-4">
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
              <div className="text-green-500">
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
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-green-500 mr-2">
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
          className="flex-1 bg-transparent outline-none text-green-500"
          aria-label="Terminal input"
        />
      </form>
    </div>
  )
}

