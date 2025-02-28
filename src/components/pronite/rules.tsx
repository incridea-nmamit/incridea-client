import React from 'react'

const ProniteRules = ({
  handleInfoToggle
}: {
  handleInfoToggle: () => void
}) => {
  return (

    <div className="max-w-2xl w-full rounded-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-b from-gray-100 to-gray-400 bg-clip-text text-transparent">
          Pronite Concert Rules
        </h2>
        <button
          onClick={handleInfoToggle}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="space-y-4 text-sm text-gray-300 max-h-[70vh] overflow-y-auto pr-4">
        <p>⚠️ Entry Rules:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li className='font-bold text-red-400'>
            Entry is strictly limited to students from engineering colleges and Nitte sister institutes. Any unauthorized or fraudulent entry will be denied without refund.
          </li>
          <li>
            Valid PID scan required at pronite booth for admission
          </li>
          <li>
            Wristband must be worn for entry to BC Alva Hockey
            ground
          </li>
          <li>No food or water bottles allowed inside</li>
          <li>Bags, water bottles, food are not allowed inside the pronite venue</li>
          <li>
            Prohibited items (will be confiscated):
            <ul className="list-disc list-inside ml-6 mt-1 text-gray-400">
              <li>Perfumes and makeup materials</li>
              <li>Intoxicating substances</li>
              <li>Flammable materials</li>
              <li>Sharp objects or weapons</li>
              <li>Food items of any kind</li>
            </ul>
          </li>
          <li className="text-red-400">
            Entry while intoxicated is strictly prohibited - may result in expulsion and registration cancellation
          </li>
          <li>
            Disruptive behavior will result in immediate removal
          </li>
          <li>Security and Incridea Team are present for assistance</li>
          <li>All instructions from officials must be followed</li>
        </ul>
      </div>
    </div>
  )
}

export default ProniteRules
