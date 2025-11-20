import { HomePage } from './components/HomePage.js';
import { CameraPage } from './components/CameraPage.js';
import { ResultsPage } from './components/ResultsPage.js';

class App {
    constructor() {
        this.currentPage = 'home';
        this.appData = {
            image: null,
            symptoms: '',
            results: null
        };
        // Make app globally accessible immediately
        window.app = this;
        this.render();
    }

    navigate(page, data = {}) {
        this.currentPage = page;
        if (data) {
            this.appData = { ...this.appData, ...data };
        }
        this.render();
    }

    render() {
        const app = document.getElementById('app');

        switch (this.currentPage) {
            case 'home':
                app.innerHTML = HomePage(this);
                this.initHomePage();
                break;
            case 'camera':
                app.innerHTML = CameraPage(this);
                this.initCameraPage();
                break;
            case 'results':
                app.innerHTML = ResultsPage(this);
                this.initResultsPage();
                break;
        }
    }

    initResultsPage() {
        const newAnalysisBtn = document.getElementById('newAnalysisBtn');
        const homeBtn = document.getElementById('homeBtn');
        const printBtn = document.getElementById('printBtn');

        newAnalysisBtn?.addEventListener('click', () => {
            this.navigate('camera');
        });

        homeBtn?.addEventListener('click', () => {
            this.navigate('home');
        });

        printBtn?.addEventListener('click', () => {
            window.print();
        });
    }

    initHomePage() {
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.navigate('camera');
            });
        }
    }

    initCameraPage() {
        const backBtn = document.getElementById('backBtn');
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const captureBtn = document.getElementById('captureBtn');
        const uploadInput = document.getElementById('uploadInput');
        const previewImg = document.getElementById('previewImg');
        const symptomsInput = document.getElementById('symptomsInput');
        const voiceBtn = document.getElementById('voiceBtn');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const previewContainer = document.getElementById('previewContainer');

        let stream = null;
        let capturedImage = null;

        // Back button
        backBtn?.addEventListener('click', () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            this.navigate('home');
        });

        // Start camera
        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                video.srcObject = stream;
            } catch (err) {
                console.error('Camera error:', err);
                alert('Camera access denied. Please use upload instead.');
            }
        };

        startCamera();

        // Capture photo
        captureBtn?.addEventListener('click', () => {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);

            canvas.toBlob((blob) => {
                capturedImage = blob;
                previewImg.src = URL.createObjectURL(blob);
                previewContainer.classList.remove('hidden');
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            });
        });

        // Upload photo
        uploadInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                capturedImage = file;
                previewImg.src = URL.createObjectURL(file);
                previewContainer.classList.remove('hidden');
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            }
        });

        // Voice input
        voiceBtn?.addEventListener('click', () => {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.lang = 'en-US';

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    symptomsInput.value += (symptomsInput.value ? ' ' : '') + transcript;
                };

                recognition.start();
                voiceBtn.textContent = '🎤 Listening...';

                recognition.onend = () => {
                    voiceBtn.textContent = '🎤 Voice Input';
                };
            } else {
                alert('Speech recognition not supported in this browser.');
            }
        });

        // Analyze
        analyzeBtn?.addEventListener('click', async () => {
            const symptoms = symptomsInput.value.trim();

            if (!capturedImage && !symptoms) {
                alert('Please provide an image or describe your symptoms.');
                return;
            }

            analyzeBtn.disabled = true;
            analyzeBtn.textContent = 'Analyzing...';

            try {
                const formData = new FormData();
                if (capturedImage) {
                    formData.append('image', capturedImage);
                }
                formData.append('symptoms', symptoms);

                const response = await fetch('http://localhost:3000/api/analyze', {
                    method: 'POST',
                    body: formData
                });

                const results = await response.json();

                if (results.error) {
                    throw new Error(results.error);
                }

                this.navigate('results', { results, symptoms, image: capturedImage });
            } catch (error) {
                console.error('Analysis error:', error);
                alert('Analysis failed: ' + error.message);
                analyzeBtn.disabled = false;
                analyzeBtn.textContent = '🔍 Analyze';
            }
        });
    }
}

// Initialize app
new App();
