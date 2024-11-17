const axios = require('axios');
const api = require('../api');

const FetchQuestions = async (category) => {
    const response = axios.get(api.GetQuestions+'&categories='+category).then(r => (r.data)).catch(err => {console.error(err)});
    return response;
}

module.exports = FetchQuestions