export const HomePage = (app) => `
  <div class="min-h-screen flex items-center justify-center p-4 md:p-8">
    <div class="max-w-5xl w-full animate-fade-in">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl feature-icon mb-6">
          <svg class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-4">
          <span class="gradient-text">Ayurvedic_medical_bot</span>
          <br/>
          <span class="text-white">Health Assistant</span>
        </h1>
        <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
          AI-powered health insights combined with traditional Ayurvedic wisdom for holistic wellness
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-4 mb-12">
        <div class="dark-card dark-card-hover rounded-2xl p-6 text-center">
          <div class="w-14 h-14 rounded-xl feature-icon flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Visual Analysis</h3>
          <p class="text-gray-400 text-sm">Capture or upload images of affected areas</p>
        </div>

        <div class="dark-card dark-card-hover rounded-2xl p-6 text-center">
          <div class="w-14 h-14 rounded-xl feature-icon flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Voice Input</h3>
          <p class="text-gray-400 text-sm">Describe symptoms using text or voice</p>
        </div>

        <div class="dark-card dark-card-hover rounded-2xl p-6 text-center">
          <div class="w-14 h-14 rounded-xl feature-icon flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">AI Insights</h3>
          <p class="text-gray-400 text-sm">Get personalized Ayurvedic recommendations</p>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center mb-8">
        <button 
          id="startBtn"
          class="btn-primary text-white font-semibold py-4 px-12 rounded-xl text-lg inline-flex items-center gap-3"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Start Analysis
        </button>
      </div>

      <!-- Disclaimer -->
      <div class="dark-card rounded-xl p-4 text-center">
        <p class="text-gray-500 text-sm flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          This tool provides informational insights only, not medical diagnosis. Consult a healthcare professional for medical advice.
        </p>
      </div>
    </div>
  </div>
`;
