import http.server
import socketserver
import os
import webbrowser
import threading

PORT = 7887

def run_server():
    with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
        print(f"Сервер запущен на порту {PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    # Запускаем сервер в отдельном потоке
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True  # Завершить поток, когда основная программа завершается
    server_thread.start()

    # Открываем браузер по умолчанию с адресом сервера
    webbrowser.open(f"http://localhost:{PORT}/index.html")

    # Держим приложение запущенным
    try:
        input("Нажмите Enter, чтобы остановить сервер...\n")
    except KeyboardInterrupt:
        pass
    print("Сервер остановлен.")