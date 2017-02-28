/**
 * Created by Luan on 11/24/2016.
 */
'use strict';

import React, {Component} from 'react';


class CountryWorker extends Component {

    getAllCountries(callback) {
        fetch('https://restcountries.eu/rest/v1/all')
            .then((response) => response.json()).then((json) => {
            if (json.length != 0) {
                let data = {};
                for (let country of json) {
                    data[`${country.alpha2Code}`] = country.name
                }
                callback(data)
            }
            else
                callback({})
        }).catch((error) => console.log(error));
    }
}

export default new CountryWorker();