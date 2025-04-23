from flask import Flask, redirect, url_for, session, render_template
from flask_oidc import OpenIDConnect
from authlib.integrations.flask_client import OAuth
import os
from dotenv import load_dotenv

app = Flask(__name__)
app.secret_key = os.urandom(24)

load_dotenv()

oauth = OAuth(app)

oauth.register(
    name='phx',
    client_id=os.getenv('client_id'),
    client_secret=os.getenv('client_secret'),
    server_metadata_url=os.getenv('server_metadata_url'),
    client_kwargs={'scope': 'openid profile email'},
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/error')
def error():
    user = session.get('user')
    registrationlevel = user.get('registrationlevel') if user else None
    return render_template('error.html', registrationlevel=registrationlevel)

@app.route('/result')
def result():
    user = session.get('user')
    ssn = user.get('ssn') if user else None
    usergivenname = user.get('usergivenname') if user else None
    usersurname = user.get('usersurname') if user else None
    registrationlevel = user.get('registrationlevel') if user else None
    documentcountry = user.get('documentcountry') if user else None
    if registrationlevel != "PLUS" or ssn is None:
        return redirect('/error')
    return render_template('result.html', ssn=ssn, usergivenname=usergivenname, usersurname=usersurname, registrationlevel=registrationlevel, documentcountry=documentcountry)

@app.route('/login')
def login():
    redirect_uri = url_for('auth', _external=True)
    return oauth.phx.authorize_redirect(redirect_uri)

@app.route('/auth')
def auth():
    token = oauth.phx.authorize_access_token()
    session['user'] = token['userinfo']
    print(token['userinfo'])
    return redirect('/result')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
