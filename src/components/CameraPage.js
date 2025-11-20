export const CameraPage = (app) => {
  return `
    <div class="min-h-screen p-4 py-8">
      <div class="max-w-4xl mx-auto animate-fade-in">
        <button 
          id="backBtn"
          class="btn-secondary text-white px-6 py-3 rounded-xl mb-6 inline-flex items-center gap-2 font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back
        </button>

        <div class="dark-card rounded-3xl p-6 md:p-8">
          <h2 class="text-3xl font-bold text-white mb-2">Capture & Describe</h2>
          <p class="text-gray-400 mb-8">Upload an image and describe your symptoms for AI analysis</p>

          <!-- Camera/Upload Section -->
          <div class="mb-8">
            <label class="text-white font-semibold mb-3 block text-sm uppercase tracking-wide">Visual Input</label>
            <div class="relative bg-black/50 rounded-2xl overflow-hidden mb-4 border border-white/10" style="aspect-ratio: 4/3;">
              <video id="video" autoplay playsinline class="w-full h-full object-cover camera-preview"></video>
              <canvas id="canvas" class="hidden"></canvas>
              
              <div id="previewContainer" class="hidden absolute inset-0 bg-black">
                <img id="previewImg" class="w-full h-full object-contain" alt="Preview">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <button id="captureBtn" class="btn-secondary text-white font-medium py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Capture
              </button>
              <label class="btn-secondary text-white font-medium py-3 px-6 rounded-xl text-center cursor-pointer inline-flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Upload
                <input type="file" id="uploadInput" accept="image/*" class="hidden">
              </label>
            </div>
          </div>

          <!-- Symptoms Section -->
          <div class="mb-8">
            <label class="text-white font-semibold mb-3 block text-sm uppercase tracking-wide">Symptoms Description</label>
            <textarea 
              id="symptomsInput"
              placeholder="Describe your symptoms in detail... (e.g., I have a rash on my arm that's itchy and red)"
              class="w-full input-dark text-white placeholder-gray-500 rounded-xl p-4 min-h-32 resize-none"
            ></textarea>
            
            <button id="voiceBtn" class="mt-3 btn-secondary text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
              Voice Input
            </button>
          </div>

          <!-- Analyze Button -->
          <button 
            id="analyzeBtn"
            class="w-full btn-primary text-white font-semibold py-4 px-8 rounded-xl text-lg inline-flex items-center justify-center gap-3"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
            Analyze Now
          </button>
        </div>
      </div>
    </div>
  `;
};
