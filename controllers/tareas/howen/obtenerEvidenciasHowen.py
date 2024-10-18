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

    url = f"http://{ip}:{port}/vss/record/evidenceToRetrieve.action"
    params = {        
        'token': token,
        'conditionName': unidad,        
        'startTime': beginTime,
        'endTime': endTime,
        'alarmType': '',
        'scheme': "http"     
    }
    
    try:       
        response = requests.get(url, params=params, timeout=55)

        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data))
        else:
            print("Error al recuperar información de evidencias. Código de estado:", response.status_code)

    except requests.exceptions.Timeout:
        print("La solicitud ha excedido el tiempo de espera")
    except requests.exceptions.RequestException as e:
        print(f"Error en la solicitud: {e}")
main()
