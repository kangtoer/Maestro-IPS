// Universal Gemini AI client helper
// Supports both full-stack server proxy (/api/generate-ai) and standalone static client deployment (e.g. GitHub Pages)

export const callDirectGeminiAPI = async (prompt: string, systemInstruction?: string, userApiKey?: string): Promise<string> => {
  const apiKey = userApiKey || 
    localStorage.getItem('GEMINI_API_KEY') || 
    localStorage.getItem('ips_gemini_api_key') || 
    (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Kunci API Gemini belum disetel. Silakan masukkan Kunci API Gemini Anda di menu Pengaturan API (pojok kanan atas).');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
  
  const payload: any = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      topP: 0.95
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || `Gagal menghubungi Gemini AI (Status: ${res.status})`;
    throw new Error(msg);
  }

  if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error('Respon AI kosong.');
};

export const safeFetch = async (url: string, options: RequestInit, retries: number = 2, delay: number = 1500): Promise<any> => {
  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const shouldRetry = [500, 502, 503, 504, 429].includes(response.status);
      if (shouldRetry && retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return safeFetch(url, options, retries - 1, delay * 1.5);
      }
      throw new Error(data?.error || `Request failed with status ${response.status}`);
    }

    if (!isJson && response.status !== 204) {
      throw new Error('Server did not return JSON');
    }

    return data;
  } catch (error: any) {
    if (retries > 0 && (error.name === 'TypeError' || error.message?.includes('fetch'))) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return safeFetch(url, options, retries - 1, delay * 1.5);
    }
    throw error;
  }
};

export const generateAIContent = async (prompt: string, systemInstruction?: string): Promise<string> => {
  // Try server proxy first
  try {
    const res = await safeFetch('/api/generate-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemInstruction })
    }, 1, 1000);
    if (res?.text) return res.text;
  } catch (serverErr) {
    // If running in static client mode (GitHub Pages, etc.), fallback to direct client call
    console.info('Server API unavailable, falling back to direct client Gemini API call...');
  }

  // Fallback to direct client call
  return callDirectGeminiAPI(prompt, systemInstruction);
};

export const generateChatResponse = async (
  messages: { role: 'user' | 'model', content: string }[], 
  systemInstruction: string = 'Anda adalah IPS Maestro Chatbot karya Catur Pamungkas, S.Pd.,Gr. (toer.my.id).'
) => {
  return generateAIContent(messages[messages.length - 1].content, systemInstruction);
};

export const generateLKPD = async (topic: string, grade: string, type: string) => {
  const prompt = `Buatkan LKPD Kurikulum Merdeka mata pelajaran IPS SMP Kelas ${grade} dengan topik "${topic}" dan model aktivitas "${type}". Sertakan identitas, petunjuk belajar, stimulus wacana, pertanyaan pemantik, tabel investigasi, dan rubrik penilaian terperinci.`;
  return generateAIContent(prompt);
};
