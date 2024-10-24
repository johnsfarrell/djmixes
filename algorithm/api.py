### API

from flask import Flask, request, jsonify, send_file

from splitting import SongSplitter

from tempfile import NamedTemporaryFile
from librosa import load
import soundfile as sf

from stemming import SongStemmer

app = Flask(__name__)

splitter = SongSplitter()
stemmer = SongStemmer()

@app.route("/split", methods=['POST'])
async def split():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']

    try:
        with NamedTemporaryFile(suffix='.wav') as temp_file:
            file.save(temp_file.name)
            splits = await splitter.split(temp_file.name)
        return jsonify(splits)
    except Exception as e:
        return jsonify({'error': str(e)}), 400




@app.route("/stem", methods=['POST'])
async def stem():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']

    try:
        with NamedTemporaryFile(suffix='.wav') as temp_file:
            file.save(temp_file.name)
            zipped_stem_file = await stemmer.stem(temp_file.name)
            return send_file(zipped_stem_file, as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=4004, debug=True)