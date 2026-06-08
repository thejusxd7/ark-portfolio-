import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

let cachedVideoUrl = '';
let cacheExpiry = 0;

// Hardcoded fallback CDN URL captured from live Jumpshare page HTML parsing
const FALLBACK_VIDEO_URL = 'https://cdn.jumpshare.com/preview/cAOuLo9ttavbfi2UWwLxiqzfz6h9p1-GVs9xBNCPREXZwL3XicJZZ6Awf-xDPz0Uk-9N2oruCOZag38gr7p4_JMF59XQyg_rg3Ly2fsGoszxz3p0GHDm4NTnPs5kE3fzjsRJlxrEgvY4I7sqxyKMvG6yjbN-I2pg_cnoHs_AmgI.mp4';

async function resolveJumpshareVideo(): Promise<string> {
  const now = Date.now();
  if (cachedVideoUrl && now < cacheExpiry) {
    return cachedVideoUrl;
  }

  try {
    const response = await fetch('https://jumpshare.com/v/lXQfWLFAjetJPXKb5dla', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Jumpshare returned status code ${response.status}`);
    }

    const html = await response.text();

    // Look for actual .mp4 source URLs inside the preview CDN
    const match = html.match(/https:\/\/cdn\.jumpshare\.com\/preview\/[^\s"'`]+\.mp4/i);
    if (match) {
      cachedVideoUrl = match[0];
      cacheExpiry = now + 15 * 60 * 1000; // Cache for 15 minutes
      console.log(`Resolved Jumpshare direct video: ${cachedVideoUrl}`);
      return cachedVideoUrl;
    }

    const regexBackup = html.match(/https:\/\/[^\s"'`]+\.mp4[^\s"'`]*/gi);
    if (regexBackup && regexBackup.length > 0) {
      cachedVideoUrl = regexBackup[0];
      cacheExpiry = now + 15 * 60 * 1000;
      console.log(`Resolved Jumpshare backup video: ${cachedVideoUrl}`);
      return cachedVideoUrl;
    }

    throw new Error('Jumpshare custom video source pattern was not found');
  } catch (err) {
    console.warn('Error resolving jumpshare video dynamically, using premium fallback:', err);
    return FALLBACK_VIDEO_URL;
  }
}

// REST Endpoint to dynamically stream / redirect Jumpshare video to avoid CORS issues
app.get('/api/video', async (req, res) => {
  try {
    const videoUrl = await resolveJumpshareVideo();
    res.redirect(302, videoUrl);
  } catch (error) {
    console.error('Video endpoint resolution error:', error);
    res.redirect(302, FALLBACK_VIDEO_URL);
  }
});

// Configure Vite integration for standard development workspace vs production serving
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fullstack developer server started at http://localhost:${PORT}`);
  });
}

setupServer();
