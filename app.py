from flask import Flask, redirect, url_for, session, render_template
from flask_oidc import OpenIDConnect
from authlib.integrations.flask_client import OAuth
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)

oauth = OAuth(app)

oauth.register(
    name='phx',
    client_id=load_dotenv('client_id'),
    client_secret=load_dotenv('client_secret'),
    server_metadata_url=load_dotenv('server_metadata_url'),
    client_kwargs={'scope': 'openid profile email'},
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/error')
def error():
    return render_template('error.html')

@app.route('/result')
def result():
    user = session.get('user')
    ssn = user.get('ssn') if user else None
    usergivenname = user.get('usergivenname') if user else None
    usersurname = user.get('usersurname') if user else None
    registrationlevel = user.get('registrationlevel') if user else None
    if registrationlevel != "PLUS" or ssn is None:
        return redirect('/error')
    return render_template('result.html', ssn=ssn, usergivenname=usergivenname, usersurname=usersurname, registrationlevel=registrationlevel)

@app.route('/login')
def login():
    redirect_uri = url_for('auth', _external=True)
    return oauth.phx.authorize_redirect(redirect_uri)

@app.route('/auth')
def auth():
    token = oauth.phx.authorize_access_token()
    session['user'] = token['userinfo']
    print(token['userinfo'])  # Debugging line to check the token content
    # Store user information in session
    return redirect('/result')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)