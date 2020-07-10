/* eslint-disable @typescript-eslint/camelcase */
import * as querystring from 'query-string'
import fetch from 'node-fetch'
const { DiscordClientID, DiscordSecret, DiscordRedirectURI } = process.env

export const handler = async(event) => {
  if(event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  const params = querystring.parse(event.body)
  if(!params.code) {
    return { statusCode: 400, body: 'code is null' }
  }
  const code = params.code
  console.log(code, '--------', params)
  const body = {
    client_id: DiscordClientID,
    client_scret: DiscordSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: DiscordRedirectURI,
    scope: 'rpc',
  }

  return fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    header: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  }).then(result => result.json())
}
