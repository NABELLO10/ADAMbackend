import requests
import json
import sys

ip = '186.10.115.124'
port = '12056'

def obtener_ultima_posicion_gps(token, terid):
    url = f'http://{ip}:{port}/api/v1/basic/gps/last'
    headers = {'Content-Type': 'application/json'}
    data = {
        'key': token,
        'terid': [terid]
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': response.status_code, 'message': 'Failed to get GPS position'}

def main(token, terid):
    result = obtener_ultima_posicion_gps(token, terid)
    print(json.dumps(result))  # Asegurarse de que la salida sea JSON válido

if __name__ == '__main__':
    token = sys.argv[1]
    terid = sys.argv[2]
    main(token, terid)
