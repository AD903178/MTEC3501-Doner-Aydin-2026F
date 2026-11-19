const chords = [
  [130.81, 164.81, 196, 246.94],
  [110, 130.81, 164.81, 220],
  [87.31, 110, 130.81, 164.81],
  [98, 123.47, 146.83, 196],
]

const melody = [
  523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 392, null,
  440, 523.25, 659.25, 523.25, 587.33, 440, 392, null,
]

export function startBackgroundMusic(context) {
  const master = context.createGain()
  master.gain.value = 0.28
  master.connect(context.destination)

  const oscillators = new Set()
  let chordIndex = 0
  let melodyIndex = 0
  let stopped = false

  function playTone(frequency, duration, volume, attack) {
    if (stopped) return

    const oscillator = context.createOscillator()
    const envelope = context.createGain()
    const startTime = context.currentTime

    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    envelope.gain.setValueAtTime(0.0001, startTime)
    envelope.gain.exponentialRampToValueAtTime(volume, startTime + attack)
    envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)
    oscillator.connect(envelope)
    envelope.connect(master)
    oscillators.add(oscillator)
    oscillator.onended = () => {
      oscillators.delete(oscillator)
      oscillator.disconnect()
      envelope.disconnect()
    }
    oscillator.start(startTime)
    oscillator.stop(startTime + duration + 0.05)
  }

  function playChord() {
    chords[chordIndex].forEach((frequency) => {
      playTone(frequency, 9.2, 0.035, 1.8)
    })
    chordIndex = (chordIndex + 1) % chords.length
  }

  function playMelodyNote() {
    const frequency = melody[melodyIndex]
    if (frequency) playTone(frequency, 1.1, 0.09, 0.08)
    melodyIndex = (melodyIndex + 1) % melody.length
  }

  playChord()
  playMelodyNote()
  const chordTimer = window.setInterval(playChord, 8000)
  const melodyTimer = window.setInterval(playMelodyNote, 900)

  return function stop() {
    if (stopped) return
    stopped = true
    window.clearInterval(chordTimer)
    window.clearInterval(melodyTimer)

    const stopTime = context.currentTime
    master.gain.cancelScheduledValues(stopTime)
    master.gain.setValueAtTime(master.gain.value, stopTime)
    master.gain.linearRampToValueAtTime(0, stopTime + 0.25)
    oscillators.forEach((oscillator) => oscillator.stop(stopTime + 0.3))
    window.setTimeout(() => {
      void context.close().catch((closeError) => {
        console.error('Could not close the background music audio context.', closeError)
      })
    }, 350)
  }
}
