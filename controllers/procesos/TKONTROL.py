import requests
import json
import sys

BASE_URL = 'https://hst-api.wialon.com/wialon/ajax.html?svc='

def get_data_from_api(url, params):
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return json.loads(response.text)
        else:
            print(f"Error con la respuesta. Código de estado: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error al realizar la solicitud a la API: {e}")
        return None

def main():
    try:
        token = sys.argv[1] 
        token_params = {
            'params': f'{{"token":"{token}", "fl":"1"}}'
        }

        responseToken = get_data_from_api(BASE_URL + 'token/login', token_params)

        data_to_export = []

        if responseToken:
            sid = responseToken['eid']
            unidades = [21379940, 21568394 ]

            for idUnidad in unidades:
                common_params = {'sid': sid}
                
                unidad_params = {'params': f'{{"id":{idUnidad},"flags":1}}', **common_params}
                posicion_params = {'params': f'{{"id":{idUnidad},"flags":4194304}}', **common_params}
                sensor_params = {'params': f'{{"id":{idUnidad},"flags":4096}}', **common_params}
                acc_params = {'params': f'{{"id":{idUnidad},"flags":1048576}}', **common_params}

                unidad_data = get_data_from_api(BASE_URL + 'core/search_item', unidad_params)
                posicion_data = get_data_from_api(BASE_URL + 'core/search_item', posicion_params)
                sensor_data = get_data_from_api(BASE_URL + 'core/search_item', sensor_params)
                acc_data = get_data_from_api(BASE_URL + 'core/search_item', acc_params)

                if unidad_data and posicion_data and sensor_data and acc_data:
                    unidad_info = {
                        'Patente': unidad_data["item"]["nm"],
                        'Velocidad': posicion_data["item"]["pos"]["s"],
                        'FechaGPS': unidad_data["item"]["nm"],
                        'Latitud': posicion_data["item"]["pos"]["y"],
                        'Longitud': posicion_data["item"]["pos"]["x"],
                        'Curso': posicion_data["item"]["pos"]["c"],
                        'Altitud': posicion_data["item"]["pos"]["z"],
                        'Nombre Sensor': sensor_data["item"]["sens"]["1"]["p"],
                        'ACC': acc_data["item"]["prms"][sensor_data["item"]["sens"]["1"]["p"]]["v"]
                    }

                    data_to_export.append(unidad_info)

            json_result = json.dumps(data_to_export, indent=4)
            print(json_result)
    
    except Exception as e:
        print(f"[]")

if __name__ == "__main__":
    main()
