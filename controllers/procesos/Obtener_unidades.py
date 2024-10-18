import requests
import json

def unidades_hctec(token):
    # URL de la API para obtener un listado de unidades
    units_url = "https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_items"

    #EndPoint API REST para Inicio de sesión con Token Asignado
    urlInicio = 'https://hst-api.wialon.com/wialon/ajax.html?svc=token/login'

    argumentosInicio = {'params':'{"token":"' + f'{token}' + '", "fl":"1"}'}

    responseToken = requests.get(urlInicio, params=argumentosInicio)

    responseJsonT = json.loads(responseToken.text)
    sid = responseJsonT['eid']

    #Parametros iniciales
    parametros = {
        "spec": {
            "itemsType": "avl_unit",
            "propName": "sys_name",
            "propValueMask": "**",
            "sortType": "sys_name"
        },
        "force": 1,
        "flags": 1,
        "from": 0,
        "to": 0
    }
    params_str = json.dumps(parametros)

    #Une parametros
    units_data = {
        "svc": "core/search_items",
        "params": params_str,
        "sid": sid
    }

    units_response = requests.post(units_url, data=units_data)
    #Mostrar en formato JSON
    datosjson = units_response.json()
    cadena = datosjson["items"]

    return cadena
