from flask_cors import CORS
from flask import jsonify
from flask import Flask, request 
import boto3
import time
import random
import string


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return '''<form method=POST enctype=multipart/form-data action="upload">
    <input type=file name=myfile>
    <input type=submit>
    </form>'''

@app.route('/upload', methods=['POST'])
def upload():
    print("**********")
    print(request.files['userfile'].read())
    # print(request.form.get('name'))
    print("**********")
    # s3 = boto3.resource('s3')
    # res=''.join(random.choices(string.ascii_uppercase+string.digits,k=15))
    # s3.Bucket('test-audio-pranjal').put_object(Key=res, Body=request.files['userfile'])
    # transcribe = boto3.client('transcribe')
    # job_name = res
    # job_uri ="https://s3.amazonaws.com/test-audio-pranjal/"+res
    # transcribe.start_transcription_job(
    #     TranscriptionJobName=job_name,
    #     Media={'MediaFileUri': job_uri},
    #     MediaFormat='wav',
    #     LanguageCode='en-US',
    #     Settings={
    #         'ShowSpeakerLabels':True,
    #         'MaxSpeakerLabels':3
    #     }
    # )# print(request.files['userfile'].read())
    # while True:
    #     status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
    #     if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
    #         break
    #     print("Not ready yet...")
    #     time.sleep(5)
    # print(status["TranscriptionJob"]["Transcript"]["TranscriptFileUri"])
    # return jsonify(url=status["TranscriptionJob"]["Transcript"]["TranscriptFileUri"])
    return jsonify({"url_pdf":"https://www.google.com","url_json":"https://www.wikipedia.com","url_text":'https://www.yahoo.com'})
if __name__ == '__main__':
    app.run(debug=True)

