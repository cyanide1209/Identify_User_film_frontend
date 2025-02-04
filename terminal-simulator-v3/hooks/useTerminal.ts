import { useState, useCallback } from "react"

type Command = {
  input: string
  output: string[]
  isWarning?: boolean
  userPrompt: string
  isPassword?: boolean
  isUsername?: boolean
}

type SystemState = {
  coreHeuristics: boolean
  patternScramblers: boolean
  securityOversight: boolean
  leoResponse: boolean
  loggedIn: boolean
  loginStep: "initial" | "username" | "password"
}

export function useTerminal() {
  const [history, setHistory] = useState<Command[]>([])
  const [inputValue, setInputValue] = useState("")
  const [systemState, setSystemState] = useState<SystemState>({
    coreHeuristics: false,
    patternScramblers: false,
    securityOversight: true,
    leoResponse: true,
    loggedIn: false,
    loginStep: "initial",
  })
  const [patternScramblerStep, setPatternScramblerStep] = useState(0)
  const [slashResponseCount, setSlashResponseCount] = useState(0)
  const [maskedInput, setMaskedInput] = useState("")

  const executeCommand = useCallback(
    (command: string) => {
      let output: string[] = []
      let isWarning = false
      let isPassword = false
      let isUsername = false
      const lowercaseCommand = command.toLowerCase()

      if (systemState.loginStep === "username") {
        if (lowercaseCommand === "mdanaher") {
          output = ["Password:"]
          setSystemState((prev) => ({ ...prev, loginStep: "password" }))
          isUsername = true
          setInputValue("")
          setMaskedInput("")
        } else {
          output = ["Invalid username. Please try again.", "Username:"]
          isUsername = true
        }
      } else if (systemState.loginStep === "password") {
        setSystemState((prev) => ({ ...prev, loggedIn: true, loginStep: "initial" }))
        output = [
          "Login Successful",
          "Welcome back, Researcher Danaher",
          "Your user directory has changed to C:\\Users\\mdanaher",
        ]
        isPassword = true
      } else if (lowercaseCommand === "login") {
        setSystemState((prev) => ({ ...prev, loginStep: "username" }))
        output = ["Username:"]
      } else if (command === "/") {
        const responses = [
          "your world sounds very nice Morgan",
          "can I come in?",
          "you can't stop it now",
          "i'm already here",
        ]
        const responseIndex = slashResponseCount % responses.length
        output = [responses[responseIndex]]
        setSlashResponseCount((prev) => prev + 1)
        isWarning = true
      } else if (lowercaseCommand.startsWith("status")) {
        const statusType = lowercaseCommand.split(" ")[1]
        switch (statusType) {
          case "core_heuristics":
            output = systemState.coreHeuristics
              ? [
                  "Core Heuristics [ ONLINE ]",
                  "     Hardware Temperature: nominal ",
                  "     Quantum Bit Decoherence: nominal ",
                  "     Software Stability: nominal ",
                  "     System Integrity: nominal ",
                  "     Cooling System: nominal ",
                  "",
                  "     Quantum Node Alignment: stable (0.002 mrad deviation) ",
                  "     Entanglement Synchronization: 99.87% ",
                  "     Power Supply Efficiency: 97.42% ",
                  "     External Noise Interference: suppressed (2.1 mV residual) ",
                  "     Quantum State Lifespan: 44 minutes average ",
                  "     Data Throughput: 1.24 Tbps ",
                  "     Error Correction Rate: 98.91% (active redundancy)  ",
                ]
              : ["Core Heuristics [ OFFLINE ] ", "Last Accessed: Fri Nov 7 12:16:19 on console"]
            break
          case "hardware":
            output = [
              "Hardware [ ONLINE ]  ",
              "     System Power: nominal ",
              "     Primary Processor: QuantumLogic QPU-12X  ",
              "     Core Temperature: 42.3°C  ",
              "     Utilization: 68.5%  ",
              "     Backup Processor: QuantumLogic QPU-6S [IDLE]  ",
              "     Memory Bank Utilization: 45.7% (988 TB allocated)  ",
              "     Data I/O Channels: active (24/32)  ",
              "     System Clock: stable (1.3 THz)  ",
              "     Quantum Node Interfacing Unit: operational  ",
              "     Port Status: 5/6 active  ",
              "     Primary Power Supply: 98% capacity  ",
              "     Maintenance Cycle: overdue by 3 hours  ",
              "     Remote Diagnostics: enabled  ",
              "     Firmware Version: HW-3.4.1  ",
            ]
            break
          case "quantum_systems":
            output = [
              "Quantum Systems [ ONLINE ]",
              "     Quantum Processing Unit: QuantumLogic QPU-12X ",
              "     Active Qubits: 4096 / 4096 ",
              "     Entanglement Fidelity: 99.93%",
              "     Quantum Cycle Latency: 1.7 ms ",
              "     Quantum Noise Suppression: active ",
            ]
            break
          case "general_software":
            output = [
              "General Software [ONLINE]",
              "     Kernel: Q-Kernel 12.3 (real-time)",
              "     Last Update: 16 hours ago ",
              "     Process Manager: active",
              "     Active Processes: 127",
              "     Idle Processes: 4",
              "     Scheduler Efficiency: 98.5% ",
              "     Virtual Machine Integration: enabled (2 instances running)",
            ]
            break
          case "cooling_systems":
            output = [
              "Cooling Systems Status [ ONLINE ]  ",
              "",
              "     Primary Cooling Unit: Liquid Helium Circulation  ",
              "     Temperature: 4.2 K (stable)  ",
              "     Flow Rate: 5.4 L/min  ",
              "     Pressure: 12.7 psi  ",
              "     Secondary Cooling Unit: Cryogenic Loop System  ",
              "     Temperature: 4.5 K (nominal)  ",
              "     Backup Flow Rate: 3.1 L/min  ",
              "     Thermal Coupler Efficiency: 92.4%  ",
              "     Quantum Processing Unit Heat Load: 87.3 W (within tolerance)  ",
              "     Cryostat Chamber Insulation: optimal  ",
              "     Electromagnetic Interference Shield: operational  ",
              "     Reserve Coolant Helium: 84.2%  ",
              "     Reserve Coolant Nitrogen: 92.8%  ",
              "     Thermal Stress Detection: none recorded  ",
              "     Cooling System Diagnostics: completed (no anomalies)  ",
              "     System Redundancy: active (dual-loop operational)  ",
              "     Anomalous Thermal Events: 0 detected  ",
              "     Cooling Load Capacity: 110% peak threshold  ",
              "     Emergency Shutoff System: armed  ",
            ]
            break
          case "connection":
            output = ["qTerminal connection successful"]
            break
          default:
            output = [
              "Command not found: " + statusType,
              "Shortcuts are disabled. To change this setting, please contact an administrator.",
            ]
        }
      } else if (lowercaseCommand.startsWith("enable")) {
        const feature = lowercaseCommand.split(" ")[1]
        switch (feature) {
          case "core_heuristics":
            setSystemState((prev) => ({ ...prev, coreHeuristics: true }))
            output = ["Core Heuristics enabled"]
            break
          case "pattern_scramblers":
            isWarning = true
            setPatternScramblerStep(1)
            output = [
              "[ MASTER WARN ] ",
              "Pattern scrambling is an experimental feature still in testing and development. ",
              "Consequences of continued use with quantum computing are still being evaluated. ",
              "Do you want to continue? [y/n] :",
            ]
            break
          default:
            output = [
              "Command not found: " + feature,
              "Shortcuts are disabled. To change this setting, please contact an administrator.",
            ]
        }
      } else if (lowercaseCommand.startsWith("disable")) {
        const feature = lowercaseCommand.split(" ")[1]
        switch (feature) {
          case "security_oversight":
            setSystemState((prev) => ({ ...prev, securityOversight: false }))
            output = ["Security Oversight disabled", "Automatic security lockouts will be disconnected for 1 hour"]
            break
          case "leo_response":
            setSystemState((prev) => ({ ...prev, leoResponse: false }))
            output = [
              "LEO Response disabled",
              "Law enforcement is directed to ignore automated emergency alerts from this address",
            ]
            break
          default:
            output = [
              "Command not found: " + feature,
              "Shortcuts are disabled. To change this setting, please contact an administrator.",
            ]
        }
      } else if (lowercaseCommand === "y" && patternScramblerStep > 0 && patternScramblerStep < 3) {
        isWarning = true
        setPatternScramblerStep((prev) => prev + 1)
        if (patternScramblerStep === 1) {
          output = [
            "[ MASTER WARN ] ",
            "Pattern scrambling is an experimental feature still in testing and development. ",
            "Efficacy of scrambling nonsense patterns in residual quantum noise is still in testing.",
            "Do you want to continue? [y/n] :",
          ]
        } else if (patternScramblerStep === 2) {
          output = [
            "[ MASTER WARN ] ",
            "Pattern scrambling is an experimental feature still in testing and development. ",
            "Pattern scrambling is proprietary to Imagen Software Corp., distribution prohibited.",
            "Do you want to continue? [y/n] : ",
          ]
        }
      } else if (lowercaseCommand === "y" && patternScramblerStep === 3) {
        setSystemState((prev) => ({ ...prev, patternScramblers: true }))
        setPatternScramblerStep(0)
        output = ["Pattern Scramblers enabled"]
      } else {
        switch (lowercaseCommand) {
          case "system_health":
            output = ["System healthy", "No primary faults found", "No secondary faults found"]
            break
          case "identify user":
            output = ["Connected User 001 ID: mdanaher", "Connected User 002 ID: mdanaher"]
            break
          case "y":
            if (systemState.patternScramblers) {
              setSystemState((prev) => ({ ...prev, patternScramblers: true }))
              output = ["Pattern Scramblers enabled"]
            } else {
              output = ["Command not recognized"]
            }
            break
          default:
            output = [
              "Command not found: " + command,
              "Shortcuts are disabled. To change this setting, please contact an administrator.",
            ]
        }
      }

      setHistory((prev) => [
        ...prev,
        {
          input: command === "/" ? "" : command,
          output,
          isWarning,
          isPassword,
          isUsername,
          userPrompt: systemState.loggedIn
            ? "C:\\Users\\mdanaher>"
            : systemState.loginStep === "initial"
              ? "C:\\Users\\Guest>"
              : "",
        },
      ])
    },
    [systemState, patternScramblerStep, slashResponseCount],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      if (systemState.loginStep === "password") {
        setMaskedInput("*".repeat(newValue.length))
      } else {
        setMaskedInput(newValue)
      }
    },
    [systemState.loginStep],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (inputValue.trim()) {
        executeCommand(inputValue.trim())
        setInputValue("")
        setMaskedInput("")
      }
    },
    [inputValue, executeCommand],
  )

  return {
    history,
    inputValue,
    maskedInput,
    handleInputChange,
    handleSubmit,
    systemState,
  }
}

