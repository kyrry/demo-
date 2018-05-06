
const state = {
  test: {}
};

const mutations = {
  test (state, options) {
    state.test = options.test;
  },
};

const actions = {
  test: ({ commit }, options) => commit(options),
};

export default {
  state,
  mutations,
  actions
};