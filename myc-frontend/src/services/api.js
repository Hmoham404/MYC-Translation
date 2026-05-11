/**
 * API Service - SERVER VERSION
 * Connects to backend for real translation and file reconstruction
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = {
  /**
   * Process a file on the backend
   */
  processUpload: async (file, targetLanguage) => {
    try {
      console.log(`📄 Uploading ${file.name} to server...`);

      if (!file) {
        throw new Error('No file provided');
      }
      if (!targetLanguage) {
        throw new Error('No target language selected');
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetLanguage', targetLanguage);

      // Send to backend
      console.log(`🌍 Translating on server...`);
      const response = await fetch(`${API_URL}/api/documents/translate`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      // Get translated file
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      // Get filename from Content-Disposition header or create one
      const contentDisposition = response.headers.get('content-disposition');
      let translatedFileName = file.name;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          translatedFileName = filenameMatch[1];
        }
      }

      const ext = translatedFileName.split('.').pop().toLowerCase();

      console.log(`✅ Translation complete: ${translatedFileName}`);

      return {
        success: true,
        originalFile: file.name,
        translatedFile: translatedFileName,
        originalText: '',
        translatedText: '',
        message: '✅ Document translated successfully with format preserved',
        layoutPreserved: true,
        previewAvailable: true,
        downloadUrl: blobUrl,
        viewUrl: null,
        rawUrl: null,
      };
    } catch (error) {
      console.error('❌ Processing error:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      throw new Error(`Processing failed: ${errorMessage}`);
    }
  },

  /**
   * Check server health
   */
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      return response.ok;
    } catch (error) {
      console.error('Server health check failed:', error);
      return false;
    }
  },
};

export default api;
