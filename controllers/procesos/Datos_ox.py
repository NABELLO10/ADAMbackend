import time
import requests
import json
from datetime import datetime
import pytz
import sys

def main():
    try:
        #EndPoint API REST para Inicio de sesión con Token Asignado
        urlInicio = 'https://hst-api.wialon.com/wialon/ajax.html?svc=token/login'
        token = sys.argv[1]  #Tkoen HCTEC
        argumentosInicio = {'params':'{"token":"' + f'{token}' + '", "fl":"1"}'}

        #EndPoint API REST para traer datos de unidad (Patente) 
        urlUnidad = 'https://hst-api.wialon.com/wialon/ajax.html?svc=core/search_item'


        responseToken = requests.get(urlInicio, params=argumentosInicio)

        #Oxigenacion: 19651908 y 20628728
        unidades= 20628728   #26297155  #25777570 #22486109
        
        #if responseToken.status_code == 200:
        #print(responseToken.content) #Imprime en terminal el JSON de respuesta, solo sirve para validar que responda bien y no tenga errores
        responseJsonT = json.loads(responseToken.text)
        sid = responseJsonT['eid']

        #Parametros para traer datos de unidad (Patente) 
        argumentosUnidad = {'params':'{"id":' + f'{unidades}' + ',"flags":1}', "sid":sid}
        responseUnidad = requests.get(urlUnidad, params=argumentosUnidad)
        #print(responseUnidad.content) #Imprime en terminal el JSON de respuesta, solo sirve para validar que responda bien y no tenga errores
        responseJsonU = json.loads(responseUnidad.text)
        patente = responseJsonU['item'] #Extrae solo cadena de donde obtener dato a utilizar en modo Diccionari

        #Parametros para traer datos de posicion de la Unidad (Patente)   
        argumentosPosicion = {'params':'{"id":' + f'{unidades}' + ',"flags":4194304}', "sid":sid}
        responsePosicion = requests.get(urlUnidad, params=argumentosPosicion)
        #print(responsePosicion.content) #Imprime en terminal el JSON de respuesta, solo sirve para validar que responda bien y no tenga errores
        responseJsonP = json.loads(responsePosicion.text)
        datos = responseJsonP['item']
        fechatms = datos["pos"]["t"]

        #Parametros para traer datos de sensores configurados de la Unidad (Patente)  
        argumentosSensor = {'params':'{"id":' + f'{unidades}' + ',"flags":4096}', "sid":sid}
        responseSensor = requests.get(urlUnidad, params=argumentosSensor)
        #print(responseSensor.content) #Imprime en terminal el JSON de respuesta, solo sirve para validar que responda bien y no tenga errores
        responseJsonS = json.loads(responseSensor.text)
        sensores = responseJsonS['item']

        #Parametros para traer datos del sensor seleccionado  
        argumentosAcc = {'params':'{"id":' + f'{unidades}' + ',"flags":1048576}', "sid":sid}
        responseAcc = requests.get(urlUnidad, params=argumentosAcc)
        #print(responseAcc.content) #Imprime en terminal el JSON de respuesta, solo sirve para validar que responda bien y no tenga errores
        responseJsonAcc = json.loads(responseAcc.text)
        ignicion = responseJsonAcc['item']
        #sensoresJ = json.dumps(ignicion, indent=4)
        
        ahora = datetime.now()
        horaGps = datetime.fromtimestamp(fechatms)
        #Obtener la zona horaria local de un país específico
        zonaHorariaLocal = pytz.timezone('America/Santiago')
        #Para la hora GPS a hora local
        horaGpsLocal = horaGps.replace(tzinfo=pytz.utc).astimezone(zonaHorariaLocal)
        #Obtener la hora actual en la zona horaria local de Chile
        horaLocal = ahora.replace(tzinfo=pytz.utc).astimezone(zonaHorariaLocal)
    

        cadena = ignicion["prms"]["text"]["v"]    

        # Crear el diccionario con los datos
        data = [{
            'Patente': patente["nm"],
            'Velocidad': datos["pos"]["s"],
            'FechaGPS': str(horaGpsLocal),  # Convertir el datetime a string para ser serializable en JSON
            'Latitud': datos["pos"]["y"],
            'Longitud': datos["pos"]["x"],
            'Curso': datos["pos"]["c"],
            'Altitud': datos["pos"]["z"],
            'Nombre Sensor': sensores["sens"]["1"]["p"],
            'Oxigenacion': ignicion["prms"]["text"]["v"],
            'Fecha Dato': str(horaLocal),  # Convertir el datetime a string
            'Valores': cadena.split()  # Esto agregará una lista de valores a partir de la cadena
        }]

        # Convertir el diccionario a JSON
        json_data = json.dumps(data, indent=4)

        # Imprimir el JSON
        print(json_data)
    except Exception as e:
        print(f"[]")





main()