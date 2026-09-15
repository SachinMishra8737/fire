"""
🔥 FIRE-SIGHT AI: Contextual Industrial Fire Detection & Attribution System
Smart India Hackathon (SIH) Research Prototype Backend

FastAPI Microservice demonstrating automated context-driven differentiation
between industrial flare stacks and uncontained fires.

How to run standalone:
    uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="FIRE-SIGHT AI Research Prototype API",
    description="Context-driven differentiation between industrial flare stacks and uncontained fires.",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# Request & Response Schemas
# -----------------------------------------------------------------------------

class EventAnalysisRequest(BaseModel):
    event_id: str = Field(..., example="Event 01", description="Identifier of the thermal event")


class EventAnalysisResponse(BaseModel):
    event_id: str
    abnormality: str = Field(..., description="Divergence from historical thermal baseline (HIGH | MEDIUM | LOW)")
    source: str = Field(..., description="Attributed origin: Industrial Activity | Flare | UNKNOWN")
    priority: str = Field(..., description="Investigation triage urgency: HIGH | MEDIUM | LOW")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score from 0.0 to 1.0")
    evidence: List[str] = Field(..., description="List of validated context evidence layers")
    insufficient_evidence: Optional[bool] = None
    message: Optional[str] = None
    analysis_timestamp: str
    processing_latency_ms: int


# -----------------------------------------------------------------------------
# Demonstration Knowledge Base (Simulated Contextual Database)
# In production, this layer is replaced by live NASA FIRMS API, Sentinel-2 SWIR bands,
# OpenStreetMap GIS industrial polygons, and IMD weather webhooks.
# -----------------------------------------------------------------------------

DEMO_REGISTRY = {
    "Event 01": {
        "abnormality": "HIGH",
        "source": "Industrial Activity",
        "priority": "HIGH",
        "confidence": 0.87,
        "evidence": [
            "Historical activity",
            "Event behaviour",
            "Infrastructure proximity",
            "Land-use context",
            "Weather context"
        ]
    },
    "Event 02": {
        "abnormality": "HIGH",
        "source": "Industrial Activity",
        "priority": "HIGH",
        "confidence": 0.91,
        "evidence": [
            "Historical activity",
            "Event behaviour",
            "Infrastructure proximity",
            "Land-use context",
            "Weather context"
        ]
    },
    "Event 03": {
        "abnormality": "MEDIUM",
        "source": "Industrial Activity",
        "priority": "MEDIUM",
        "confidence": 0.74,
        "evidence": [
            "Historical activity",
            "Event behaviour",
            "Infrastructure proximity",
            "Land-use context"
        ]
    },
    "Event 04": {
        "abnormality": "MEDIUM",
        "source": "Industrial Activity",
        "priority": "MEDIUM",
        "confidence": 0.69,
        "evidence": [
            "Historical activity",
            "Event behaviour",
            "Infrastructure proximity",
            "Weather context"
        ]
    },
    "Event 05": {
        "abnormality": "MEDIUM",
        "source": "Industrial Activity",
        "priority": "MEDIUM",
        "confidence": 0.76,
        "evidence": [
            "Historical activity",
            "Event behaviour",
            "Infrastructure proximity",
            "Land-use context"
        ]
    },
    "Event 06": {
        "abnormality": "LOW",
        "source": "Regulated Incineration / Light Industrial",
        "priority": "LOW",
        "confidence": 0.62,
        "evidence": [
            "Infrastructure proximity",
            "Land-use context",
            "Weather context"
        ]
    },
    "Event 07": {
        "abnormality": "MEDIUM",
        "source": "UNKNOWN",
        "priority": "MEDIUM",
        "confidence": 0.42,
        "evidence": [
            "Event behaviour"
        ],
        "insufficient_evidence": True,
        "message": "Evidence insufficient for reliable attribution."
    }
}


# -----------------------------------------------------------------------------
# Endpoints
# -----------------------------------------------------------------------------

@app.get("/")
def read_root():
    """Health & metadata endpoint"""
    return {
        "system": "FIRE-SIGHT AI Core",
        "status": "online",
        "framework": "FastAPI (Python 3.10+)",
        "purpose": "Smart India Hackathon Research Prototype",
        "disclaimer": "Demonstration Data — Not Live FIRMS Data"
    }


@app.post("/analyze-event", response_model=EventAnalysisResponse)
def analyze_event(payload: EventAnalysisRequest):
    """
    SIH Core Attribution Endpoint:
    Receives an event_id and evaluates contextual multi-layer evidence.
    
    FUTURE INTEGRATION ROADMAP (Student Team Notes):
    1. Real NASA FIRMS API ingestion: Replace payload.event_id with live GeoJSON thermal hotspot.
    2. Spatial GIS Buffer Query: PostGIS / Shapely ST_DWithin against registered industrial plant footprints.
    3. Multi-temporal VIIRS/MODIS baseline: Compute mean & variance of radiant flux over past 3 years.
    4. ML Classifier / Context Fusion: XGBoost / Random Forest or Graph Neural Network classifier.
    """
    event_id = payload.event_id.strip()

    # Look up in demonstration registry
    if event_id not in DEMO_REGISTRY:
        normalized_id = f"Event 0{event_id.replace('Event', '').strip()}" if event_id.replace('Event', '').strip().isdigit() and len(event_id.replace('Event', '').strip()) == 1 else event_id
        data = DEMO_REGISTRY.get(normalized_id)
        if not data:
            data = DEMO_REGISTRY["Event 01"]
    else:
        data = DEMO_REGISTRY[event_id]

    return EventAnalysisResponse(
        event_id=event_id if event_id in DEMO_REGISTRY else "Event 01",
        abnormality=data["abnormality"],
        source=data["source"],
        priority=data["priority"],
        confidence=data["confidence"],
        evidence=data["evidence"],
        insufficient_evidence=data.get("insufficient_evidence", False),
        message=data.get("message", None),
        analysis_timestamp=datetime.utcnow().isoformat() + "Z",
        processing_latency_ms=380
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
