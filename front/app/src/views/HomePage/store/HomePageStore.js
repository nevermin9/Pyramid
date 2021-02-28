import { PyramidApi } from 'api'

export const HomePageStore = {
    namespaced: true,
    state: {
        pressure: null,
    },
    getters: {
        pressure: (state) => state.pressure,
    },
    mutations: {
        setPressure(state, { pressure }) {
            state.pressure = pressure;
        }
    },
    actions: {
        fetchPressure({ commit }, { row, num }) {
            return PyramidApi.getPressureByCoordinats(row, num)
                .then((pressure) => {
                    commit('setPressure', { pressure })
                });
        }
    },
}