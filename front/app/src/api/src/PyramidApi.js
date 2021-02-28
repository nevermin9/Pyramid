import { Client, Query } from './Client';

export const PyramidApi = {
    getPressureByCoordinats(row, num) {
        const query = {row, num};

        return Client.fetchData(`/pressure?${Query(query)}`)
            .then((response) => {
                return response.data;
            });
    }
}