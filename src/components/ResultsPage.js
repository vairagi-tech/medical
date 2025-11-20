export const ResultsPage = (app) => {
  const { results, symptoms } = app.appData;
  
  return `
    <div class="min-h-screen p-4 py-8">
      <div class="max-w-5xl mx-auto animate-fade-in">
        <button 
          id="newAnalysisBtn"
          class="btn-secondary text-white px-6 py-3 rounded-xl mb-6 inline-flex items-center gap-2 font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Analysis
        </button>

        <div class="dark-card rounded-3xl p-6 md:p-8 mb-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-xl feature-icon flex items-center justify-center">
              <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-white">Analysis Results</h2>
          </div>
          
          ${symptoms ? `
            <div class="mb-8">
              <h3 class="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Your Symptoms</h3>
              <div class="input-dark rounded-xl p-4">
                <p class="text-gray-300 leading-relaxed">${symptoms}</p>
              </div>
            </div>
          ` : ''}

          <div class="space-y-6">
            <!-- AI Analysis -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                <h3 class="text-xl font-semibold text-white">AI Health Insights</h3>
              </div>
              <div class="input-dark rounded-xl p-6 text-gray-300 whitespace-pre-wrap leading-relaxed">
                ${results.analysis || 'No analysis available'}
              </div>
            </div>

            <!-- Ayurvedic Recommendations -->
            ${results.ayurvedic ? `
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <h3 class="text-xl font-semibold text-white">Ayurvedic Recommendations</h3>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  ${results.ayurvedic.herbs ? `
                    <div class="dark-card rounded-xl p-5">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 rounded-lg feature-icon flex items-center justify-center">
                          <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                          </svg>
                        </div>
                        <h4 class="font-semibold text-white">Herbal Remedies</h4>
                      </div>
                      <p class="text-gray-400 text-sm leading-relaxed">${results.ayurvedic.herbs}</p>
                    </div>
                  ` : ''}
                  
                  ${results.ayurvedic.diet ? `
                    <div class="dark-card rounded-xl p-5">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 rounded-lg feature-icon flex items-center justify-center">
                          <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                        </div>
                        <h4 class="font-semibold text-white">Dietary Suggestions</h4>
                      </div>
                      <p class="text-gray-400 text-sm leading-relaxed">${results.ayurvedic.diet}</p>
                    </div>
                  ` : ''}
                  
                  ${results.ayurvedic.lifestyle ? `
                    <div class="dark-card rounded-xl p-5">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 rounded-lg feature-icon flex items-center justify-center">
                          <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h4 class="font-semibold text-white">Lifestyle & Yoga</h4>
                      </div>
                      <p class="text-gray-400 text-sm leading-relaxed">${results.ayurvedic.lifestyle}</p>
                    </div>
                  ` : ''}
                  
                  ${results.ayurvedic.oils ? `
                    <div class="dark-card rounded-xl p-5">
                      <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 rounded-lg feature-icon flex items-center justify-center">
                          <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                          </svg>
                        </div>
                        <h4 class="font-semibold text-white">Oils & Topical Care</h4>
                      </div>
                      <p class="text-gray-400 text-sm leading-relaxed">${results.ayurvedic.oils}</p>
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            <!-- Safety Notice -->
            <div class="dark-card rounded-xl p-5 border-l-4 border-yellow-500/50">
              <div class="flex gap-3">
                <svg class="w-6 h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <div>
                  <h4 class="text-white font-semibold mb-1">Important Notice</h4>
                  <p class="text-gray-400 text-sm leading-relaxed">
                    This is AI-generated information for educational purposes only. 
                    It is not a medical diagnosis. Please consult with a qualified healthcare professional or 
                    Ayurvedic practitioner before starting any treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-4">
          <button 
            id="homeBtn"
            class="btn-secondary text-white font-medium py-4 px-6 rounded-xl inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Home
          </button>
          <button 
            id="printBtn"
            class="btn-secondary text-white font-medium py-4 px-6 rounded-xl inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>
  `;
};
