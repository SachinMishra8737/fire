import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { DEMO_THERMAL_EVENTS } from './src/data/demoEvents';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      system: 'FIRE-SIGHT AI Core Prototype',
      mode: 'Demonstration / Proof-of-Concept',
      timestamp: new Date().toISOString(),
    });
  });

  // Events list endpoint
  app.get('/api/events', (req, res) => {
    res.json({
      total: DEMO_THERMAL_EVENTS.length,
      events: DEMO_THERMAL_EVENTS,
      attribution_notice: 'Prototype using Demonstration Data. Real FIRMS, satellite, GIS, infrastructure, land-use and weather data integration will be implemented in the next development stage.',
    });
  });

  // Analysis handler function (used for both /analyze-event and /api/analyze-event)
  const handleAnalyzeEvent = (req: express.Request, res: express.Response) => {
    const { event_id } = req.body || {};
    const event = DEMO_THERMAL_EVENTS.find((e) => e.id === event_id);

    if (!event) {
      // Fallback if an unknown ID is provided
      res.status(404).json({
        error: 'Event not found in prototype registry',
        event_id,
        available_ids: DEMO_THERMAL_EVENTS.map((e) => e.id),
      });
      return;
    }

    const isUnknown = event.id === 'Event 07' || event.likelySource === 'UNKNOWN';

    // Demo analysis response matching user specification
    const responsePayload: Record<string, any> = {
      event_id: event.id,
      abnormality: event.abnormality,
      source: event.likelySource,
      priority: event.investigationPriority,
      confidence: event.confidence,
      evidence: event.evidence,
      analysis_timestamp: new Date().toISOString(),
      processing_latency_ms: 380,
    };

    if (isUnknown) {
      responsePayload.insufficient_evidence = true;
      responsePayload.message = 'Evidence insufficient for reliable attribution.';
    }

    res.json(responsePayload);
  };

  // User-specified endpoint requirement: POST /analyze-event
  app.post('/analyze-event', handleAnalyzeEvent);
  app.post('/api/analyze-event', handleAnalyzeEvent);

  // Vite middleware in dev / Static file serving in production
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
    console.log(`[FIRE-SIGHT AI] Prototype server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
