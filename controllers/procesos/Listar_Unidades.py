from Obtener_unidades import unidades_hctec

import json
import sys

def main():
    try:
        token = sys.argv[1]  
        ids = unidades_hctec(token)
        
        # Guarda las unidades en una lista
        #unidades_list = []
        #for unidad in ids:
            #unidades_list.append({"Unidad": unidad})
        
        # Convierte la lista a formato JSON
        unidades_json = json.dumps(ids, indent=2)  # 'indent=4' hace que el JSON sea más legible
        print(unidades_json)
    except Exception as e:
        print(f"[]")
main()