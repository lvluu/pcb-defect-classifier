from api.app import app

if __name__ == "__main__":
  app.run(debug=True)

# from api.app import app
# from flask_ngrok import run_with_ngrok
# from flask import Flask, render_template
# from pyngrok import ngrok

# if __name__ == "__main__":
#   ngrok.set_auth_token("1uIe2XGyUfdAoY2msA73PaaoEpa_7ahruVV1mRMP2HYb5PHpf")
#   run_with_ngrok(app)
#   app.run()