import requests
import json
import sys

ip = '186.10.115.124'
port = '12056'

def obtener_detalle_alarma(token, terid, tipo, fecha_inicio, fecha_fin):
    url = f'http://{ip}:{port}/api/v1/basic/alarm/detail'
    headers = {'Content-Type': 'application/json'}
    data = {
        'key': token,
        'terid': [terid],
        'type': [tipo],
        'starttime': fecha_inicio,
        'endtime': fecha_fin
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': response.status_code, 'message': 'Error al obtener el detalle de la alarma'}

def main(token, terid, tipo, fecha_inicio, fecha_fin):
    result = obtener_detalle_alarma(token, terid, tipo, fecha_inicio, fecha_fin)
    print(json.dumps(result))  # Asegurarse de que la salida sea JSON válido

if __name__ == '__main__':
    token = sys.argv[1]
    terid = sys.argv[2]
    tipo = sys.argv[3]
    fecha_inicio = sys.argv[4]
    fecha_fin = sys.argv[5]
    main(token, terid, tipo, fecha_inicio, fecha_fin)
