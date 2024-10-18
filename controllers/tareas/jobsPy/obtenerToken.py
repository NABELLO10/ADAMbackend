import requests
import json
from datetime import datetime

# URL API
ip = '186.10.115.124'
port = '12056'

def main():
    token = ObtenerToken()
    if token:
        print(json.dumps({'Token': token}))  # Imprimir token como JSON
    else:
        print(json.dumps({'Error': 'No se pudo obtener el token'}))

def ObtenerToken():
    usuario = 'admin'
    passw = 'Soporteit!'
    # URL
    UrlToken = f'http://{ip}:{port}/api/v1/basic/key'

    params = {
        'username': usuario,
        'password': passw
    }

    ResToken = requests.get(UrlToken, params=params)
    if ResToken.status_code == 200:
        responseJson = json.loads(ResToken.text)
        return responseJson['data']['key']
    else:
        print(json.dumps({'Error': f'Status Code: {ResToken.status_code}'}))
        return None  # Retorna None si hay error

if __name__ == "__main__":
    main()
