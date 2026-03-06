# Veritar AI

A FastAPI backend scaffold for AI-powered speech-to-text, translation, and intent recognition services.

## Features

- **Speech-to-Text**: Audio file transcription using Whisper AI
- **Translation**: Text translation between multiple languages
- **Intent Recognition**: Text analysis for intent classification, entity extraction, and sentiment analysis
- **RESTful API**: Clean, documented API endpoints with Swagger/OpenAPI documentation
- **Pydantic Models**: Type-safe request/response models
- **Async Support**: Built with async/await for better performance

## Project Structure

```
veritar_ai/
├─ app/
│  ├─ main.py                 # FastAPI application entry point
│  ├─ routers/                # API route handlers
│  │  ├─ speech_to_text.py   # Speech-to-text endpoints
│  │  ├─ translate.py        # Translation endpoints
│  │  └─ intent.py           # Intent recognition endpoints
│  └─ services/              # Business logic services
│     ├─ whisper_service.py  # Whisper AI integration
│     ├─ translation_service.py # Translation service
│     └─ intent_service.py   # Intent analysis service
├─ requirements.txt          # Python dependencies
└─ README.md                 # This file
```

## API Endpoints

### Speech-to-Text
- `POST /api/transcribe` - Transcribe audio file to text
- `GET /api/transcribe/supported-formats` - Get supported audio formats

### Translation
- `POST /api/translate` - Translate text between languages
- `GET /api/translate/supported-languages` - Get supported languages
- `GET /api/translate/models` - Get available translation models

### Intent Recognition
- `POST /api/intent` - Analyze text for intent, entities, and sentiment
- `GET /api/intent/supported-intents` - Get supported intent categories
- `GET /api/intent/models` - Get available intent models

### General
- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /docs` - Swagger UI documentation
- `GET /redoc` - ReDoc documentation

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd veritar_ai
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### Development Mode
```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Direct Python Execution
```bash
python app/main.py
```

## API Documentation

Once the server is running, you can access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## Usage Examples

### Transcribe Audio
```bash
curl -X POST "http://localhost:8000/api/transcribe" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@audio.wav"
```

### Translate Text
```bash
curl -X POST "http://localhost:8000/api/translate" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "Hello, world!",
       "src_lang": "en",
       "target_lang": "es"
     }'
```

### Analyze Intent
```bash
curl -X POST "http://localhost:8000/api/intent" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "I want to book a table for two people tonight"
     }'
```

## Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# Model Configuration
WHISPER_MODEL_SIZE=base
TRANSLATION_MODEL=default
INTENT_MODEL=default

# Optional: External API Keys
# OPENAI_API_KEY=your_openai_key
# GOOGLE_TRANSLATE_API_KEY=your_google_key
```

## Development

### Adding New Features

1. **Create new router** in `app/routers/`
2. **Implement service logic** in `app/services/`
3. **Add Pydantic models** for request/response validation
4. **Register router** in `app/main.py`
5. **Update documentation** and tests

### Code Style

- Follow PEP 8 guidelines
- Use type hints for all functions
- Add docstrings for classes and methods
- Use async/await for I/O operations

## TODO

The following features need to be implemented:

### Whisper Service (`app/services/whisper_service.py`)
- [ ] Initialize Whisper model
- [ ] Implement audio preprocessing
- [ ] Add transcription logic
- [ ] Implement language detection
- [ ] Add audio format validation

### Translation Service (`app/services/translation_service.py`)
- [ ] Integrate translation API/model
- [ ] Implement language validation
- [ ] Add batch translation support
- [ ] Implement language detection

### Intent Service (`app/services/intent_service.py`)
- [ ] Initialize NLP models
- [ ] Implement intent classification
- [ ] Add entity extraction
- [ ] Implement sentiment analysis
- [ ] Add emotion detection

### Additional Features
- [ ] Add authentication/authorization
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Add error handling middleware
- [ ] Add unit tests
- [ ] Add Docker configuration
- [ ] Add CI/CD pipeline

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the repository or contact the development team.
