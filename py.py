import requests
from requests_ip_rotator import ApiGateway

with ApiGateway("https://site.com") as g:
    session = requests.Session()
    session.mount("https://site.com", g)

    response = session.get("https://site.com/index.php")
    print(response.status_code)