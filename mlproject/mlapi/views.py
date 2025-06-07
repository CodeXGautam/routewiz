# views.py in your Django app
import os
import pandas as pd
import pickle
from django.http import JsonResponse
from django.conf import settings
from datetime import datetime

# Load models (only once – you could cache this if desired)
BASE_DIR = settings.BASE_DIR
cong_model_path = os.path.join(BASE_DIR, 'mlapi/models/congestion_model.pkl')
speed_model_path = os.path.join(BASE_DIR, 'mlapi/models/speed_model.pkl')

with open(cong_model_path, 'rb') as f:
    cong_model = pickle.load(f)

with open(speed_model_path, 'rb') as f:
    speed_model = pickle.load(f)

def predict_traffic(request):
    # Example timestamp: ?timestamp=29-04-2025 08:30
    timestamp_str = request.GET.get('timestamp', '29-04-2025 08:30')

    try:
        ts = datetime.strptime(timestamp_str, "%d-%m-%Y %H:%M")
    except ValueError:
        return JsonResponse({'error': 'Invalid timestamp format. Use DD-MM-YYYY HH:MM'}, status=400)

    # Feature extraction
    features = pd.DataFrame([{
        'hour': ts.hour,
        'minute': ts.minute,
        'dayofweek': ts.weekday(),
        'is_weekend': 1 if ts.weekday() >= 5 else 0
    }])

    # Predictions
    predicted_congestion = cong_model.predict(features)[0]
    predicted_speed = speed_model.predict(features)[0]

    return JsonResponse({
        'timestamp': timestamp_str,
        'predicted_congestion_factor': round(float(predicted_congestion), 4),
        'predicted_current_speed': round(float(predicted_speed), 2)
    })
