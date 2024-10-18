import requests
import json
import sys

# URL API
ip = "186.10.115.123"
port = "9966"


def main(): 
    token = sys.argv[1]  

    url = f"http://{ip}:{port}/vss/vehicle/findAll.action"
    params = {        
        'token': token,
        'isOnline': "1",
        'pageCount': "200",
        'pageNum': "1"
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data))
    else:
        print("Error al recuperar información de unidades. Código de estado:", response.status_code)

main()
