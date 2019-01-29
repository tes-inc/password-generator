export const state = () => ({
  strength: null,
  total: 0,
  digits: 0,
  symbols: 0,
  generates: 5,
  symbolChars: []
})

export const getters = {
  isCustom: state => state.strength === 'custom',
  SYMBOL_CHARS: () => '/*-+.,!#$%&()~|_'.split('')
}

export const mutations = {
  update(state, { name, value }) {
    if (name in state) {
      state[name] = value
    }
  }
}

export const actions = {
  initialize({ getters, commit }) {
    commit('update', { name: 'strength', value: 'normal' })
    commit('update', { name: 'symbolChars', value: getters.SYMBOL_CHARS })
  },
  setPreset({ state, commit }) {
    switch (state.strength) {
      case 'normal':
        commit('update', { name: 'total', value: 12 })
        commit('update', { name: 'digits', value: 4 })
        commit('update', { name: 'symbols', value: 0 })
        break

      case 'strong':
        commit('update', { name: 'total', value: 24 })
        commit('update', { name: 'digits', value: 5 })
        commit('update', { name: 'symbols', value: 5 })
        break
    }
  }
}
