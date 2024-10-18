import requests
import json

# Configuración de la IP y puerto
ip = "186.10.115.123"
port = "9966"

# Credenciales de inicio de sesión
usuario = "admin"
password = "f3f00b282412c4e213e57c6351ccef96"  # Contraseña en MD5

def obtener_token():
    # URL para obtener el token
    url_token = f"http://{ip}:{port}/vss/user/apiLogin.action"
    
    # Parámetros de la solicitud (en JSON)
    params = {
        "username": usuario,
        "password": password
    }

    try:
        # Enviar solicitud POST
        response = requests.post(url_token, json=params)

        # Verificar si la solicitud fue exitosa
        if response.status_code == 200:
            respuesta_json = response.json()
            if respuesta_json.get("status") == 10000:  # 10000 indica éxito
                token = respuesta_json['data']['token']
                print(f"Token obtenido: {token}")
                return token
            else:
                print(f"Error al obtener el token: {respuesta_json.get('msg')}")
        else:
            print(f"Error de conexión: {response.status_code}")

    except Exception as e:
        print(f"Error en la solicitud: {e}")

    return None

# Ejecución del script
if __name__ == "__main__":
    obtener_token()
