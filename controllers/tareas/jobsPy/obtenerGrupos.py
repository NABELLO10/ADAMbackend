import requests
import json
import sys

# URL API
ip = '186.10.115.124'
port = '12056'

def main(): 
    token = sys.argv[1]  

    url = f'http://{ip}:{port}/api/v1/basic/groups'
    params = {
        'key': token
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data))
    else:
        print("Error al recuperar información de grupos de vehículos. Código de estado:", response.status_code)


main()
