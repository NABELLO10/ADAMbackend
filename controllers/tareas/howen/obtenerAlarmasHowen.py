import requests
import json
import sys

# URL API
ip = "186.10.115.123"
port = "9966"


def main(): 
    token = sys.argv[1]  
    unidad = sys.argv[2]  
    beginTime = sys.argv[3]  
    endTime = sys.argv[4]  

    url = f"http://{ip}:{port}/vss/alarm/apiFindAllByTime.action"
    params = {        
        'token': token,
        'deviceID': unidad,
        'pageNum': "1",
        'pageCount': "2000000",
        'beginTime': beginTime,
        'endTime': endTime,
        'alarmType': '',
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data))
    else:
        print("Error al recuperar información de alarmas. Código de estado:", response.status_code)

main()
