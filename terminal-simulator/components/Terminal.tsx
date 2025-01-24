import React from "react"
import { useTerminal } from "../hooks/useTerminal"

export function Terminal() {
  const { history, inputValue, handleInputChange, handleSubmit, systemState, terminalRef } = useTerminal()

  return (
    <div className="bg-black text-white p-4 rounded-lg font-mono h-[600px] w-full max-w-4xl mx-auto overflow-hidden flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-4">
        {history.map((command, index) => (
          <div key={index} className="mb-2">
            <div className="text-green-500">
              {systemState.loggedIn ? "C:\\Users\\mdanaher>" : "$"} {command.input}
            </div>
            {command.output.map((line, lineIndex) => (
              <div
                key={lineIndex}
                className={`whitespace-pre-wrap pl-4 ${command.isWarning && line.includes("MASTER WARN") ? "text-yellow-500" : ""}`}
              >
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-green-500 mr-2">{systemState.loggedIn ? "C:\\Users\\mdanaher>" : "$"}</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 bg-transparent outline-none text-green-500"
          aria-label="Terminal input"
        />
      </form>
    </div>
  )
}

