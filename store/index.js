export const state = () => ({
  passwords: [],
  generating: false
})

export const mutations = {
  start(state) {
    state.passwords = []
    state.generating = true
  },
  finish(state) {
    state.generating = false
  },
  add(state, password) {
    state.passwords.push(password)
  }
}

export const actions = {
  generate({ commit }, conditions) {
    commit('start')

    const lettersLower = 'abcdefghijklmnopqrstuvwxyz'
    const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const letters = lettersLower + lettersUpper
    const digits = '0123456789'
    const symbols = '/*-+.,!#$%&()~|_'

    const pick = (characters, haystack, length) => {
      for (let i = 0; i < length; i++) {
        characters.push(
          haystack.charAt(Math.floor(Math.random() * haystack.length))
        )
      }
    }

    const adjustLetters = characters => {
      if (!characters.some(char => lettersLower.indexOf(char) !== -1)) {
        characters[characters.length - 1] = lettersLower.charAt(
          Math.floor(Math.random() * lettersLower.length)
        )
      }

      if (!characters.some(char => lettersUpper.indexOf(char) !== -1)) {
        characters[characters.length - 1] = lettersUpper.charAt(
          Math.floor(Math.random() * lettersUpper.length)
        )
      }
    }

    const shuffle = characters => {
      for (let i = characters.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        const tmp = characters[i]
        characters[i] = characters[r]
        characters[r] = tmp
      }
    }

    conditions.letters =
      conditions.total - conditions.digits - conditions.symbols

    for (let i = 0; i < conditions.generates; i++) {
      const characters = []

      pick(characters, letters, conditions.letters)
      adjustLetters(characters)

      pick(characters, digits, conditions.digits)
      pick(characters, symbols, conditions.symbols)

      shuffle(characters)

      commit('add', characters.join(''))
    }

    commit('finish')
  }
}
