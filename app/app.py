from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os
import requests
import pusher

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY')

ENV = os.environ.get('ENV', None)

CONSUMER_KEY = os.environ.get('SFDC_CONSUMER_KEY')
CONSUMER_SECRET = os.environ.get('SFDC_CONSUMER_SECRET')
ACCESS_TOKEN_URL = 'https://login.salesforce.com/services/oauth2/token'
AUTHORIZE_URL = 'https://login.salesforce.com/services/oauth2/authorize'
REDIRECT_URI = 'http://localhost:5000/auth/callback' if ENV == 'development' else 'https://einstein-scenarios.herokuapp.com/auth/callback'
SCOPES = [
    'api',
    'full',
    'refresh_token'
]

PUSHER_SECRET = os.environ.get('PUSHER_SECRET')

# Because the auth flow cannot be versioned, we have to intercept the bundle
# request for the confirm screen and redirect it to a valid bundle.
@app.before_request
def handle_bad_bundle_req():
    if request.path == '/static/bundle..js':
        return redirect('/static/bundle.0.2.4.js')

# OAuth Handling
@app.route('/auth/<channel_id>')
def auth(channel_id):
    session['channel_id'] = channel_id
    print('Set channel id as: ', channel_id)
    url = '{}?response_type=code&client_id={}&redirect_uri={}&scope={}'.format(
        AUTHORIZE_URL,
        CONSUMER_KEY,
        REDIRECT_URI,
        ' '.join(SCOPES)
    )
    return redirect(url)

@app.route('/auth/callback')
def auth_callback():
    code = request.args.get('code')
    payload = {
        'grant_type': 'authorization_code',
        'redirect_uri': REDIRECT_URI,
        'code': code,
        'client_id': CONSUMER_KEY,
        'client_secret': CONSUMER_SECRET
    }
    r = requests.post(ACCESS_TOKEN_URL, data=payload)
    resp = r.json()
    pusher_client = pusher.Pusher(
        app_id='937883',
        key='d3f79d8864d956248414',
        secret=PUSHER_SECRET,
        cluster='us2',
        ssl=True
    )
    print('Responding using channel id: ', session['channel_id'])
    pusher_client.trigger('sfdc-auth', session['channel_id'], resp)
    return redirect(url_for('auth_confirm'))

@app.route('/auth/confirm')
def auth_confirm():
    return render_template('index.html')

@app.route('/auth/refresh', methods=['POST'])
def auth_refresh():
    req_body = request.get_json()
    payload = {
        'grant_type': 'refresh_token',
        'client_id': CONSUMER_KEY,
        'client_secret': CONSUMER_SECRET,
        'refresh_token': req_body['auth']['refreshToken']
    }
    r = requests.post(ACCESS_TOKEN_URL, data=payload)
    return jsonify(r.json())

@app.route('/api/get-prediction-defs', methods=['POST'])
def api_get_prediction_defs():
    req_body = request.get_json()
    url = '{}/services/data/v46.0/smartdatadiscovery/predictiondefinitions'.format(req_body['auth']['instanceUrl'])
    headers = {
        'Authorization': '{} {}'.format(req_body['auth']['tokenType'], req_body['auth']['accessToken'])
    }
    r = requests.get(url, headers=headers)
    return jsonify(r.json())

@app.route('/api/get-model-defs', methods=['POST'])
def api_get_model_defs():
    req_body = request.get_json()
    url = '{}{}'.format(req_body['auth']['instanceUrl'], req_body['predictionDef']['modelsUrl'])
    headers = {
        'Authorization': '{} {}'.format(req_body['auth']['tokenType'], req_body['auth']['accessToken'])
    }
    r = requests.get(url, headers=headers)
    return jsonify(r.json())

@app.route('/api/get-prediction', methods=['POST'])
def api_get_prediction():
    req_body = request.get_json()
    url = '{}/services/data/v46.0/smartdatadiscovery/predict'.format(req_body['auth']['instanceUrl'])
    headers = {
        'Authorization': '{} {}'.format(req_body['auth']['tokenType'], req_body['auth']['accessToken'])
    }
    payload = {
        'predictionDefinition': req_body['predictionDef']['id'],
        'type': 'RawData',
        'columnNames': req_body['data']['columnNames'],
        'rows': req_body['data']['rows']
    }
    r = requests.post(url, json=payload, headers=headers)
    return jsonify(r.json())

@app.route('/v<version>/<path:path>')
def catchall(version, path):
    return render_template('index.html', version=version)

@app.route('/', defaults={'version': '0.2.4', 'path': None})
def index(version, path):
    return render_template('index.html', version=version)    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
