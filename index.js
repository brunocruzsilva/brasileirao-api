'use strict';
require('es6-promise').polyfill();

const axios = require('axios');
const urlBase = 'https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab3a45b1/fase/fase-unica-seriea-2020/rodada/{0}/jogos/';
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';

exports.rodada = function (rodada) {
    var rodadaBaseURL = urlBase.replace('{0}', rodada);
    return new Promise(function (accept, error) {
        axios.get(rodadaBaseURL, {
            'User-Agent': userAgent,
            'Access-Control-Allow-Origin': '*'
        }).then(function (response) { 

            var lista = [];

            response.data.forEach(jogo => {
                lista.push({
                    data_realizacao: jogo.data_realizacao,
                    hora_realizacao: jogo.hora_realizacao,
                    placar_oficial_visitante: jogo.placar_oficial_visitante,
                    placar_oficial_mandante: jogo.placar_oficial_mandante,
                    mandante: jogo.equipes.mandante,
                    visitante: jogo.equipes.visitante
                });
            });

            accept(lista);
        }).catch(function (error) {
            error({ error: "Não foi possível retornar as informações!!" });
        });
    });
}; 
